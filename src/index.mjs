#!/usr/bin/env node
import path from "node:path"
import { loadEnv, normalizePath } from "vite"
// import type {  Plugin, UserConfig } from "vite"
import { z } from "zod"

/**
 * @typedef {import('vite').ConfigEnv} ConfigEnv
 * @typedef {import('vite').UserConfig} UserConfig
 * @typedef {import('vite').Plugin} Plugin
 * @typedef {z.AnyZodObject} ZodSchema
 */

/**
 * @param      {ZodSchema}  schema  The zod schema
 * @return     {Plugin}
 */
export const viteValidateEnv = (schema) => ({
  name: "vite-plugin-validate-env",
  config: (config, env) => validate(config, env, schema),
})


/**
 * { function_description }
 *
 * @param      {UserConfig}  userConfig  The user configuration
 * @param      {ConfigEnv}   envConfig   The environment configuration
 * @param      {ZodSchema}      schema      The zod schema
 */
function validate(userConfig, envConfig, schema) {
  if (!schema) throw new Error("Missing configuration for vite-plugin-validate-env")

  const resolvedRoot = normalizePath(userConfig.root ? path.resolve(userConfig.root) : process.cwd())

  const envDir = userConfig.envDir ? normalizePath(path.resolve(resolvedRoot, userConfig.envDir)) : resolvedRoot

  const publicEnv = loadEnv(envConfig.mode, envDir, userConfig.envPrefix)
  const publicSchema = schema

  try {
    publicSchema.parse(publicEnv)
  } catch (e) {
    console.error("Invalid environment variables:")
    throw e
  }
}
