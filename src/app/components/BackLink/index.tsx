"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

/** Goes back to the gallery with its filters intact when we came from it. */
const BackLink = () => {
  const router = useRouter();
  return (
    <Link
      href="/"
      onClick={(e) => {
        const fromGallery =
          document.referrer &&
          new URL(document.referrer).origin === window.location.origin;
        if (fromGallery) {
          e.preventDefault();
          router.back();
        }
      }}
      className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink no-underline hover:text-ink"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        aria-hidden="true"
      >
        <path d="M14 6l-6 6 6 6" />
      </svg>
      Back to gallery
    </Link>
  );
};

export default BackLink;
