import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init({
      dsn: "https://d508004332181fe92025ef61dfa49add@o4507290054098944.ingest.us.sentry.io/4507290055147520",
      tracesSampleRate: 1.0,
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    Sentry.init({
      dsn: "https://d508004332181fe92025ef61dfa49add@o4507290054098944.ingest.us.sentry.io/4507290055147520",
      tracesSampleRate: 1.0,
    });
  }
}
