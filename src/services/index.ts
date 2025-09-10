/**
 * @captify/pmbook/services - Server-side exports
 *
 * Contains configuration and any true server-side services for the pmbook application.
 * Client-side data functions are located in data.ts files next to their respective pages.
 */

import { config } from "./config";

// Export configuration for platform discovery
export { config } from "./config";

// Export types
export type * from "../types";
