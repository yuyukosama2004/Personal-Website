---
title: Encrypted-only Cloud Storage for Multi-device Obsidian Sync with Syncthing
description: A 2-core cloud server acts as an always-online node, and Syncthing's Receive Encrypted mode keeps Windows, phone, and tablet in sync without plaintext on the server.
publishedAt: 2026-02-21
tags: [Self-hosting, Syncthing, Obsidian, Privacy]
draft: false
featured: false
---

I keep my notes in Obsidian across a Windows laptop, an Android phone, and a tablet. The three devices need to read and write the same Markdown vault, and there must be an always-online node so offline devices can catch up. But I do not want the cloud server to hold any plaintext notes. The result: **Syncthing for multi-device sync, with the cloud server as a Receive Encrypted ciphertext-only node**.

## Why not cloud drives or Git

Cloud drives store plaintext on the vendor side, and Android folder sync with many small files is unreliable. Git is great for version control, but committing and pushing from a phone after every edit is unnatural for daily notes.

The real question is not whether the server keeps files, but:

```text
Does the server store plaintext or ciphertext?
```

Syncthing's Untrusted / Receive Encrypted mode answers it directly: **trusted devices keep plaintext and the encryption password; untrusted devices keep ciphertext only.** A cloud server can be “untrusted but useful” infrastructure.

## The final layout

```text
Windows / phone / tablet: plaintext vault, Send & Receive
Cloud server: /srv/syncthing, Receive Encrypted, ciphertext only, no password
Deployment: a single Docker container, no Compose
```

Two security points matter most:

1. The web UI port `8384` listens only on `127.0.0.1` and is reached over an SSH tunnel, never exposed publicly;
2. Only `22000/TCP` and `22000/UDP` are opened for sync.

Most guides focus on “getting it running”, but the real risk is the attack surface: once `8384` binds to `0.0.0.0`, the management plane is reachable from the public internet.

## The acceptance test: no plaintext on the server

“Sync succeeded” is not enough. Verify on the server directly:

```bash
find /srv/syncthing/obsidian -name "*.md"      # should print nothing
grep -R "a note keyword" /srv/syncthing/obsidian  # should find nothing
```

If you can see `journal.md` or `projects.md`, the folder type is Send & Receive instead of Receive Encrypted, and the privacy goal has failed.

## Pitfalls I hit

- `apt install docker-compose-plugin` failed and took `docker.io` down with it; a single container only needs `docker.io`.
- “Unable to find image locally” is not an error—it means the image has to be pulled. Do not Ctrl+C it.
- “Receive Encrypted” hides under Advanced → Folder Type, not the normal page.
- Copy the real device ID; pasting the literal words “server device ID” is rejected.
- On Android, “configured correctly but not syncing” is usually the OS killing the background process: set battery unrestricted, allow autostart, and enable the foreground service.

## What I learned

**Sync is not backup.** Deletions propagate to every device, so enable file versioning on Windows and keep a separate encrypted offline backup.

**Port exposure matters more than deployment.** A running service is only the first step; which address it binds and which ports are public decide the security.

**`127.0.0.1` always means “this machine”.** To open the server UI from Windows, use `ssh -L 18384:127.0.0.1:8384`, not `server-ip:8384`.

In the end this setup delivers all three at once: automatic multi-device sync, a cloud that stores no plaintext, and data that stays in my own hands.
