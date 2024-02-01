# vite-validate-env

Validate Vite env with Zod.

# Setup

Update `vite.config.ts` with:

```ts
import { viteValidateEnv } from "@predragnikolic/vite-validate-env"
import z from "zod"


export default defineConfig({
  plugins: [
    viteValidateEnv(z.object({
      VITE_BASE_URL: z.string()
    }))
  ]
})
```
