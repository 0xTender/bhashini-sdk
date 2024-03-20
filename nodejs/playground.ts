import { readFileSync } from "fs";
import { initialize, textToText, detectSpeech } from "./src";
import { config } from "dotenv";
import { join } from "path";
import { tmpdir } from "os";

config({});

const auth = initialize({
  meity_config_url: process.env.BHASHINI_MEITY_CONFIG_URL!,
  dhruva_compute_url: process.env.BHASHINI_DHRUVA_COMPUTE_URL!,
  user_id: process.env.BHASHINI_USER_ID!,
  api_key: process.env.BHASHINI_API_KEY!,
  pipeline_id: process.env.BHASHINI_PIPELINE_ID!,
});

const run = async () => {
  const audio = readFileSync(join(`${"1710912938182"}.wav`)).toString("base64");

  const data = await detectSpeech(
    {
      audio: [audio, audio],
      sourceLanguage: "en",
    },
    auth
  );
  console.log(data.output);
};
/** output
 * [
 * { source: 'Some Text', target: 'कुछ पाठ' },
 * { source: 'More data', target: 'अधिक जानकारी' }
 * ]
 */

run().catch(console.error);
