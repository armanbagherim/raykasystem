"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div>
      <h2>
        Something went wrong! {error?.message} {error?.name}
      </h2>
    </div>
  );
}
