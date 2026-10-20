import Image from "next/image";

// Night Sky background in both themes, so it always uses the light wordmark.
export function SiteFooter() {
  return (
    <footer
      data-testid="site-footer"
      className="bg-[#1c2333] text-[#efe3d0]"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <Image
          src="/brand/logo-dark.png"
          alt="Copper State Labs"
          width={1200}
          height={197}
          className="h-auto w-40"
        />
        <p className="text-sm">Fictional — for educational use.</p>
      </div>
    </footer>
  );
}
