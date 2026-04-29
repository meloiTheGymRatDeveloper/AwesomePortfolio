/**
 * Minimal ambient declaration for the `resend` package.
 * This lets the project type-check before you run `npm install`.
 * Once the real package is installed, its bundled types take over.
 */
declare module "resend" {
  export class Resend {
    constructor(apiKey: string);
    emails: {
      send(args: {
        from: string;
        to: string | string[];
        replyTo?: string | string[];
        subject: string;
        text?: string;
        html?: string;
      }): Promise<{
        data?: { id: string } | null;
        error?: { name?: string; message: string } | null;
      }>;
    };
  }
}
