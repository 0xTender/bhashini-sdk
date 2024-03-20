import { configure } from "./configure";
import { ASR, Authorization } from "./types";
export const detectSpeech = async (
  {
    audio,
    sourceLanguage,
  }: {
    audio: string[];
    sourceLanguage: string;
  },
  env: Authorization
) => {
  const config = await configure<[ASR]>([{ taskType: "asr" }], env);

  const pipelineTask = config.pipelineResponseConfig[0].config.filter(
    (e) => e.language.sourceLanguage === sourceLanguage
  )[0];

  const response = await fetch(
    config.pipelineInferenceAPIEndPoint.callbackUrl,
    {
      method: "POST",
      body: JSON.stringify({
        pipelineTasks: [
          {
            taskType: "asr",
            config: {
              language: { sourceLanguage },
              serviceId: pipelineTask.serviceId,
            },
          },
        ],
        inputData: {
          audio: audio.map((e) => ({
            audioContent: e,
          })),
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          config.pipelineInferenceAPIEndPoint.inferenceApiKey.value,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Compute Failed: " + (await response.text()));
  }

  const data = (await response.json()) as {
    pipelineResponse: {
      taskType: "asr";
      config: null;
      output: { source: string }[];
      audio: null;
    }[];
  };

  return {
    output: data.pipelineResponse
      .map((e) => e.output.map((e) => e.source).flat())
      .flat(),
  };
};
