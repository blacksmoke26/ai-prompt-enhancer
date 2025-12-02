import * as envbinder from '@junaidatari/env-binder'; // important

declare module '@junaidatari/env-binder' {
  export interface EnvVariables {
    /**
     * Server hostname
     * @default 'localhost'
     */
    HOST: string;

    /**
     * Available providers
     */
    AVAILABLE_PROVIDERS: string[];

    // Add your environment variables here...
  }
}
