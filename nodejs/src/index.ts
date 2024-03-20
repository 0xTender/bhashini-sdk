import { Authorization, InitializationOptions } from "./types";

export const initialize = (options: InitializationOptions): Authorization => {
  return {
    BHASHINI_MEITY_CONFIG_URL: options.meity_config_url,
    BHASHINI_DHRUVA_COMPUTE_URL: options.dhruva_compute_url,
    BHASHINI_USER_ID: options.user_id,
    BHASHINI_API_KEY: options.api_key,
    BHASHINI_PIPELINE_ID: options.pipeline_id,
  };
};

export * from "./configure";
export * from "./text-to-text";
export type * from "./types";
export * from "./languages";
export * from "./detect-speech";
