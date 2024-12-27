declare module 'vue' {
  export interface GlobalComponents {
    Icon: typeof import('@/components/Icon')['Icon']
    DictTag: typeof import('@/components/DictTag')['DictTag']
    DictSpanTag: typeof import('./../components/DictSpanTag/src/DictSpanTag.vue')['default']
  }
}

export {}
