# 企业级官网全栈项目

企业级官网系统：**前台展示（Vue3 + Tailwind）**、**后台 CMS（Vue3 + Element Plus）**、**Koa2 + Sequelize + MySQL 5.6** 统一接口服务。

## 项目结构

```
CompanyOfficialWebsite/
├── portal/          # 前台官网 (端口 5173)
├── admin/           # 后台 CMS (端口 5174)
├── server/          # Koa API (端口 3000)
├── database/        # MySQL 5.6 建表与种子数据
└── README.md
```

## 环境要求

- Node.js 18+
- MySQL 5.6+（utf8mb4，勿使用 JSON 字段等 8.0 特性）

## 一、数据库初始化

```bash
mysql -u root -p < database/init.sql
```

修改 `server/.env`（复制自 `.env.example`）：

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=kongchuang_website
DB_USER=root
DB_PASS=你的密码
JWT_SECRET=请修改为随机长字符串
```

## 二、启动后端

```bash
cd server
cp .env.example .env
# 编辑 .env 填入数据库密码
npm install
npm run dev
```

- API 地址：`http://localhost:3000`
- 健康检查：`http://localhost:3000/health`
- 上传目录：`server/uploads`（访问路径 `/uploads/xxx`）

**默认管理员**（首次启动自动创建）：

| 账号  | 密码         |
| ----- | ------------ |
| admin | Admin@123456 |

登录后请立即在后台「修改密码」中更换。

## 三、启动前台官网

```bash
cd portal
npm install
npm run dev
```

访问：`http://localhost:5173`

开发环境已通过 Vite 代理转发 `/api` 与 `/uploads` 到后端。

## 四、启动后台 CMS

```bash
cd admin
npm install
npm run dev
```

访问：`http://localhost:5174`

## 五、生产构建与部署

### 5.1 构建前端

```bash
cd portal && npm run build    # 产出 portal/dist
cd admin && npm run build     # 产出 admin/dist
```

### 5.2 部署建议（Nginx）

- `www.example.com` → `portal/dist`（history 模式需 `try_files $uri /index.html`）
- `admin.example.com` 或 `www.example.com/admin` → `admin/dist`
- `/api`、`/uploads` 反向代理到 Node `127.0.0.1:3000`

### 5.3 进程守护

```bash
cd server
NODE_ENV=production npm start
# 推荐使用 pm2: pm2 start app.js --name kongchuang-api
```

### 5.4 SEO 上线 checklist

1. 修改 `portal/public/sitemap.xml`、`robots.txt` 中的域名为正式域名
2. 在「网站配置」中填写真实 ICP、公安备案号
3. 百度/360/搜狗站长平台提交 sitemap，配置主动推送（可扩展 `server/routes` 推送接口）
4. SPA 收录：生产环境建议增加预渲染（如 `vite-plugin-prerender`）或 SSR，当前各页已通过 `@vueuse/head` 动态注入 Title/Keywords/Description

## 六、功能对照

| 模块                              | 前台 | 后台 CMS |
| --------------------------------- | ---- | -------- |
| 轮播/首页优势                     | ✓    | ✓        |
| 产品（研华/智微/自研）+ 资料下载  | ✓    | ✓        |
| 解决方案 / 案例 / 资讯            | ✓    | ✓        |
| 资质 / 合作伙伴 / 公司实力 / 关于 | ✓    | ✓        |
| 联系我们（无留言表单）            | ✓    | -        |
| 隐私政策 / 服务条款               | ✓    | -        |
| 网站配置 / 日志 / 改密            | -    | ✓        |

## 七、技术栈说明

- **ORM**：Sequelize 5.x，全部数据访问经模型，无原生 SQL
- **安全**：bcrypt 密码、JWT、验证码、登录锁定、接口限流、防重复提交、上传类型校验
- **SEO**：独立页面 meta、语义化 H1、图片 alt、伪静态路由、sitemap/robots

## 八、常见问题

**Q: 前台接口报错连接失败？**  
确认 `server` 已启动，且 `portal/vite.config.js` 代理目标端口正确。

**Q: 图片不显示？**  
上传后 URL 为 `/uploads/xxx`，需保证 Nginx 或开发代理能访问后端静态目录。

**Q: MySQL 版本？**  
严格兼容 5.6，表结构未使用 JSON 列与窗口函数。

---

**企业宗旨：成就客户** — kingduck网络工作室。
