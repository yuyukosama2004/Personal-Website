---
title: 'Bringing Immersive Translate Back On-device: From Qwen3.5 to Hy-MT2'
description: "Local Ollama replaces cloud translation: taming Qwen3.5's thinking mode, dropping the proxy with translation-native Hy-MT2, and a storage-wipe forensics story."
publishedAt: 2026-08-14
tags: [Ollama, Local Models, Web Translation, Debugging]
draft: false
featured: false
---

I read a lot of English technical documentation and wanted Immersive Translate to run on a local model instead of a cloud API: no quota spending, no content leaving the machine, full control over prompts and parameters. It turned out to be much more than filling in an endpoint.

## First pitfall: the endpoint works, but every request times out

Immersive Translate speaks OpenAI-compatible APIs, and Ollama exposes `/v1/chat/completions`, so pointing it at `http://localhost:11434` should just work. Instead, the service test reported `Request timeout after 101000ms`.

From the command line the model printed a long preamble:

```text
Thinking...
1. Analyze the Request
2. Draft Translation
```

Qwen3.5 enters thinking mode by default, so the translation lands in the `reasoning` field while the `content` field Immersive Translate reads is empty. Writing “don't think” into the prompt does not help—**a prompt is guidance, not a switch**. The reliable fix is passing `"think": false` to Ollama's native `/api/chat`.

## The fix: a local proxy for protocol translation

Immersive Translate only speaks the OpenAI shape, so I wrote a small FastAPI proxy:

```text
Immersive Translate → http://127.0.0.1:8008/v1/chat/completions
→ proxy converts and forces think:false
→ Ollama /api/chat → translation
→ proxy wraps it back into OpenAI format
```

The proxy does not make the model smarter; it fixes protocol and parameter mismatches. It also absorbed two smaller bugs: mojibake (solved with `json.dumps(..., ensure_ascii=True)` plus `charset=utf-8`) and `keep_alive: 5m` to balance cold starts against memory use.

## A slow full page is rarely a slow model

Each individual translation is fast; the pain is queueing across a whole page, which gets split into many segments that each re-send the prompt. But batching too many segments breaks technical pages, because translations must be inserted back into the DOM and merged paragraphs destroy Markdown structure. The final settings: 2 requests per second, 800–1000 characters and 2–3 segments per request, more conservative for docs.

## Switching models: let a specialist do the specialist work

The Qwen3.5 setup worked, but thinking handling, prompt tuning, and structure preservation kept costing effort. I switched to **Hy-MT2 (hymt2-q4-fixed)**: a 1.8B translation-native model (Apache 2.0) with no thinking mode, output closer to a plain translation API, and better terminology consistency.

The biggest win is a shorter chain—the proxy becomes optional:

```text
Immersive Translate → http://127.0.0.1:11434/v1/chat/completions → Ollama → hymt2-q4-fixed
```

A general chat model doing translation is moonlighting; a translation-native model is doing its job. The 1.1GB Q4 build is trivial on 8GB of VRAM.

## Forensics: when the extension config vanished

One day Immersive Translate was back to the default free service with no trace of my local setup. The extension was neither updated nor reinstalled, so I reconstructed the timeline from its IndexedDB storage in the Firefox profile: re-login at 20:46, consent re-accepted at 20:49, config rewritten at 20:56 that day. Conclusion: **the extension storage was cleared and re-initialized**—most likely clearing browser data took the extension storage with it.

Three lessons: extension storage is part of site data; export and back up important extension configs; and since local services are not auto-started daemons, first ask whether the config is gone, the service is down, or the model never loaded.

## What I learned

API compatibility does not mean behavioral compatibility; a model that runs in `ollama run` is not automatically app-ready; thinking models are a poor fit for translation services; preserving structure is harder than translating a sentence. The final setup:

```text
Immersive Translate + Ollama + hymt2-q4-fixed
Checks: is Ollama running? Does the model exist? Is the config there? Is the port alive?
```
