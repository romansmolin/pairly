import { LegalPage } from '@/shared/ui/legal-page/legal-page'

export default function PrivacyPolicy() {
    return (
        <LegalPage title="Privacy Policy" lastUpdated="March 28, 2026">
            <h2>1. Introduction</h2>
            <p>
                Pairly ("we", "us", "our") is committed to protecting your privacy. This Privacy
                Policy explains how we collect, use, disclose, and safeguard your information when
                you use our dating platform and related services.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>Information You Provide</h3>
            <ul>
                <li>Account information: name, email address, date of birth, gender</li>
                <li>Profile information: photos, bio, interests, relationship preferences</li>
                <li>Communication data: messages sent through our chat feature</li>
                <li>Payment information: processed securely through third-party providers</li>
                <li>Verification data: information submitted for profile verification</li>
            </ul>

            <h3>Information Collected Automatically</h3>
            <ul>
                <li>Device information: browser type, operating system, device identifiers</li>
                <li>Usage data: pages visited, features used, interaction patterns</li>
                <li>Log data: IP address, access times, referring URLs</li>
                <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
                <li>Provide, maintain, and improve the Pairly service</li>
                <li>Match you with compatible users based on your preferences</li>
                <li>Process transactions and manage Love Coins</li>
                <li>Send you notifications about matches, messages, and account updates</li>
                <li>Detect and prevent fraud, abuse, and security threats</li>
                <li>Comply with legal obligations</li>
                <li>Analyze usage trends to improve user experience</li>
            </ul>

            <h2>4. Information Sharing</h2>
            <p>We do not sell your personal information. We may share your data with:</p>
            <ul>
                <li>Other users: your profile information is visible to potential matches</li>
                <li>Service providers: payment processors, hosting, and analytics providers</li>
                <li>Legal authorities: when required by law or to protect our rights</li>
                <li>Business transfers: in connection with a merger, acquisition, or sale of assets</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>
                We implement industry-standard security measures to protect your personal
                information, including encryption in transit and at rest, secure authentication, and
                regular security assessments. However, no method of transmission over the internet
                is 100% secure.
            </p>

            <h2>6. Data Retention</h2>
            <p>
                We retain your personal information for as long as your account is active or as
                needed to provide services. You can request deletion of your account and associated
                data at any time. Some information may be retained as required by law or for
                legitimate business purposes.
            </p>

            <h2>7. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
                <li>Access and receive a copy of your personal data</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
            </ul>

            <h2>8. Cookies</h2>
            <p>
                Pairly uses cookies and similar technologies to enhance your experience. For
                detailed information about our cookie practices, please see our{' '}
                <a href="/cookie-policy">Cookie Policy</a>.
            </p>

            <h2>9. Children's Privacy</h2>
            <p>
                Pairly is not intended for users under 18 years of age. We do not knowingly collect
                personal information from minors. If we learn that we have collected data from a
                minor, we will delete it promptly.
            </p>

            <h2>10. International Data Transfers</h2>
            <p>
                Your information may be transferred to and processed in countries other than your
                own. We ensure appropriate safeguards are in place to protect your data in
                accordance with applicable data protection laws.
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
                We may update this Privacy Policy from time to time. We will notify you of material
                changes via email or in-app notification. Your continued use of Pairly after changes
                constitutes acceptance of the updated policy.
            </p>

            <h2>12. Contact Us</h2>
            <p>
                For privacy-related inquiries, please contact us at{' '}
                <a href="mailto:privacy@pairly.com">privacy@pairly.com</a>.
            </p>
        </LegalPage>
    )
}
