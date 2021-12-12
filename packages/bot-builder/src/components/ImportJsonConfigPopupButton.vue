<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits(['update:config'])

const doShowModal = ref(false)
const config = ref('')

watch(config, () => {
  emit('update:config', JSON.parse(config.value))
})
</script>

<template>
  <div class="json-config-popup">
    <va-button @click="doShowModal = !doShowModal">
      <slot />
    </va-button>
    <va-modal v-model="doShowModal" cancel-text="" max-width="90%">
      <template #header>
        <h2>Bot config</h2>
      </template>
      <div class="json-config-popup__modal">
        <pre class="code-snippet"><va-input height="90vh" type="textarea" v-model="config" /></pre>        
      </div>

    </va-modal>    
  </div>
</template>

<style lang="scss">
.json-config-popup {

}

.va-modal__container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > * {
    width: 100%;
    height: 100%;
  }
  .va-modal__inner, .va-modal__message {
    height: 100%;
  }

  .va-input, .va-input-wrapper__content, .va-input__container, .va-input__container * {
    height: 100% !important;
  }
}

.json-config-popup__modal {
  height: 100%;

  .code-snippet {
    padding: 0 !important;
    height: 100%;
  }

  .va-modal__inner {
    height: 100%;
    width: 100%;
  }
}
</style>