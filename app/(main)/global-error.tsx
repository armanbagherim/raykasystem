"use client";

import NextError from "next/error";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html>
      <body>
        <NextError statusCode={undefined as any} />
      </body>
    </html>
  );
}
