import { isBrowser } from "./utils";
export const StorageAdapters = isBrowser
  ? {}
  : {
      fileStorage: async (
        audioContent: string,
        sourceLanguage: string,
        targetLanguage: string,
        options: {
          filePath: string;
          fileName: string;
          overrideFileRename?: boolean;
        }
      ) => {
        const { join } = await import("path");
        const { writeFileSync } = await import("fs");
        let outFileName = `${
          options.fileName
        }-${sourceLanguage}-${targetLanguage}-${Date.now()}.wav`;

        if (options.overrideFileRename) {
          outFileName = options.fileName;
        }

        writeFileSync(
          join(options.filePath, outFileName),
          Buffer.from(audioContent, "base64")
        );
      },
    };
