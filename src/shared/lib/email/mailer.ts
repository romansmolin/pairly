import 'server-only'
import nodemailer from 'nodemailer'

type SendWelcomeEmailInput = {
    email: string
    username?: string | null
}

type SendPaymentSuccessEmailInput = {
    email: string
    credits: number
}

type SmtpConfig = {
    host: string
    port: number
    secure: boolean
    user: string
    pass: string
    from: string
}

let transport: nodemailer.Transporter | null = null
let missingConfigWarned = false

const parseSecureFlag = (value?: string): boolean => {
    if (!value) return false
    return ['1', 'true', 'yes', 'on'].includes(value.trim().toLowerCase())
}

const getSmtpConfig = (): SmtpConfig | null => {
    const host = process.env.SMTP_HOST
    const portRaw = process.env.SMTP_PORT
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const from = process.env.SMTP_FROM ?? user
    const secure = parseSecureFlag(process.env.SMTP_SECURE)

    const port = Number(portRaw)
    const hasValidPort = Number.isInteger(port) && port > 0

    if (!host || !user || !pass || !from || !hasValidPort) {
        if (!missingConfigWarned) {
            missingConfigWarned = true
            console.warn('[Mailer] SMTP config is missing or invalid. Emails are disabled.')
        }
        return null
    }

    return {
        host,
        port,
        secure,
        user,
        pass,
        from,
    }
}

const getTransport = (): { from: string; transporter: nodemailer.Transporter } | null => {
    const config = getSmtpConfig()
    if (!config) return null

    if (!transport) {
        transport = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: config.secure,
            auth: {
                user: config.user,
                pass: config.pass,
            },
        })
    }

    return {
        from: config.from,
        transporter: transport,
    }
}

const sendMail = async (params: {
    to: string
    subject: string
    text: string
    html: string
}): Promise<boolean> => {
    const mailer = getTransport()
    if (!mailer) return false

    try {
        await mailer.transporter.sendMail({
            from: mailer.from,
            to: params.to,
            subject: params.subject,
            text: params.text,
            html: params.html,
        })
        return true
    } catch (error) {
        console.error('[Mailer] Failed to send email', error)
        return false
    }
}

export async function sendWelcomeEmail(input: SendWelcomeEmailInput): Promise<boolean> {
    const usernameLine = input.username ? `, ${input.username}` : ''
    return await sendMail({
        to: input.email,
        subject: 'Welcome to Pairly',
        text: `Hi${usernameLine}!\n\nWelcome to Pairly. Your account is ready and you can start matching now.\n\nThanks,\nPairly Team`,
        html: `<p>Hi${usernameLine}!</p><p>Welcome to Pairly. Your account is ready and you can start matching now.</p><p>Thanks,<br/>Pairly Team</p>`,
    })
}

export async function sendPaymentSuccessEmail(
    input: SendPaymentSuccessEmailInput,
): Promise<boolean> {
    return await sendMail({
        to: input.email,
        subject: 'Credits added to your Pairly wallet',
        text: `Your payment is successful. ${input.credits} credits were added to your wallet.\n\nThanks,\nPairly Team`,
        html: `<p>Your payment is successful.</p><p><strong>${input.credits} credits</strong> were added to your wallet.</p><p>Thanks,<br/>Pairly Team</p>`,
    })
}
