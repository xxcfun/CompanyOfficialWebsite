import { ref, provide, inject } from 'vue';
import { getConfig } from '@/api';

const KEY = Symbol('siteConfig');

export function provideSiteConfig() {
  const config = ref(null);
  const phone = ref('0531-88888888');
  getConfig().then((data) => {
    config.value = data;
    if (data?.phone) phone.value = data.phone;
  }).catch(() => {});
  provide(KEY, { config, phone });
  return { config, phone };
}

export function useSiteConfig() {
  return inject(KEY, { config: ref(null), phone: ref('0531-88888888') });
}
