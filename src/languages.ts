export const languageMap: Record<string, string> = {
  bn: "Bengali",
  as: "Assamese",
  en: "English",
  gu: "Gujarati",
  hi: "Hindi",
  kn: "Kannada",
  ml: "Malayalam",
  mr: "Marathi",
  or: "Odia",
  pa: "Panjabi",
  ta: "Tamil",
  te: "Telugu",
  sa: "Sanskrit",
  ur: "Urdu",
} as const;

export const languages = {
  bn: ["en", "as", "gu", "hi", "kn", "ml", "mni", "mr", "or", "pa", "ta", "te"],
  en: ["as", "bn", "gu", "hi", "kn", "ml", "mni", "mr", "or", "pa", "ta", "te"],
  gu: ["en", "as", "bn", "hi", "kn", "ml", "mni", "mr", "or", "pa", "ta", "te"],
  hi: ["en", "as", "bn", "gu", "kn", "ml", "mni", "mr", "or", "pa", "ta", "te"],
  kn: ["en", "as", "bn", "gu", "hi", "ml", "mni", "mr", "or", "pa", "ta", "te"],
  ml: ["en", "as", "bn", "gu", "hi", "kn", "mni", "mr", "or", "pa", "ta", "te"],
  mr: ["en", "as", "bn", "gu", "hi", "kn", "ml", "mni", "or", "pa", "ta", "te"],
  or: ["en", "as", "bn", "gu", "hi", "kn", "ml", "mni", "mr", "pa", "ta", "te"],
  pa: ["en", "as", "bn", "gu", "hi", "kn", "ml", "mni", "mr", "or", "ta", "te"],
  sa: [
    "en",
    "as",
    "bn",
    "gu",
    "hi",
    "kn",
    "ml",
    "mni",
    "mr",
    "or",
    "pa",
    "ta",
    "te",
  ],
  ta: ["en", "as", "bn", "gu", "hi", "kn", "ml", "mni", "mr", "or", "pa", "te"],
  te: ["en", "as", "bn", "gu", "hi", "kn", "ml", "mni", "mr", "or", "pa", "ta"],
  ur: [
    "en",
    "as",
    "bn",
    "gu",
    "hi",
    "kn",
    "ml",
    "mni",
    "mr",
    "or",
    "pa",
    "ta",
    "te",
  ],
} as const;

export const isTranslationValid = (source: string, target: string) => {
  if (source === target) {
    return false;
  }
  if (!Object.keys(languages).includes(source)) {
    return false;
  }
  if (!languages[source as keyof typeof languages].includes(target as any)) {
    return false;
  }
  return true;
};
