export const getEnvVar = (name: string) => {
    try {
        const envValue = process.env[name]

        if (!envValue) throw new Error(`Failed to get ${name}`)

        return envValue
    } catch (err: unknown) {
        console.error(`Failed to get ${name}: `, err)
        throw new Error(`Failed to get ${name}`)
    }
}
