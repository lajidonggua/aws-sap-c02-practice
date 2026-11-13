# Cloudflare 账号与学习进度

正式接口：`https://sap-learning-account.dongguaxiami.workers.dev`。正式数据库与开发数据库分开配置，`npm run dev` 使用 development 环境；默认发布命令明确选择正式环境。

前端继续使用 GitHub Pages；本目录提供 Cloudflare Worker 和 D1 数据库。登录使用 Better Auth 的邮箱和密码认证、scrypt 密码哈希与带签名的会话令牌。每次查询和更新的用户标识均来自服务端验证的会话。

## 本地验证

```sh
npm ci --legacy-peer-deps
```

创建本地 `.dev.vars`，填入一个随机生成、至少 32 字符的 `BETTER_AUTH_SECRET`。此文件已忽略，不能提交到 Git。

```sh
npx wrangler d1 migrations apply sap-learning-progress-local --env development --local
npm run dev
```

前端可通过静态服务器预览。将 `account_config.js` 的 `apiBase` 临时设为 `http://127.0.0.1:8787`，即可使用真实本地 D1 验证注册、登录和同步。默认本地开发允许 8765 与 8000 端口。

## 发布

1. 使用 Wrangler 授权 Cloudflare。仅需账号读取、Worker 写入和 D1 写入权限。
2. 创建 `sap-learning-progress` D1 数据库，将返回的 `database_id` 填入 `wrangler.jsonc`。
3. 使用 `wrangler secret put BETTER_AUTH_SECRET` 设置一个新的生产密钥，不要复用本地测试密钥。
4. 执行数据库迁移，再发布 Worker。将 `AUTH_BASE_URL` 更新为实际的 HTTPS Worker 地址；`ALLOWED_ORIGINS` 仅保留要使用的前端网站来源。
5. 把根目录 `account_config.js` 的 `apiBase` 设为 Worker 地址，然后按原工作流发布 GitHub Pages。

```sh
npx wrangler d1 migrations apply sap-learning-progress --remote
npm run deploy
```

首次发布前可以执行 `wrangler deploy --dry-run` 检查打包。无需给浏览器提供 Cloudflare API 密钥；浏览器端配置只有公开的接口地址。

## 保存与合并

- 题目答案、收藏、闪记标记、章节、理解自测和阅读位置分别存储为带时间戳的记录。
- 数据库通过 `(user_id, cell)` 唯一键和条件更新原子合并，两个设备做不同题时不会覆盖整份进度。
- 删除或取消标记保留为墓碑记录，避免旧设备重新带回已取消的标记。
- 每个账号与访客使用不同的本地档案；访客记录需要主动选择合入账号。
- 备份只导出允许的学习记录，不包含密码、会话令牌、邮箱或服务密钥。
- 断网记录保留在本机，在联网、重新显示页面、聚焦页面或点击“立即同步”时重试。
- 短课复习和草稿通过 `schema: 2` 同步。未声明该版本的旧客户端只收到原有字段，且不会删除云端短课记录。升级先发布后端，再更新前端资源版本。

当前提供邮箱和密码登录，**未配置邮箱验证与密码找回邮件**。账号页面已明确这一点，并支持登录后修改密码。启用公开服务前，可根据实际用户量配置邮件服务和反机器人验证；不要降低已有的密码哈希或登录频率限制。

## 检查

根目录 `test_progress_store.cjs` 验证迁移、设备合并、账号隔离、取消标记、备份和浏览器禁用存储的行为。浏览器检查还应实际验证两次独立登录、断网恢复、退出后令牌失效和账号之间不能读取进度。
