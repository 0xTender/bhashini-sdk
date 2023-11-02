import { configure } from "./configure";
import { BhashiniError } from "./error";
import { Authorization, Translation } from "./types";

export const textToText = async (
  {
    text,
    sourceLanguage,
    targetLanguage,
  }: {
    text: string;
    sourceLanguage: string;
    targetLanguage: string;
  },
  env: Authorization
) => {
  const config = await configure<[Translation]>(
    [{ taskType: "translation" }],
    env
  );

  const pipelineTask = config.pipelineResponseConfig[0].config.find((e) => {
    return (
      e.language.sourceLanguage === sourceLanguage &&
      e.language.targetLanguage === targetLanguage
    );
  });

  if (!pipelineTask) {
    throw new BhashiniError({
      message: "Invalid Pipeline Task",
      code: "Invalid",
      cause: `Could not find a valid pipeline for source ${sourceLanguage} and target ${targetLanguage}`,
    });
  }

  const response = await fetch(
    config.pipelineInferenceAPIEndPoint.callbackUrl,
    {
      method: "POST",
      body: JSON.stringify({
        pipelineTasks: [
          {
            taskType: "translation",
            config: {
              language: { sourceLanguage, targetLanguage },
              serviceId: pipelineTask.serviceId,
            },
          },
        ],
        inputData: {
          input: [
            {
              source: text,
            },
          ],
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
    throw new BhashiniError({
      message: "Compute Failed: " + (await response.text()),
      code: "Failed response",
      cause: `Failed to translate ${response.status}`,
    });
  }

  const data = (await response.json()) as {
    pipelineResponse: [
      {
        taskType: "translation";
        output: { source: string; target: string }[];
      }
    ];
  };

  return data;
};
