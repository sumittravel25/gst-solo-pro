import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "When will I get my software?",
    a: "Immediately after your payment is processed, you will be redirected to the download page to get your .exe file.",
  },
  {
    q: "Does this require Python?",
    a: "No, it is a fully compiled standalone Windows application (.exe). No Python installation is needed.",
  },
  {
    q: "Is my data safe?",
    a: "Yes, the app works entirely offline. Your financial data never touches our servers.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card rounded-xl shadow-card px-6 border-none"
            >
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
