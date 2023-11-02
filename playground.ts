import { initialize, textToText } from "sdk";
import { config } from "dotenv";

config({});

const auth = initialize({
  meity_config_url: process.env.BHASHINI_MEITY_CONFIG_URL!,
  dhruva_compute_url: process.env.BHASHINI_DHRUVA_COMPUTE_URL!,
  user_id: process.env.BHASHINI_USER_ID!,
  api_key: process.env.BHASHINI_API_KEY!,
  pipeline_id: process.env.BHASHINI_PIPELINE_ID!,
});

const run = async () => {
  const data = await textToText(
    {
      text: ["Some Text", "More data"],
      sourceLanguage: "en",
      targetLanguage: "hi",
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
