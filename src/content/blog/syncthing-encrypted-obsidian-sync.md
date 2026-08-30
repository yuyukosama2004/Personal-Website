---
title: 让云服务器只存密文：用 Syncthing 搭一套多端 Obsidian 同步
description: 用一台 2H2G 云服务器做常在线节点，通过 Syncthing 的 Receive Encrypted 模式让 Windows、手机、平板同步同一套 Obsidian 笔记，服务器磁盘上不出现任何明文 Markdown。
publishedAt: 2026-02-21
tags: [Self-hosting, Syncthing, Obsidian, 隐私]
draft: false
featured: false
---

我用 Obsidian 记笔记，设备有 Windows 电脑、安卓手机和平板。三端要能读写同一套 Markdown，还要有一个常在线节点让离线设备补同步，但我不希望云服务器上保存任何明文笔记。最后落地的是：**Syncthing 多端同步 + 云服务器作为 Receive Encrypted 密文节点**。

## 为什么不用网盘，也不用 Git

网盘会把明文文件存在服务商那边，安卓端文件夹同步和小文件体验也不稳定。Git 适合版本管理，但手机上每次改完还要 commit、push，冲突解决成本高，对日常笔记不自然。

真正要回答的问题不是“服务器要不要保存文件”，而是：

```text
服务器保存的是明文，还是密文？
```

Syncthing 的 Untrusted / Receive Encrypted 模式正好给出答案：**可信设备保存明文和加密密码，不可信设备只保存密文。** 云服务器可以是“不可信但可用”的基础设施。

## 最终架构

```text
Windows / 手机 / 平板：明文 Obsidian 仓库，Send & Receive
云服务器：/srv/syncthing，Receive Encrypted，只存密文，不存密码
部署：Docker 单容器，无需 Compose
```

两个最重要的安全点：

1. 管理后台 `8384` 只监听 `127.0.0.1`，通过 SSH 隧道访问，绝不开放公网；
2. 同步端口只开放 `22000/TCP` 和 `22000/UDP`。

很多搭建教程把精力放在“跑起来”，但真正的风险在“暴露面”：`8384` 一旦监听 `0.0.0.0`，管理面就可能被人从公网摸到。

## 关键验收：服务器上必须看不到明文

配置完不是看“同步成功”就算完，而是直接上服务器验证：

```bash
find /srv/syncthing/obsidian -name "*.md"   # 应该无输出
grep -R "某个笔记关键词" /srv/syncthing/obsidian  # 应该搜不到
```

如果能看到 `日记.md`、`项目记录.md`，说明文件夹类型配成了 Send & Receive，而不是 Receive Encrypted，隐私目标就没实现。

## 踩过的坑

- `apt install docker-compose-plugin` 找不到包，连带 `docker.io` 也没装上；这个场景只有一个容器，单独装 `docker.io` 即可。
- `Unable to find image locally` 不是报错，只是本地没有镜像要拉取，别急着按 Ctrl+C。
- “接收加密”不在常规页，藏在“高级 → 文件夹类型”里。
- 设备 ID 要复制真实的一长串，把“服务器 Device ID”这几个字填进去会提示无效。
- 安卓端“配置都对但不同步”，十有八九是系统杀后台：电池不限制、允许自启动、开启前台服务之后才稳定。

## 学到的

**同步不是备份。** 误删操作会被同步到所有端，所以 Windows 端要开版本控制，重要数据另做加密压缩的离线备份。

**端口暴露比服务部署更重要。** 服务跑起来只是第一步，监听在哪个地址、哪些端口开放到公网，才决定安全性。

**`127.0.0.1` 永远指“当前这台机器”。** 想在 Windows 上打开服务器的管理后台，需要 `ssh -L 18384:127.0.0.1:8384` 做隧道，而不是访问 `服务器IP:8384`。

这套方案最终同时拿到三样东西：多端自动同步的便利、云端不落明文的隐私、数据仍然在自己手里的可控性。
