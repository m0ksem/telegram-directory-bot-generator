<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'

const doShowModal = ref(false)
const config = ref({})

const { copyToClipboard } = useCopyToClipboard()

const props = defineProps({
  createConfig: { type: Function, required: true }
})

watch(doShowModal, (newVal) => {
  if (newVal) { config.value = props.createConfig() }
})
</script>

<template>
  <div class="json-config-popup">
    <va-button @click="doShowModal = !doShowModal">
      <slot />
    </va-button>
    <va-modal v-model="doShowModal" cancel-text="">
      <template #header>
        <h2>Bot config</h2>
      </template>

      <pre class="code-snippet">{{ JSON.stringify(config, undefined, 2) }}
      </pre>

     <va-button @click="copyToClipboard(JSON.stringify(config, undefined, 2))">Copy</va-button>
    </va-modal>    
  </div>
</template>

<style lang="scss" scoped>
.code-snippet {
  height: 50vh;
  overflow-y: auto;
}
</style>