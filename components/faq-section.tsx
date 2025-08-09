import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqData = [
  {
    question: "How do I use the mask?",
    answer: (
      <div className="space-y-2">
        <p>
          <strong>Evening Routine:</strong> Start by cleansing and toning your skin to ensure it's free from oil and
          creams.
        </p>
        <p>
          <strong>Application:</strong> Apply the bottom part of the mask first, followed by the top. Gently press for
          optimal adherence. <em>Pro tip: Tilt your head back to help the mask fit perfectly.</em>
        </p>
        <p>
          <strong>Duration:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Express Glow:</strong> Leave on for 1–2 hours.
          </li>
          <li>
            <strong>Maximum Results:</strong> Leave it on overnight (make sure the mask is fully dry to prevent
            shifting).
          </li>
        </ul>
        <p>
          <strong>The Reveal:</strong> Gently remove the mask and massage the remaining essence into your skin until
          fully absorbed. <em>Pro tip: Use any extra essence on your neck and décolletage.</em>
        </p>
      </div>
    ),
  },
  {
    question: "How many masks come in a pack?",
    answer:
      "Each pack contains 4 single-use masks. We recommend starting with 2 masks per week for the first month to help your skin glow and feel rejuvenated. After that, you can maintain healthy skin by using one mask per week.",
  },
  {
    question: "What ingredients are in the mask?",
    answer:
      "Our masks are infused with a powerful blend of hydrating, nourishing, and soothing ingredients, including: Water, glycerin, propylene glycol, betaine, carrageenan, polysaccharides, hyaluronic acid, hydrolyzed collagen, niacinamide (vitamin B3), tocopherol (vitamin E), Centella Asiatica extract, Tremella Fuciformis (snow mushroom) extract, licorice root extract, ceramides, peptides, and other skin-loving compounds that deeply hydrate, firm, and rejuvenate your skin.",
  },
  {
    question: "Do you offer a money-back guarantee?",
    answer:
      "We offer a 100% money-back guarantee. If you don’t notice healthier skin, we’ll give you a full refund—no questions asked. Enjoy our 60-day risk-free guarantee for total peace of mind.",
  },
  {
    question: "What are the delivery times?",
    answer: (
      <div className="space-y-2">
        <p>
          <strong>Processing Time:</strong> Once your order is placed, please allow 1 business day for us to process and
          prepare it for shipment.
        </p>
        <p>
          <strong>Shipping Time:</strong> After your order is shipped, delivery usually takes 3–5 business days,
          depending on your location.
        </p>
        <p>
          <strong>Tracking Information:</strong> As soon as your order is on its way, you’ll receive an email with your
          tracking number so you can follow your delivery in real time.
        </p>
      </div>
    ),
  },
]

export function FaqSection() {
  return (
    <section className="w-full py-12 md:py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-lora tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
          </div>
        </div>
        <div className="mx-auto max-w-3xl pt-10">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger className="text-left bg-brand text-brand-foreground hover:bg-brand/90 px-4 py-3 rounded-md my-2 text-base font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="p-4 text-base">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
