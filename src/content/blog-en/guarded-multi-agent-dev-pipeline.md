---
title: Why I Built a Guarded Multi-Agent Development Pipeline
description: Splitting Codex, Claude Code, and DeepSeek into separate roles with an external state machine, isolated worktrees, and a deterministic approval gate—evidence over assertions.
publishedAt: 2026-06-27
tags: [Multi-Agent, Codex, DeepSeek, MCP, Engineering Process]
draft: false
featured: false
project: guarded-agent-pipeline
---

AI can already write code. The problem I kept hitting is different: **once models participate in real development, how do you make them stable, controllable, affordable, and recoverable?**

At first I saw concrete failures. Models change too many files, quietly expand scope, and run unnecessary test suites. Worse, they confuse “I think it's done” with “it is done”—a message saying “done, tests passed” is a claim, not evidence. And chat history is not a state machine: when a task fails halfway, it is hard to tell the current state, which commit is the artifact, which tests actually ran, or whether recovery is possible.

## Three principles: externalize state, verification, and the gate

Multi-agent is not two models chatting with each other; it is separation of responsibility. Codex plans, reviews, and takes over; DeepSeek implements and applies ordinary fixes; external programs act as referee. Every task keeps a machine-readable set of files such as `STATE.json` on disk, so work survives a lost conversation. Verification comes from exit codes and logs, not self-reports. Whether a push is allowed comes from a deterministic gate, not a model sentence.

The mechanisms that matter:

- **Isolated worktrees**: each task runs on its own branch, so it never touches the main workspace and a failed run's output stays available for Codex to take over.
- **Structured handoffs**: DeepSeek must emit JSON with `files_changed` and `commands_claimed`, even on failure, so the outside program knows the next step.
- **Bounded fix cycles**: DeepSeek gets at most two fix attempts before Codex takes over the worktree. In practice DeepSeek often exits on `max_turns`, but the 80% it produced is usually usable—Codex patches types and tests, then commits.
- **Tiered verification**: during development only failing tests run; the full suite runs once on the final candidate instead of every round.

## From PowerShell scripts to a Codex plugin

The first version used PowerShell to prove the workflow fast, but it felt like scripts rather than a Codex capability. The current shape has three layers: a Skill that triggers and orchestrates, a TypeScript MCP server exposing 14 structured tools (create task, submit plan, query jobs, cancel, submit review...), and PowerShell kept for the state machine and recovery. Codex faces explicit tool boundaries instead of arbitrary shell access.

I migrated only the low-risk, testable read-only layers to TypeScript instead of rewriting the control plane in one go, because the pipeline itself is an engineering system: once, two PowerShell scripts treated the multi-line output of `git diff --name-only` as a single path, so a legitimate multi-file fix was wrongly rejected. The bug was not in DeepSeek's code—it was an untested boundary in the orchestrator.

## What I learned

The core of AI-assisted development is not “make the model write more code” but “make the model misbehave less”. Failed runs hold value: a process failing does not mean its output is useless. Cost control is an architecture problem—don't re-send full context, let models read log summaries, let DeepSeek implement while Codex judges. And the final gate must be deterministic: a model may suggest approval, but it may never approve itself.

```text
Models propose and produce
Programs constrain and verify
Humans authorize
```

This project is not about letting one super-model automate everything. It is about giving models explicit roles, tasks explicit states, changes explicit boundaries, verification explicit evidence, failures explicit recovery paths, and final actions explicit gates. The useful AI workflows of the future will not compete on whose model is smarter, but on who organizes models better.
