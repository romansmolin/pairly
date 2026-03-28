import { LegalPage } from '@/shared/ui/legal-page/legal-page'

export default function CookiePolicy() {
    return (
        <LegalPage title="Cookie Policy" lastUpdated="March 28, 2026">
            <h2>1. What Are Cookies</h2>
            <p>
                Cookies are small text files that are stored on your device when you visit a
                website. They help the website remember your preferences, keep you signed in, and
                understand how you use the service. Pairly uses cookies and similar technologies to
                provide a better experience.
            </p>

            <h2>2. How Pairly Uses Cookies</h2>
            <p>We use cookies for the following purposes:</p>

            <h3>Essential Cookies</h3>
            <p>
                These cookies are necessary for the basic functionality of Pairly. They enable core
                features like authentication, session management, and security. Without these
                cookies, the service cannot function properly.
            </p>
            <ul>
                <li>Session authentication and login state</li>
                <li>Security tokens and CSRF protection</li>
                <li>Load balancing and server routing</li>
            </ul>

            <h3>Functional Cookies</h3>
            <p>
                These cookies remember your preferences and settings to provide a personalized
                experience.
            </p>
            <ul>
                <li>Language and region preferences</li>
                <li>Theme preferences (light/dark mode)</li>
                <li>Previously viewed profiles and search filters</li>
            </ul>

            <h3>Analytics Cookies</h3>
            <p>
                These cookies help us understand how users interact with Pairly so we can improve
                the service.
            </p>
            <ul>
                <li>Pages visited and time spent on each page</li>
                <li>Feature usage patterns and click behavior</li>
                <li>Error tracking and performance monitoring</li>
                <li>Aggregated and anonymized usage statistics</li>
            </ul>

            <h3>Marketing Cookies</h3>
            <p>
                These cookies may be used to deliver relevant advertisements and measure the
                effectiveness of marketing campaigns.
            </p>
            <ul>
                <li>Ad targeting and retargeting</li>
                <li>Campaign performance measurement</li>
                <li>Social media integration</li>
            </ul>

            <h2>3. Third-Party Cookies</h2>
            <p>
                Some cookies on Pairly are set by third-party services we use. These include:
            </p>
            <ul>
                <li>
                    <strong>Payment processors:</strong> For secure transaction handling
                </li>
                <li>
                    <strong>Analytics providers:</strong> For understanding usage patterns
                </li>
                <li>
                    <strong>Authentication services:</strong> For secure sign-in options
                </li>
            </ul>
            <p>
                These third parties have their own privacy and cookie policies. We encourage you to
                review their policies.
            </p>

            <h2>4. Cookie Duration</h2>
            <ul>
                <li>
                    <strong>Session cookies:</strong> Deleted when you close your browser
                </li>
                <li>
                    <strong>Persistent cookies:</strong> Remain on your device for a set period
                    (typically 30 days to 1 year) or until you delete them
                </li>
            </ul>

            <h2>5. Managing Cookies</h2>
            <p>
                You can control cookies through your browser settings. Most browsers allow you to:
            </p>
            <ul>
                <li>View what cookies are stored on your device</li>
                <li>Delete individual or all cookies</li>
                <li>Block cookies from specific or all websites</li>
                <li>Set preferences for first-party vs. third-party cookies</li>
            </ul>
            <p>
                Please note that blocking essential cookies may prevent Pairly from functioning
                correctly. You may not be able to sign in or use certain features if essential
                cookies are disabled.
            </p>

            <h2>6. Do Not Track</h2>
            <p>
                Some browsers offer a "Do Not Track" (DNT) setting. Pairly currently does not
                respond to DNT signals, but we respect your privacy choices and provide the cookie
                management options described above.
            </p>

            <h2>7. Changes to This Policy</h2>
            <p>
                We may update this Cookie Policy from time to time to reflect changes in technology,
                regulation, or our practices. We will post the updated policy on this page with a
                revised "Last updated" date.
            </p>

            <h2>8. Contact Us</h2>
            <p>
                If you have questions about our use of cookies, please contact us at{' '}
                <a href="mailto:privacy@pairly.com">privacy@pairly.com</a>.
            </p>
        </LegalPage>
    )
}
