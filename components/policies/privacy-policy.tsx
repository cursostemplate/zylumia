export function PrivacyPolicyContent() {
  return (
    <div className="space-y-4">
      <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
      <p>Zylumia ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Zylumia.</p>
      
      <h4 className="font-bold">1. Information We Collect</h4>
      <p>We collect information you provide directly to us, such as when you create an account, place an order, or contact customer service. This may include contact information (name, email, shipping address), payment information (processed by third-party vendors), and account credentials.</p>

      <h4 className="font-bold">2. How We Use Your Information</h4>
      <p>We use the information we collect to process and fulfill your orders, communicate with you, send promotional emails (if you opt-in), and improve your shopping experience.</p>

      <h4 className="font-bold">3. Information Sharing</h4>
      <p>We do not sell your personal information. We may share your information with third-party service providers who perform services on our behalf, such as payment processing and shipping.</p>

      <h4 className="font-bold">4. Your Rights</h4>
      <p>You have the right to access, correct, or delete your personal information. You can also opt-out of receiving marketing communications at any time.</p>
    </div>
  )
}
