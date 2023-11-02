import { BhashiniError } from "./error";
import { Authorization, ConfigResponse } from "./types";

export const configure = async <T>(
  tasks: {
    taskType: string;
  }[],
  env: Authorization
) => {
  try {
    const configUrl = new URL(
      "ulca/apis/v0/model/getModelsPipeline",
      env.BHASHINI_MEITY_CONFIG_URL
    );

    const response = await fetch(configUrl, {
      method: "POST",
      body: JSON.stringify({
        pipelineTasks: tasks,
        pipelineRequestConfig: { pipelineId: env.BHASHINI_PIPELINE_ID },
      }),
      headers: {
        "Content-Type": "application/json",
        userID: env.BHASHINI_USER_ID,
        ulcaApiKey: env.BHASHINI_API_KEY,
        compute_call_authorization_key: "Authorization",
      },
    });

    if (!response.ok) {
      throw new Error("Config Failed: " + (await response.text()));
    }

    const data = (await response.json()) as ConfigResponse<T>;

    return data;
  } catch (err) {
    console.error(err);

    if (err instanceof Error) {
      throw new BhashiniError({
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
        // optional: pass the original error to retain stack trace
        cause: err.stack ?? "Compute Failed",
      });
    }

    throw new BhashiniError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal Server Error",
      cause: "Config Failed",
    });
  }
};
