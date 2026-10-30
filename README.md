# ShambaTranslate

Offline English–Swahili agricultural translator built with QVAC.

## Video Demo
https://youtu.be/sBmpVS2JrYo

## Problem
Rural Kenyan farmers receive agricultural information in English but are more comfortable in Kiswahili, and cannot afford data bundles.

## What it does
Translates English sentences to Swahili entirely offline using `qvac/TranslatePsy-AfriNano`.

## Setup
1. `npm init -y && npm pkg set type=module`
2. `npm install @qvac/sdk`
3. Download model (one-time, needs internet):
   `python -c "from huggingface_hub import snapshot_download; snapshot_download(repo_id='qvac/TranslatePsy-AfriNano', allow_patterns=['en-xx/Base/intgemm/*'], local_dir='./TranslatePsy-AfriNano')"`
4. Run: `node translate.mjs`

## QVAC integration

- **SDK/package:** `@qvac/sdk@0.22.0`
- **Model:** `qvac/TranslatePsy-AfriNano` (Apache 2.0)
- **File where QVAC is used:** `translate.mjs`
- **Model loading:** `loadModel()` inside the `load()` function , called with `load("en-xx", "en", "fr")`
- **Translation:** `translate()` inside `translateText()`, called from the terminal input loop
- **Model unloading:** `unloadModel()` , after the loop exits via `exit`
- **Workaround:** the SDK's Bergamot validation list does not include `sw`, so `to: "fr"` is used to pass validation, and the `##SW` tag on the input forces Swahili output. This is my adaptation, not the official method.

## Device
HP laptop, Windows 10, 8 GB RAM. Translation runs on CPU.

## Translation accuracy (honest assessment)

This is a small quantized model (INT8, ~89 MB), so some quality loss is expected. The purpose of this demo is to prove the offline QVAC pipeline works end to end, not to claim production-grade translation quality.



| English input | App output (Swahili) | Assessment |
|---------------|----------------------|------------|

**Assessment is either: Correct, Inaccurate or Understandable but awkward**
**Translation quality was spot-checked by one of my family members who's proficient in kiswahili, google translator & myself**

1)Give the cow one tablet twice daily after feeding. 
**AI APP TRANSLATION**: kutoa ng'ombe kibao kimoja mara mbili kwa siku baada ya kumlisha. | Inaccurate | 
**CORRECT TRANSLATION FROM GOOGLE TRANSLATOR**: Mpe ng'ombe kidonge kimoja mara mbili kwa siku baada ya kulisha

2)Spray the crops early in the morning.  
**AI APP TRANSLATION**: Mazao ya kuosha mapema asubuhi | Inaccurate | 
**CORRECT TRANSLATION FROM GOOGLE TRANSLATOR**: Nyunyizia mazao asubuhi na mapema

3)Do not mix with alkaline chemicals. 
**AI APP TRANSLATION**: Usichanganye na kemikali za alkali | Correct |

4)Effective fertilizer application is a critical aspect of soil and crop management 
**AI APP TRANSLATION**: Matumizi bora ya mbolea ni kipengele muhimu cha udongo na usimamizi wa mazao |Understandable but awkward| 
**CORRECT TRANSLATION FROM GOOGLE TRANSLATOR**: Uingizaji wa mbolea ardhini ni njia ya kuweka mbolea za maji au virutubisho kwa kuvidunga moja kwa moja kwenye udongo.

5)Soil injection is a method of applying liquid fertilizers or amendments by injecting them directly into the soil.
**AI APP TRANSLATION**: sindano ya udongo ni njia ya kutumia mbolea ya kioevu au Marekebisho kwa kuziingiza moja kwa moja kwenye udongo| Understandable but awkward|
**CORRECT TRANSLATION FROM GOOGLE TRANSLATOR**: Uwekaji wa mbolea kwa ufanisi ni kipengele muhimu sana katika usimamizi wa udongo na mazao.

6)hello how are you 
**AI APP TRANSLATION** hongera kama wewe | Inacurrate | 
**CORRECT TRANSLATION FROM GOOGLE TRANSLATOR**: habari hujambo

**Summary:** Out of 6 sentences, 1 was correct, 2 were understandable but awkward, 3 were inaccurate.

**Model card benchmark:** The official `qvac/TranslatePsy-AfriNano` model card reports an average COMET score of 0.726 for English→African languages. This is the model card's number. It indicates reasonable general translation quality, but domain-specific agricultural terminology may still be imperfect.

## Workaround documentation
The official qvac/TranslatePsy-AfriNano README documents the ##SW tag for Swahili output and shows to: "sw" in its example . However, in @qvac/sdk@0.22.0, the Bergamot language validation list does not include "sw", so to: "sw" throws REQUEST_VALIDATION_FAILED. To work around this, I pass to: "fr" (a supported code) to pass validation, while the ##SW tag on the input forces the model to generate Swahili output. This workaround is based on the official tag mechanism but the to: "fr" substitution is my adaptation for this SDK version

## Evidence for the need
- Extension workers often use English while most rural farmers cannot understand it (Chuka University repository).
link: https://repository.chuka.ac.ke/server/api/core/bitstreams/cfa3d029-d2b6-47db-b69d-b2291a5076aa/content

- A 2026 study in Laikipia County found that preference for local languages nearly doubled the likelihood of adopting digital agricultural content (Omwenga et al., 2026, AJFAND).
link: https://ajfand.net/Volume26/No4/Omwenga26375.pdf

- In Shamba Shape Up Series 13, 55% of viewers watched the Kiswahili version only, compared to 21% for English only (Makau, 2023).
link: https://agris.fao.org/search/en?filters=%7B%22subjects%22%3A%5B%7B%22operator%22%3A%22all%22%2C%22values%22%3A%5B%22behavioural%20responses%22%5D%7D%5D%7D&range=%7B%22start%22%3A2023%2C%22end%22%3A2023%7D

## DoraHacks build 
https://dorahacks.io/build/50520
