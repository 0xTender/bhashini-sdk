import { configure } from "./configure";
import { BhashiniError } from "./error";
import { TTS, Translation, Authorization } from "./types";

export const textToSpeech = async (
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
  const config = await configure<[Translation, TTS]>(
    [{ taskType: "translation" }, { taskType: "tts" }],
    env
  );

  const pipelineTask_1 = config.pipelineResponseConfig[0].config.find((e) => {
    return (
      e.language.sourceLanguage === sourceLanguage &&
      e.language.targetLanguage === targetLanguage
    );
  });

  const pipelineTask_2 = config.pipelineResponseConfig[1].config.find((e) => {
    return e.language.sourceLanguage === sourceLanguage;
  });

  if (!pipelineTask_1 || !pipelineTask_2) {
    // return trpc error
    throw new Error("pipeline task not found");
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
              serviceId: pipelineTask_1.serviceId,
            },
          },
          {
            taskType: "tts",
            config: {
              language: { sourceLanguage },
              serviceId: pipelineTask_2.serviceId,
              gender: pipelineTask_2.supportedVoices[0],
              samplingRate: 16000,
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
      },
      {
        taskType: "tts";
        audio: { audioContent: string }[];
      }
    ];
  };

  const textResponse = data.pipelineResponse[0].output
    .map((e) => e.target)
    .join("\n");
  const audio = data.pipelineResponse[1].audio[0]?.audioContent;

  const convertedAudioContent = `data:audio/wav;base64,${Buffer.from(
    audio,
    "base64"
  )}`;

  return { data, convertedAudioContent, text: textResponse };
};
