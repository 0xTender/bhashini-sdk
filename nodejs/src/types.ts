export type InitializationOptions = {
  meity_config_url: string;
  dhruva_compute_url: string;
  user_id: string;
  api_key: string;
  pipeline_id: string;
};

export type Authorization = {
  BHASHINI_MEITY_CONFIG_URL: string;
  BHASHINI_DHRUVA_COMPUTE_URL: string;
  BHASHINI_USER_ID: string;
  BHASHINI_API_KEY: string;
  BHASHINI_PIPELINE_ID: string;
};

export type LanguageISOCode = string;
export type LanguageScriptCode = string;

export type ConfigResponse<T> = {
  languages: Array<{
    sourceLanguage: LanguageISOCode;
    targetLanguageList: LanguageISOCode[];
  }>;
  pipelineResponseConfig: T;
  feedbackUrl: string;
  pipelineInferenceAPIEndPoint: {
    callbackUrl: string;
    inferenceApiKey: {
      name: "Authorization";
      value: string;
    };
    isMultilingualEnabled: true;
    isSyncApi: true;
  };
  pipelineInferenceSocketEndPoint: {
    callbackUrl: string;
    inferenceApiKey: {
      name: "Authorization";
      value: string;
    };
    isMultilingualEnabled: true;
    isSyncApi: true;
  };
};

export type ASR = {
  taskType: "asr";
  config: {
    serviceId: string;
    modelId: string;
    language: {
      sourceLanguage: LanguageISOCode;
      sourceScriptCode: LanguageScriptCode;
    };
    domain: string[];
  }[];
};

export type Translation = {
  taskType: "translation";
  config: {
    serviceId: string;
    modelId: string;
    language: {
      sourceLanguage: LanguageISOCode;
      sourceScriptCode: LanguageScriptCode;
      targetLanguage: LanguageISOCode;
      targetScriptCode: LanguageScriptCode;
    };
  }[];
};

export type TTS = {
  taskType: "tts";
  config: {
    serviceId: string;
    modelId: string;
    language: {
      sourceLanguage: LanguageISOCode;
      sourceScriptCode: LanguageScriptCode;
    };
    supportedVoices: ["male", "female"];
  }[];
};
