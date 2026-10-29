import path from "node:path";
import { loadModel, translate, unloadModel } from "@qvac/sdk";
import readline from "node:readline/promises";

const ROOT = "./TranslatePsy-AfriNano";

function load(direction, from, to) {
  const dir = path.join(ROOT, direction, "Base", "intgemm");
  return loadModel({
    modelSrc: path.join(dir, "model.intgemm.alphas.bin"),
    modelType: "nmt",
    modelConfig: {
      engine: "Bergamot",
      from,
      to,
      srcVocabSrc: path.join(dir, "vocab.spm"),
      dstVocabSrc: path.join(dir, "vocab.spm")
    }
  });
}

async function translateText(modelId, text) {
  const { text: out } = translate({ modelId, text, modelType: "nmt", stream: false });
  return (await out).trim();
}

const ensw = await load("en-xx", "en", "fr");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log("Type an English sentence (or 'exit' to quit):");
while (true) {
  const input = await rl.question("> ");
  if (input.trim().toLowerCase() === "exit") break;
  const result = await translateText(ensw, "##SW " + input);
  console.log("Swahili:", result);
}

rl.close();
await unloadModel({ modelId: ensw });


//English -> Swahili: prepend ##SW
/* const ensw = await load("en-xx", "en", "fr");  // Change "sw" to "fr"
console.log(await translateText(ensw, "##SW Take one tablet twice daily after food."));*/

//English -> Swahili: prepend ##SW
/*const ensw = await load("en-xx", "en", "sw");
console.log("EN→SW:", await translateText(ensw, "##SW Take one tablet twice daily after food."));
await unloadModel({ modelId: ensw });*/

// Swahili → English: no tag
/*const swen = await load("xx-en", "sw", "en");
console.log("SW→EN:", await translateText(swen, "Chukua kidonge kimoja mara mbili kwa siku baada ya chakula."));
await unloadModel({ modelId: swen });*/