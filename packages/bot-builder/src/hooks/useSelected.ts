import { ref, UnwrapRef } from 'vue'

export const useSelected = <T>() => {
  const selected = ref<T | null>(null)

  const set = (item: UnwrapRef<T>) => { selected.value = item }
  const unset = () => { selected.value = null }

  return {
    selected, set, unset
  }
}