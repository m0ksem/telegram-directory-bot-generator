import { computed } from 'vue'

export const useSyncProp = <T extends Record<string, any>, N extends string>(props: T, propName: N, emit: (event: `update:${N}`, ...args: string[]) => any) => {
  return [
    computed<T[N]>({
      get() { return props[propName] },
      set(val) { emit(`update:${propName}`, val) }
    })
  ]
}