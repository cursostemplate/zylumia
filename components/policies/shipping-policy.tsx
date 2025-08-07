export function ShippingPolicyContent() {
    return (
      <div className="space-y-4">
        <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
        <h4 className="font-bold">1. Processing Time</h4>
        <p>All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.</p>
  
        <h4 className="font-bold">2. Shipping Rates & Delivery Estimates</h4>
        <p>Shipping charges for your order will be calculated and displayed at checkout. Delivery usually takes 3-5 business days, but delays can occasionally occur.</p>
  
        <h4 className="font-bold">3. Shipment Confirmation & Order Tracking</h4>
        <p>You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s).</p>
  
        <h4 className="font-bold">4. Damages</h4>
        <p>Zylumia is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim.</p>
      </div>
    )
  }
