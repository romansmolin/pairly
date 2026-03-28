import { LegalPage } from '@/shared/ui/legal-page/legal-page'

export default function ReturnPolicy() {
    return (
        <LegalPage title="Return & Refund Policy" lastUpdated="March 28, 2026">
            <h2>1. Overview</h2>
            <p>
                This Return & Refund Policy applies to all purchases made through Pairly, including
                Love Coins and any premium features. We want you to be satisfied with your
                experience on Pairly, and we handle refund requests fairly and transparently.
            </p>

            <h2>2. Love Coins</h2>
            <p>
                Love Coins are a virtual in-app currency used to purchase gifts and access premium
                features within Pairly. Due to the digital nature of Love Coins:
            </p>
            <ul>
                <li>
                    Love Coins are generally non-refundable once purchased and credited to your
                    account
                </li>
                <li>Unused Love Coins remain in your account until used or account deletion</li>
                <li>Love Coins cannot be transferred between accounts</li>
                <li>Love Coins have no cash value outside of the Pairly platform</li>
            </ul>

            <h2>3. Eligible Refund Scenarios</h2>
            <p>We may issue a refund in the following circumstances:</p>
            <ul>
                <li>
                    <strong>Technical errors:</strong> If a payment was processed but Love Coins were
                    not credited to your account due to a technical issue
                </li>
                <li>
                    <strong>Duplicate charges:</strong> If you were charged multiple times for the
                    same transaction
                </li>
                <li>
                    <strong>Unauthorized transactions:</strong> If a purchase was made without your
                    authorization
                </li>
                <li>
                    <strong>Service unavailability:</strong> If you purchased Love Coins but were
                    unable to use them due to extended service outages on our end
                </li>
            </ul>

            <h2>4. Refund Request Process</h2>
            <p>To request a refund:</p>
            <ul>
                <li>
                    Contact our support team at{' '}
                    <a href="mailto:support@pairly.com">support@pairly.com</a> within 14 days of the
                    transaction
                </li>
                <li>Include your account email, transaction date, and amount</li>
                <li>Describe the reason for your refund request</li>
                <li>We will review your request and respond within 5 business days</li>
            </ul>

            <h2>5. Refund Method</h2>
            <p>
                Approved refunds will be returned to the original payment method. Processing times
                depend on your payment provider and may take 5–10 business days to appear in your
                account.
            </p>

            <h2>6. Gifts</h2>
            <p>
                Virtual gifts purchased with Love Coins and sent to other users are non-refundable.
                Once a gift is sent, it cannot be returned or exchanged. Please confirm your gift
                selection before sending.
            </p>

            <h2>7. Account Deletion</h2>
            <p>
                If you delete your Pairly account, any remaining Love Coins in your account will be
                forfeited. We recommend using your Love Coins before requesting account deletion. No
                refunds will be issued for unused Love Coins upon voluntary account deletion.
            </p>

            <h2>8. Exceptions</h2>
            <p>
                Refund policies may vary by jurisdiction. Where local consumer protection laws
                provide stronger protections, those laws will apply. Users in the European Union have
                additional rights under the Consumer Rights Directive.
            </p>

            <h2>9. Contact</h2>
            <p>
                For refund inquiries, contact us at{' '}
                <a href="mailto:support@pairly.com">support@pairly.com</a>.
            </p>
        </LegalPage>
    )
}
