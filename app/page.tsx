import Image from "next/image";
import { SiteFooter } from "@/components/copper/site-footer";
import { SiteHeader } from "@/components/copper/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatMemory,
  formatNotesHours,
  formatUsd,
  getPlans,
  getPrivacySummary,
  getProducts,
  type Product,
} from "@/lib/copper/catalog";

const TAGLINE = "From raw ideas to refined answers.";

const PRODUCT_ALT: Record<string, string> = {
  "copper-home": "Copper Home smart speaker in Polished Copper",
  "copper-notes": "Copper Notes clip-on recorder in Brushed Copper",
};

const LIFESTYLE: Record<string, { alt: string; caption: string }> = {
  "/assets/lifestyle/copper-home-desert-light.png": {
    alt: "Copper Home speaker on a shelf in a living room lit by warm desert light",
    caption: "Copper Home keeps the house running, even when the monsoon rolls in.",
  },
  "/assets/lifestyle/copper-notes-stone-desk.png": {
    alt: "Copper Notes recorder resting on a stone desk",
    caption: "Copper Notes turns every meeting into clear action items.",
  },
  "/assets/lifestyle/copper-notes-golden-hour.png": {
    alt: "Copper Notes recorder clipped on in the golden hour light",
    caption: "Take it anywhere: lectures, interviews and sunset brainstorms.",
  },
};

function Hero({ products }: { products: Product[] }) {
  return (
    <section
      id="top"
      data-testid="hero"
      className="bg-secondary scroll-mt-16"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
        <div className="flex flex-col items-start gap-5">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Meet the AI that works for you
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl">{TAGLINE}</p>
          <Button asChild size="lg">
            <a href="#products">See products</a>
          </Button>
        </div>
        <div className="grid grid-cols-2 items-center gap-2 sm:gap-4">
          {products.map((product) => (
            <Image
              key={product.id}
              src={product.cutout}
              alt={PRODUCT_ALT[product.id] ?? product.name}
              width={1254}
              height={1254}
              priority
              sizes="(min-width: 768px) 25vw, 50vw"
              className="h-auto w-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCards({ products }: { products: Product[] }) {
  return (
    <section
      id="products"
      data-testid="products"
      className="mx-auto w-full max-w-6xl scroll-mt-16 px-4 py-16"
    >
      <h2 className="mb-8 text-3xl font-bold">Products</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {products.map((product) => (
          <Card
            key={product.id}
            data-testid="product-card"
            data-product={product.id}
          >
            <CardHeader>
              <Image
                src={product.cutout}
                alt={PRODUCT_ALT[product.id] ?? product.name}
                width={1254}
                height={1254}
                sizes="(min-width: 768px) 40vw, 90vw"
                className="mx-auto h-auto w-full max-w-xs"
              />
              <CardTitle className="mt-4 text-2xl">{product.name}</CardTitle>
              <p className="text-muted-foreground">{product.type}</p>
              <p className="text-primary text-3xl font-bold">
                {formatUsd(product.priceUsd)}
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <ul className="flex flex-col gap-2">
                {product.features.map((feature) => (
                  <li key={feature.name}>
                    <span className="font-semibold">{feature.name}:</span>{" "}
                    <span className="text-muted-foreground">
                      {feature.description}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Badge key={color} variant="secondary">
                    {color}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Showcase({ products }: { products: Product[] }) {
  const photos = products.flatMap((product) => product.lifestyle);
  return (
    <section
      id="showcase"
      data-testid="showcase"
      className="bg-secondary scroll-mt-16"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16">
        <h2 className="text-3xl font-bold">Made for Arizona living</h2>
        {photos.map((src, index) => {
          const info = LIFESTYLE[src] ?? { alt: "Copper product in use", caption: "" };
          return (
            <figure
              key={src}
              className={`grid items-center gap-6 md:grid-cols-2 ${
                index % 2 ? "md:[&>img]:order-2" : ""
              }`}
            >
              <Image
                src={src}
                alt={info.alt}
                width={1672}
                height={941}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="h-auto w-full rounded-xl"
              />
              <figcaption className="text-xl font-medium">
                {info.caption}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

function PlusPricing() {
  const [free, plus] = getPlans();
  const rows = (plan: typeof free) => [
    ["Memory kept", formatMemory(plan.memoryDays)],
    ["Copper Notes recording", formatNotesHours(plan.notesHoursPerMonth)],
    ["Refined answers", plan.refinedAnswers ? "Included" : "Not included"],
  ];
  return (
    <section
      id="plus"
      data-testid="plus-pricing"
      className="mx-auto w-full max-w-6xl scroll-mt-16 px-4 py-16"
    >
      <h2 className="mb-8 text-3xl font-bold">Free or Copper Plus</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {[free, plus].map((plan) => {
          const highlighted = plan.id === "copper-plus";
          return (
            <Card
              key={plan.id}
              className={
                highlighted ? "border-primary ring-primary border-2 ring-2" : ""
              }
            >
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <p className={highlighted ? "text-primary text-3xl font-bold" : "text-3xl font-bold"}>
                  {formatUsd(plan.monthlyUsd)}/month
                </p>
                <p className="text-muted-foreground">
                  or {formatUsd(plan.annualUsd)}/year
                </p>
              </CardHeader>
              <CardContent>
                <dl className="flex flex-col gap-3">
                  {rows(plan).map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4 border-b pb-2">
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function Privacy() {
  const privacy = getPrivacySummary();
  return (
    <section
      id="privacy"
      data-testid="privacy-summary"
      className="bg-accent text-accent-foreground scroll-mt-16"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Your privacy, plainly</h2>
          <p className="text-lg">Our {privacy.policy} privacy policy in short:</p>
          <ul className="flex list-disc flex-col gap-3 pl-5 text-lg">
            {privacy.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <Image
          src="/assets/brand/copper-mascot.png"
          alt="The Copper robot mascot waving hello"
          width={1254}
          height={1254}
          sizes="240px"
          className="mx-auto h-auto w-40 md:w-60"
        />
      </div>
    </section>
  );
}

export default function Home() {
  const products = getProducts();
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero products={products} />
        <ProductCards products={products} />
        <Showcase products={products} />
        <PlusPricing />
        <Privacy />
      </main>
      <SiteFooter />
    </>
  );
}
