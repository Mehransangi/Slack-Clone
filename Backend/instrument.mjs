import * as Sentry  from "@sentry/node";
import { ENV } from "./src/config/env.js";

Sentry.init({
    dsn: ENV.SENTRY_DSN,
    traceSampleRate: 1.0,
    profileSampleRate: 1.0,
    environment: ENV.NODE_ENV || "development",
    includeLocalVariables: true,
    sendDefaultPit: true
})