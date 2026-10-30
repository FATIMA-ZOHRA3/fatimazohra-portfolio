// Local dev: Vite only exposes VITE_* vars to the client, so load .env.local into process.env for server routes.
let loaded = false;
export function loadLocalEnv() {
  if (loaded) return;
  loaded = true;
  for (const file of [".env.local", ".env"]) {
    try {
      (process as unknown as { loadEnvFile?: (p: string) => void }).loadEnvFile?.(file);
    } catch {
      /* file missing: ignore */
    }
  }
}
