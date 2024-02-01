#!/usr/bin/env node
export function viteValidateEnv(schema: z.AnyZodObject): Plugin;
export type ConfigEnv = import('vite').ConfigEnv;
export type UserConfig = import('vite').UserConfig;
export type Plugin = import('vite').Plugin;
export type ZodSchema = z.ZodObject<any, any, any, {
    [x: string]: any;
}, {
    [x: string]: any;
}>;
import { z } from "../node_modules/zod/lib/index.js";
