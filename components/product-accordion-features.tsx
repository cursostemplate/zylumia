"use client";
import { useState } from "react";
import NextImage from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const features = [
  {
    id: 1,
    title: "Professional Anti-Aging Collagen Mask",
    description: "As a dermatologist specializing in skin aging and barrier repair, I often see patients struggling with loss of elasticity, dehydration, and fine lines—especially as collagen production naturally declines with age. I'm genuinely impressed by this Advanced Anti-Wrinkle Collagen Mask and its formulations and results, making it a product I confidently recommend to my patients seeking effective anti-aging solutions.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    title: "How Does It Work?",
    description: "For optimal results, we recommend using this mask 1-2 times per week as part of your regular skincare routine. The application process is designed to be simple yet effective, allowing the active ingredients to penetrate deeply into your skin.\n\nPreparation: Begin by thoroughly cleansing your face and applying your preferred toner or serum to create the ideal base for maximum absorption.\n\nApplication: Carefully remove the mask from its protective pouch and peel off the protective films. The mask is pre-shaped to fit comfortably on your face.\n\nTreatment Time: Place the mask on your face and leave it on for 1-2 hours, or until it becomes completely transparent. This extended wear time allows for deep penetration of the active ingredients.\n\nRemoval Process: Gently remove the mask and pat any remaining essence into your skin for extra hydration and nourishment.\n\nFinal Step: Enjoy the immediate results of hydrated, plump, and radiant skin that feels noticeably smoother and more youthful.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 3,
    title: "Ingredients",
    description: "Não incluímos parabenos nocivos ou outras substâncias nocivas. Também NUNCA testamos em animais.\n\nCollagen - O colágeno ajuda a melhorar a elasticidade da pele e a retenção de umidade.\n\nCentella Asiatica Extract - Alivia a inflamação e auxilia na cicatrização da pele.\n\nGlycerin - Ajuda a hidratar, iluminar, suavizar a pele, reduzir os poros e fornecer proteção antioxidante.\n\nButylene Glycol - Aumenta a penetração dos ingredientes ativos e adiciona hidratação à pele.\n\nAssim como acontece com todos os produtos para a pele, recomendamos e recomendamos fortemente que você teste o sérum da máscara na pele do braço ou da mão antes de usar completamente, pois algumas pessoas são mais sensíveis do que outras ou têm reações alérgicas a misturas de ingredientes.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 4,
    title: "Key Benefits",
    description: "Soothes and Calms Irritated Skin: This advanced formula helps reduce redness and discomfort while supporting a healthy skin barrier, making it ideal for those dealing with environmental stress or sensitive skin conditions.\n\nRefines Skin Texture: Experience improved overall clarity and softness for a more even, radiant complexion that feels smooth to the touch and appears visibly refined.\n\nProvides Deep Hydration: The mask delivers lasting moisture with a fresh, lightweight finish that doesn't feel heavy or greasy, leaving your skin comfortable and balanced throughout the day.\n\nSimple to Use, Perfect Fit: Designed for effortless application with a snug fit, you can easily incorporate this mask into your skincare routine without any mess or fuss, achieving professional results at home.\n\nLuxurious Ingredients You Can Trust: Packed with premium, skin-loving nutrients and completely free from harsh chemicals, this mask delivers visible results you'll love while maintaining the highest safety standards.\n\nAll-in-One Beauty Boost: Say goodbye to dryness, puffiness, and uneven texture—one mask treatment does it all for a smooth, hydrated complexion that radiates health and vitality.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 5,
    title: "Should I Wash After the Mask?",
    description: "It's not necessary to wash your face after use. The remaining serum can be gently massaged into the skin for extra hydration and continued benefits throughout the day or night.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 6,
    title: "Can I Use It for Sensitive Skin?",
    description: "Yes, absolutely! This mask is specifically designed to be gentle on all skin types. Our formulation does not strip moisture or cause dryness, making it ideal for sensitive skin that requires extra care and attention.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 7,
    title: "Shipping & Returns",
    description: "Shipping Policy: We offer tracked shipping on all orders to ensure your products arrive safely and on time. Processing Time: Once your order is placed, please allow 24 hours for us to process and prepare your order for shipment, ensuring everything is perfectly packaged. Shipping Time: After your order is dispatched, delivery typically takes 3-5 business days to reach you, depending on your location and local postal services. Tracking Information: Once your order has been shipped, you will receive an email containing your tracking number.\n\nReturns Policy: We want you to be fully satisfied with your purchase! If you are not completely happy with your order, we gladly accept returns and exchanges within 60 days from the date of purchase. For any questions or concerns, please email us directly at zylumiaa@gmail.com.",
    image: "/placeholder.svg?height=400&width=400",
  },
];

export function ProductAccordionFeatures() {
  const [activeTabId, setActiveTabId] = useState<number | null>(1);
  const [activeImage, setActiveImage] = useState(features[0].image);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="flex w-full flex-col md:flex-row items-start justify-between gap-12">
          <div className="w-full md:w-1/2">
            <Accordion type="single" className="w-full" defaultValue="item-1" collapsible>
              {features.map((tab) => (
                <AccordionItem key={tab.id} value={`item-${tab.id}`}>
                  <AccordionTrigger
                    onClick={() => {
                      setActiveImage(tab.image);
                      setActiveTabId(tab.id);
                    }}
                    className="cursor-pointer py-5 !no-underline transition"
                  >
                    <h6
                      className={`text-left text-xl font-semibold ${tab.id === activeTabId ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {tab.title}
                    </h6>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mt-3 text-muted-foreground whitespace-pre-line">
                      {tab.description}
                    </p>
                    <div className="mt-4 md:hidden">
                      <NextImage
                        src={tab.image}
                        alt={tab.title}
                        width={400}
                        height={400}
                        className="h-full max-h-80 w-full rounded-md object-cover"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="relative m-auto hidden w-1/2 overflow-hidden rounded-xl bg-muted md:block">
            <NextImage
              src={activeImage}
              alt="Feature preview"
              width={400}
              height={400}
              className="aspect-[4/3] w-full rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
