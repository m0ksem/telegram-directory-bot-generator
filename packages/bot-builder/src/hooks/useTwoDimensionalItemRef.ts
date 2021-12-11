import { ref, onBeforeUpdate, onMounted } from "vue"

export const useTwoDimensionalItemRefs = <T>() => {
  let itemRefs = ref<Record<string | number, T[]>>({})

  const setItemRef = (index: number | string, i: any) => (el: any, k: any) => {
    console.log(index, el, i, k)
    if (el) {
      if (!itemRefs.value[index]) {
        itemRefs.value[index] = []
      }

      itemRefs.value[index].push(el)
    }
  }

  const clearRefs = (index?: number | string) => {
    if (index) {
      itemRefs.value[index] = []
    } else {
      itemRefs.value = {}
    }
  }

  onBeforeUpdate(() => { clearRefs() })

  onMounted(() => { clearRefs() })

  return {
    itemRefs,
    setItemRef,
    clearRefs
  }
}