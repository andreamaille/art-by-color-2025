import Link from "next/link";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1376px] px-4 md:px-8">
      <Header />
      <main className="flex flex-col items-start gap-6 py-24">
        <h1 className="m-0 font-display text-[clamp(40px,6vw,80px)] leading-none font-normal">
          We couldn't find <em>that work</em>.
        </h1>
        <p className="m-0 text-lg text-graphite">
          It may have been moved or removed from the collection.
        </p>
        <Link href="/">Back to the gallery</Link>
      </main>
      <Footer />
    </div>
  );
}
