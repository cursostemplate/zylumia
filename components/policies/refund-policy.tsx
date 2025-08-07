export function RefundPolicyContent() {
    return (
      <div className="space-y-4">
        <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
        <h4 className="font-bold">1. 60-Day Money-Back Guarantee</h4>
        <p>We offer a 60-day risk-free money-back guarantee. If you are not satisfied with your product for any reason, you can return it for a full refund within 60 days of receiving your order.</p>
  
        <h4 className="font-bold">2. Return Process</h4>
        <p>To initiate a return, please contact our customer support team at support@zylumia.com with your order number. We will provide you with instructions on how to send back your product. Customers are responsible for return shipping costs.</p>
  
        <h4 className="font-bold">3. Refunds</h4>
        <p>Once we receive and inspect your return, we will process your refund to the original method of payment. Please allow 5-10 business days for the credit to appear on your statement.</p>
      </div>
    )
  }
