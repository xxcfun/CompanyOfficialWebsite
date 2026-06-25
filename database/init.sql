-- 济南控创电子工控官网 MySQL 5.6 建表脚本
-- 字符集 utf8mb4，兼容 MySQL 5.6，无 JSON 字段

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE DATABASE IF NOT EXISTS `kongchuang_website` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `kongchuang_website`;

-- 1. 首页轮播图
DROP TABLE IF EXISTS `banners`;
CREATE TABLE `banners` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `title` varchar(200) NOT NULL DEFAULT '' COMMENT '标题',
  `subtitle` varchar(500) NOT NULL DEFAULT '' COMMENT '副标题',
  `image_url` varchar(500) NOT NULL DEFAULT '' COMMENT '图片地址',
  `link_url` varchar(500) NOT NULL DEFAULT '' COMMENT '跳转链接',
  `sort_order` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态 1启用 0禁用',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='首页轮播图';

-- 2. 产品表 type: 1研华 2智微智能 3自研
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` tinyint(1) NOT NULL DEFAULT '1' COMMENT '分类 1研华 2智微 3自研',
  `name` varchar(200) NOT NULL DEFAULT '' COMMENT '产品名称',
  `cover` varchar(500) NOT NULL DEFAULT '' COMMENT '封面图',
  `summary` varchar(1000) NOT NULL DEFAULT '' COMMENT '简介',
  `content` mediumtext COMMENT '详情内容',
  `params` text COMMENT '产品参数JSON文本',
  `scenes` text COMMENT '适用场景',
  `industry` varchar(500) NOT NULL DEFAULT '' COMMENT '行业用途',
  `seo_title` varchar(200) NOT NULL DEFAULT '' COMMENT 'SEO标题',
  `seo_keywords` varchar(500) NOT NULL DEFAULT '' COMMENT 'SEO关键词',
  `seo_description` varchar(500) NOT NULL DEFAULT '' COMMENT 'SEO描述',
  `sort_order` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '上下架 1上架 0下架',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_type_status` (`type`,`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='产品表';

-- 3. 解决方案
DROP TABLE IF EXISTS `solutions`;
CREATE TABLE `solutions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `category` varchar(100) NOT NULL DEFAULT '' COMMENT '方案分类',
  `title` varchar(200) NOT NULL DEFAULT '' COMMENT '方案标题',
  `cover` varchar(500) NOT NULL DEFAULT '' COMMENT '封面',
  `summary` varchar(1000) NOT NULL DEFAULT '' COMMENT '摘要',
  `scene_desc` text COMMENT '场景介绍',
  `devices` text COMMENT '适配设备',
  `pain_points` text COMMENT '行业痛点',
  `advantages` text COMMENT '落地优势',
  `service` text COMMENT '服务保障',
  `content` mediumtext COMMENT '详情内容',
  `seo_title` varchar(200) NOT NULL DEFAULT '',
  `seo_keywords` varchar(500) NOT NULL DEFAULT '',
  `seo_description` varchar(500) NOT NULL DEFAULT '',
  `sort_order` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='行业解决方案';

-- 4. 成功案例
DROP TABLE IF EXISTS `cases`;
CREATE TABLE `cases` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `customer_name` varchar(200) NOT NULL DEFAULT '' COMMENT '客户名称',
  `project_scene` varchar(500) NOT NULL DEFAULT '' COMMENT '项目场景',
  `devices_used` varchar(500) NOT NULL DEFAULT '' COMMENT '所用设备',
  `result` text COMMENT '项目成果',
  `cover` varchar(500) NOT NULL DEFAULT '' COMMENT '封面',
  `content` mediumtext COMMENT '详情',
  `location` varchar(100) NOT NULL DEFAULT '山东' COMMENT '地区',
  `seo_title` varchar(200) NOT NULL DEFAULT '',
  `seo_keywords` varchar(500) NOT NULL DEFAULT '',
  `seo_description` varchar(500) NOT NULL DEFAULT '',
  `sort_order` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='成功案例';

-- 5. 公司实力
DROP TABLE IF EXISTS `company_strength`;
CREATE TABLE `company_strength` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `section_key` varchar(50) NOT NULL DEFAULT '' COMMENT '区块标识',
  `title` varchar(200) NOT NULL DEFAULT '' COMMENT '标题',
  `content` mediumtext COMMENT '内容',
  `image_url` varchar(500) NOT NULL DEFAULT '' COMMENT '配图',
  `sort_order` int(11) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_section_key` (`section_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='公司实力';

-- 6. 关于我们
DROP TABLE IF EXISTS `about`;
CREATE TABLE `about` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `intro` mediumtext COMMENT '公司简介',
  `history` mediumtext COMMENT '发展历程',
  `mission` varchar(500) NOT NULL DEFAULT '成就客户' COMMENT '企业宗旨',
  `philosophy` text COMMENT '经营理念',
  `vision` text COMMENT '企业愿景',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='关于我们';

-- 7. 管理员
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(50) NOT NULL DEFAULT '' COMMENT '账号',
  `password` varchar(200) NOT NULL DEFAULT '' COMMENT 'bcrypt密码',
  `login_fail_count` int(11) NOT NULL DEFAULT '0' COMMENT '登录失败次数',
  `lock_until` datetime DEFAULT NULL COMMENT '锁定截止时间',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='管理员';

-- 8. 新闻资讯 category: 1公司动态 2行业资讯 3技术干货 4新品发布
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `category` tinyint(1) NOT NULL DEFAULT '1' COMMENT '分类',
  `title` varchar(200) NOT NULL DEFAULT '' COMMENT '标题',
  `cover` varchar(500) NOT NULL DEFAULT '' COMMENT '封面',
  `summary` varchar(1000) NOT NULL DEFAULT '' COMMENT '摘要',
  `content` mediumtext COMMENT '内容',
  `publish_time` datetime DEFAULT NULL COMMENT '发布时间',
  `seo_title` varchar(200) NOT NULL DEFAULT '',
  `seo_keywords` varchar(500) NOT NULL DEFAULT '',
  `seo_description` varchar(500) NOT NULL DEFAULT '',
  `sort_order` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_category_status` (`category`,`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='新闻资讯';

-- 9. 资质证书 type: 1品牌授权 2企业荣誉 3行业资质
DROP TABLE IF EXISTS `certificate`;
CREATE TABLE `certificate` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(200) NOT NULL DEFAULT '' COMMENT '证书名称',
  `image_url` varchar(500) NOT NULL DEFAULT '' COMMENT '图片',
  `summary` varchar(1000) NOT NULL DEFAULT '' COMMENT '简介',
  `cert_type` tinyint(1) NOT NULL DEFAULT '1' COMMENT '类型',
  `sort_order` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='资质证书';

-- 10. 合作伙伴
DROP TABLE IF EXISTS `partner`;
CREATE TABLE `partner` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(200) NOT NULL DEFAULT '' COMMENT '客户名称',
  `logo_url` varchar(500) NOT NULL DEFAULT '' COMMENT 'LOGO',
  `sort_order` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='合作伙伴';

-- 11. 产品资料下载
DROP TABLE IF EXISTS `file_download`;
CREATE TABLE `file_download` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `product_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '关联产品',
  `file_name` varchar(200) NOT NULL DEFAULT '' COMMENT '文件名称',
  `file_url` varchar(500) NOT NULL DEFAULT '' COMMENT '文件地址',
  `sort_order` int(11) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='产品资料下载';

-- 12. 后台操作日志
DROP TABLE IF EXISTS `admin_log`;
CREATE TABLE `admin_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `admin_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '管理员ID',
  `admin_name` varchar(50) NOT NULL DEFAULT '' COMMENT '管理员账号',
  `action` varchar(500) NOT NULL DEFAULT '' COMMENT '操作行为',
  `ip` varchar(50) NOT NULL DEFAULT '' COMMENT 'IP地址',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_admin_id` (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='后台操作日志';

-- 13. 网站全局配置
DROP TABLE IF EXISTS `website_config`;
CREATE TABLE `website_config` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `site_name` varchar(200) NOT NULL DEFAULT '济南控创电子科技有限公司' COMMENT '站点名称',
  `icp_number` varchar(100) NOT NULL DEFAULT '' COMMENT 'ICP备案号',
  `police_number` varchar(100) NOT NULL DEFAULT '' COMMENT '公安备案号',
  `copyright` varchar(500) NOT NULL DEFAULT '' COMMENT '版权信息',
  `phone` varchar(50) NOT NULL DEFAULT '' COMMENT '咨询电话',
  `address` varchar(500) NOT NULL DEFAULT '' COMMENT '公司地址',
  `work_time` varchar(200) NOT NULL DEFAULT '' COMMENT '工作时间',
  `map_embed` text COMMENT '地图嵌入代码',
  `global_seo_title` varchar(200) NOT NULL DEFAULT '',
  `global_seo_keywords` varchar(500) NOT NULL DEFAULT '',
  `global_seo_description` varchar(500) NOT NULL DEFAULT '',
  `home_advantages` text COMMENT '首页优势JSON文本',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='网站全局配置';

-- 首页优势独立表（便于CMS管理）
DROP TABLE IF EXISTS `home_advantages`;
CREATE TABLE `home_advantages` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL DEFAULT '',
  `description` varchar(1000) NOT NULL DEFAULT '',
  `icon` varchar(100) NOT NULL DEFAULT '',
  `sort_order` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='首页核心优势';

SET FOREIGN_KEY_CHECKS = 1;

-- 默认管理员由服务启动时自动创建 (admin / Admin@123456)

INSERT INTO `website_config` (`site_name`, `icp_number`, `police_number`, `copyright`, `phone`, `address`, `work_time`,
  `global_seo_title`, `global_seo_keywords`, `global_seo_description`, `created_at`, `updated_at`) VALUES
('济南控创电子科技有限公司', '鲁ICP备XXXXXXXX号', '鲁公网安备XXXXXXXX号',
 'Copyright © 2026 济南控创电子科技有限公司 版权所有',
 '0531-88888888', '山东省济南市高新区工业南路88号控创科技园', '周一至周五 8:30-18:00',
 '济南工控机_山东工控机_研华工控机_智微智能工控机-济南控创电子',
 '济南工控机,山东工控机,研华工控机,智微智能工控机,工业电脑解决方案,工控设备定制',
 '济南控创电子科技有限公司是山东区域专业工控机、工业电脑解决方案服务商，研华工控机、智微智能工控机官方授权代理，提供工控设备定制与全周期售后服务。',
 NOW(), NOW());

INSERT INTO `about` (`intro`, `history`, `mission`, `philosophy`, `vision`, `created_at`, `updated_at`) VALUES
('济南控创电子科技有限公司深耕山东工控行业多年，是研华工控机、智微智能工控机官方核心授权代理商，同时拥有自主研发团队与完整生产车间，为山东企事业单位、工业工厂、智能制造项目提供全套工控解决方案。我们以「成就客户」为核心宗旨，配备专业业务团队与售后技术团队，实现售前定制、售中交付、售后极速维保的全流程服务。',
'2015年 公司成立，扎根济南工控市场\n2017年 获得研华工控机山东核心代理资质\n2019年 智微智能工控机官方授权，建成自有生产车间\n2021年 服务山东百家制造企业，案例覆盖自动化产线与智能制造\n2024年 全面升级山东本地化上门与售后响应体系',
'成就客户',
'以客户需求为导向，以品质交付为底线，以本地服务为优势，持续为客户创造可落地的工控价值。',
'成为山东区域最受信赖的工控机与工业电脑解决方案服务商。',
NOW(), NOW());

INSERT INTO `home_advantages` (`title`, `description`, `icon`, `sort_order`, `status`, `created_at`, `updated_at`) VALUES
('山东区域话语权', '深耕山东工控行业多年，本地市场具备极强服务能力，支持快速上门与售后运维响应。', 'region', 1, 1, NOW(), NOW()),
('双品牌官方代理', '研华工控机、智微智能工控机官方核心授权代理，正品货源、渠道稳定、全系可售可落地。', 'brand', 2, 1, NOW(), NOW()),
('自研生产线', '自主研发团队与完整生产车间，支持自研组装、老化测试、定制调试、整机出货。', 'factory', 3, 1, NOW(), NOW()),
('专业团队配置', '客户经理业务团队上门对接方案，专业技术售后团队全周期支持与落地调试。', 'team', 4, 1, NOW(), NOW()),
('成就客户服务', '以成就客户为宗旨，售前定制、售中严谨交付、售后极速维保，保障项目落地。', 'service', 5, 1, NOW(), NOW());

INSERT INTO `banners` (`title`, `subtitle`, `image_url`, `link_url`, `sort_order`, `status`, `created_at`, `updated_at`) VALUES
('济南工控机 · 山东工业电脑解决方案专家', '研华工控机 | 智微智能工控机官方授权代理 · 自研工控设备 · 成就客户', '/uploads/banner1.jpg', '/products', 1, 1, NOW(), NOW()),
('山东本地化服务 · 上门方案 · 极速售后', '深耕山东工控市场 · 专业团队 · 完整生产线 · 大量落地案例', '/uploads/banner2.jpg', '/contact', 2, 1, NOW(), NOW());

INSERT INTO `products` (`type`, `name`, `cover`, `summary`, `content`, `params`, `scenes`, `industry`, `seo_title`, `seo_keywords`, `seo_description`, `sort_order`, `status`, `created_at`, `updated_at`) VALUES
(1, '研华 UNO-2484G 嵌入式工控机', '/uploads/product-advantech-1.jpg',
 '研华官方授权，高性能嵌入式工控平台，适用于智能制造与边缘计算场景。',
 '<p>济南控创电子作为研华工控机山东核心代理商，提供 UNO-2484G 等全系研华工业电脑产品，支持本地化选型、调试与售后。</p>',
 '[{"name":"处理器","value":"Intel Core i5/i7"},{"name":"内存","value":"最高32GB"},{"name":"扩展","value":"丰富I/O"}]',
 '智能制造产线、机器视觉、边缘网关', '工业制造、能源、交通',
 '研华工控机 UNO-2484G-济南控创电子', '研华工控机,济南工控机,山东工控机', '研华工控机官方授权，济南控创电子提供选型与山东本地售后服务。', 1, 1, NOW(), NOW()),
(2, '智微智能 IPC-610 工业整机', '/uploads/product-jw-1.jpg',
 '智微智能官方授权工业电脑整机，稳定可靠，适合工厂自动化控制主机。',
 '<p>智微智能工控机山东授权代理，IPC-610 系列支持批量供货、定制配置与老化测试出货。</p>',
 '[{"name":"机箱","value":"4U工业机箱"},{"name":"主板","value":"工业级长寿命"},{"name":"电源","value":"冗余可选"}]',
 '工厂自动化、产线控制、数据采集', '汽车零部件、3C电子、装备制造',
 '智微智能工控机 IPC-610-济南控创', '智微智能工控机,山东工控机,工业电脑', '智微智能工控机官方代理，山东本地化技术支持。', 1, 1, NOW(), NOW()),
(3, '控创自研 KC-BOX 工业网关', '/uploads/product-kc-1.jpg',
 '自研生产线组装，支持协议转换与边缘采集，山东本地定制调试。',
 '<p>控创自研工控设备，自有车间批量组装、老化测试，支持项目定制与整机出货。</p>',
 '[{"name":"接口","value":"千兆网口/串口/IO"},{"name":"系统","value":"Linux/Windows可选"}]',
 '设备联网、数据采集、MES对接', '智能制造、市政、企事业单位',
 '工控设备定制 KC-BOX-济南控创电子', '工控设备定制,济南工控机,工业网关', '山东工控设备定制，自研生产，上门调试。', 1, 1, NOW(), NOW());

INSERT INTO `solutions` (`category`, `title`, `cover`, `summary`, `scene_desc`, `devices`, `pain_points`, `advantages`, `service`, `content`, `seo_title`, `seo_keywords`, `seo_description`, `sort_order`, `status`, `created_at`, `updated_at`) VALUES
('工业自动化解决方案', '汽车制造产线工控升级方案', '/uploads/solution-1.jpg',
 '为山东汽车零部件工厂提供产线控制主机、数据采集与视觉工控一体化方案。',
 '产线节拍提升、多工位协同控制、质量追溯数据采集。',
 '研华/智微智能工控机、自研网关、工业显示器', '老旧设备稳定性差、停机损失大、数据孤岛', '官方正品、本地备货、上门调试、7×24售后响应', '方案定制、安装调试、培训交付、维保续约',
 '<p>济南控创电子为山东工业制造客户提供从选型到落地的一站式工业自动化解决方案。</p>',
 '工业自动化解决方案-济南工控机', '工业自动化,山东工控机,工控解决方案', '山东工业自动化工控解决方案，成就客户项目落地。', 1, 1, NOW(), NOW()),
('山东本地化定制方案', '企事业单位信息化机房工控配套', '/uploads/solution-2.jpg',
 '面向山东市政及企事业单位，提供机房工控主机、监控网关定制与运维服务。',
 '机房环境监控、门禁联动、弱电集中管理。', '自研KC系列、研华嵌入式平台', '采购渠道杂、售后响应慢、定制需求难满足', '山东本地团队、快速上门、正品授权、定制生产线', '需求调研、方案设计、供货安装、长期维保',
 '<p>山东本地化定制方案，缩短沟通链路，保障项目按期交付。</p>',
 '山东本地化工控方案-济南控创', '山东工控机,工控设备定制,工业电脑解决方案', '山东企事业单位工控配套本地化服务。', 2, 1, NOW(), NOW());

INSERT INTO `cases` (`customer_name`, `project_scene`, `devices_used`, `result`, `cover`, `content`, `location`, `seo_title`, `seo_keywords`, `seo_description`, `sort_order`, `status`, `created_at`, `updated_at`) VALUES
('山东某汽车零部件制造企业', '冲压产线自动化控制与数据采集', '研华工控机 + 控创自研网关', '产线停机时间下降30%，数据实时上传MES，客户满意度显著提升。', '/uploads/case-1.jpg',
 '<p>济南控创电子为山东本地工厂提供上门方案对接、设备供货与调试，项目顺利投产。</p>', '山东济南', '山东工控机成功案例-汽车零部件', '山东工控机,成功案例,研华工控机', '山东工业工厂工控落地案例。', 1, 1, NOW(), NOW()),
('山东某智能制造科技园区', '园区能源监控与边缘计算节点部署', '智微智能工控机 + 自研KC-BOX', '实现园区多点位能耗采集与统一平台展示，运维效率提升40%。', '/uploads/case-2.jpg',
 '<p>依托山东本地化服务团队，快速完成多点位部署与售后培训。</p>', '山东青岛', '智能制造工控案例-济南控创', '智能制造,智微智能工控机,山东工控机', '智能制造项目工控落地案例。', 2, 1, NOW(), NOW());

INSERT INTO `news` (`category`, `title`, `cover`, `summary`, `content`, `publish_time`, `seo_title`, `seo_keywords`, `seo_description`, `sort_order`, `status`, `created_at`, `updated_at`) VALUES
(1, '济南控创电子荣获研华核心合作伙伴称号', '/uploads/news-1.jpg', '公司持续深耕山东工控市场，服务能力再获官方认可。', '<p>作为研华工控机山东授权代理商，济南控创电子始终以成就客户为宗旨，为客户提供正品货源与本地化服务。</p>', NOW(), '公司动态-研华合作伙伴', '济南工控机,研华工控机', '济南控创电子公司动态。', 1, 1, NOW(), NOW()),
(2, '2026年山东工控机市场趋势解读', '/uploads/news-2.jpg', '智能制造驱动工控需求增长，边缘计算与国产化方案受关注。', '<p>山东制造业数字化转型加速，工控机选型需兼顾稳定性、扩展性与本地服务能力。</p>', NOW(), '山东工控机市场趋势', '山东工控机,行业资讯', '山东工控行业资讯。', 1, 1, NOW(), NOW());

INSERT INTO `certificate` (`name`, `image_url`, `summary`, `cert_type`, `sort_order`, `status`, `created_at`, `updated_at`) VALUES
('研华工控机授权代理商证书', '/uploads/cert-advantech.jpg', '研华官方核心授权，正品渠道保障。', 1, 1, 1, NOW(), NOW()),
('智微智能官方授权证书', '/uploads/cert-jw.jpg', '智微智能工控机山东授权代理资质。', 1, 2, 1, NOW(), NOW()),
('高新技术企业证书', '/uploads/cert-hitech.jpg', '企业研发与创新能力认证。', 2, 3, 1, NOW(), NOW());

INSERT INTO `partner` (`name`, `logo_url`, `sort_order`, `status`, `created_at`, `updated_at`) VALUES
('山东某汽车制造集团', '/uploads/partner-1.png', 1, 1, NOW(), NOW()),
('山东某3C电子工厂', '/uploads/partner-2.png', 2, 1, NOW(), NOW()),
('山东某能源装备企业', '/uploads/partner-3.png', 3, 1, NOW(), NOW());

INSERT INTO `company_strength` (`section_key`, `title`, `content`, `image_url`, `sort_order`, `created_at`, `updated_at`) VALUES
('region', '山东区域行业地位', '深耕山东工控行业多年，服务覆盖济南、青岛、烟台、潍坊等全省重点工业城市，具备本地快速响应优势。', '/uploads/strength-region.jpg', 1, NOW(), NOW()),
('rd', '自研研发实力', '拥有专业研发团队，支持硬件定制、软件联调与整机方案设计，满足多样化项目需求。', '/uploads/strength-rd.jpg', 2, NOW(), NOW()),
('workshop', '生产车间实力', '完整生产线支持批量组装、老化测试、质检出货，保障交付品质与交期。', '/uploads/strength-workshop.jpg', 3, NOW(), NOW()),
('sales_team', '客户经理业务团队', '专业客户经理上门对接，提供选型、方案定制与项目全程跟进服务。', '/uploads/strength-sales.jpg', 4, NOW(), NOW()),
('after_sales', '专业售后团队', '技术售后团队提供安装调试、故障运维、升级扩容等全周期技术支持。', '/uploads/strength-service.jpg', 5, NOW(), NOW()),
('service_system', '全流程服务体系', '售前方案定制、售中严谨交付、售后极速维保，以成就客户为核心贯穿始终。', '/uploads/strength-system.jpg', 6, NOW(), NOW());
