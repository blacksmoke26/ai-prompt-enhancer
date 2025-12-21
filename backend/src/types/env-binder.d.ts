import * as envbinder from '@junaidatari/env-binder'; // important

declare module '@junaidatari/env-binder' {
  export interface EnvVariables {
    /**
     * The host address the server will listen on.
     * @example '0.0.0.0'
     * @developerNote Set to '127.0.0.1' for local development.
     */
    HOST: string;

    /**
     * The port number the server will listen on.
     * @example 3000
     * @developerNote Adjust based on your deployment environment or firewall settings.
     */
    PORT: number;

    /**
     * Enables or disables logging for the Fastify server.
     * @example true
     * @developerNote Set to `false` to disable server logging in production.
     */
    LOGGING_FASTIFY_SERVER: boolean;

    /**
     * Comma-separated list of allowed origins for CORS.
     * @example 'http://example.com'
     * @developerNote Leave empty to disable CORS or specify origins for security.
     */
    CORS_ALLOWED_ORIGIN: string;

    /**
     * Comma-separated list of allowed IP addresses for CORS.
     * @example '192.168.1.1,192.168.1.2'
     * @developerNote Restrict to trusted IPs for enhanced security.
     */
    CORS_ALLOWED_IPS: string;

    /**
     * Comma-separated list of allowed headers for CORS.
     * @example 'Content-Type, Authorization'
     * @developerNote Customize based on the required headers for your API.
     */
    CORS_ALLOWED_ORIGIN_HEADERS: string;

    /**
     * Maximum number of requests allowed per time window for rate limiting.
     * @example 100
     * @developerNote Adjust based on expected traffic and abuse prevention needs.
     */
    RATE_LIMIT_MAX: number;

    /**
     * Time window for rate limiting (e.g., '1 minute', '1 hour').
     * @example '1 minute'
     * @developerNote Use valid time units supported by your rate-limiting library.
     */
    RATE_LIMIT_TIME_WINDOW: string;

    /**
     * Relative path to the SQLite database file.
     * @example 'database/database.sqlite'
     * @developerNote Ensure the directory exists and is writable by the application.
     */
    SQLITE_STORAGE: string;
  }
}
