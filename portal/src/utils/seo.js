import { useHead } from '@vueuse/head';

const DEFAULT = {
  title: '济南工控机_山东工控机_研华工控机_智微智能工控机-济南控创电子',
  keywords: '济南工控机,山东工控机,研华工控机,智微智能工控机,工业电脑解决方案,工控设备定制',
  description: '济南控创电子科技有限公司是山东区域专业工控机、工业电脑解决方案服务商，研华工控机、智微智能工控机官方授权代理，提供工控设备定制与全周期售后服务。',
};

export function usePageSeo(meta = {}) {
  const title = meta.title || DEFAULT.title;
  const keywords = meta.keywords || DEFAULT.keywords;
  const description = meta.description || DEFAULT.description;
  useHead({
    title,
    meta: [
      { name: 'keywords', content: keywords },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
    ],
  });
}

export { DEFAULT };
