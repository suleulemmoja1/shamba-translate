# ShambaTranslate

Offline English–Swahili agricultural translator built with QVAC.

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
- SDK: `@qvac/sdk` version `0.22.0`
- Model: `qvac/TranslatePsy-AfriNano` (Apache 2.0)
- Files: `translate.mjs` uses `loadModel`, `translate`, `unloadModel`
- Workaround: the SDK's Bergamot language validation list does not include `sw`, so `to` is set to `"fr"` to pass validation, and the `##SW` tag on the input forces Swahili output. This is documented openly.

## Device
HP laptop, Windows 10, 8 GB RAM. Translation runs on CPU.
