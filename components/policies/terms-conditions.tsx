export function TermsConditionsContent() {
  return (
    <div className="space-y-4">
      <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
      <p>Please read these Terms and Conditions carefully before using the Zylumia website.</p>
      
      <h4 className="font-bold">1. Agreement to Terms</h4>
      <p>By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.</p>

      <h4 className="font-bold">2. Intellectual Property</h4>
      <p>The service and its original content, features, and functionality are and will remain the exclusive property of Zylumia and its licensors.</p>

      <h4 className="font-bold">3. Limitation Of Liability</h4>
      <p>In no event shall Zylumia be liable for any indirect, incidental, special, consequential or punitive damages arising out of your use of the site.</p>

      <h4 className="font-bold">4. Governing Law</h4>
      <p>These Terms shall be governed in accordance with the laws of the State of Delaware, United States.</p>
    </div>
  )
}
