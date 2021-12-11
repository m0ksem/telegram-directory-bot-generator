import { useColors } from 'vuestic-ui'
import { ref } from 'vue'

export const useTheme = () => {
  const { setColors } = useColors()

  const isDark = ref(false)

  const toDark = () => {
    isDark.value = true
    setColors({
      primary: '#290bff',
      secondary: '#6863f8',
      background: '#0b0f12',
      success: '#00a35f',
      info: '#827ef3',
      danger: '#ef1e00',
      warning: '#e1cb00',
      gray: '#aeaeb1',
      dark: '#ffffff',
      white: '#020000',
    })
  }

  const toWhite = () => {
    isDark.value = false
    setColors({
      primary: '#2C82E0',
      secondary: '#767C88',
      background: '#f4f8fa',
      success: '#40e583',
      info: '#2c82e0',
      danger: '#DE1041',
      warning: '#FFAC0A',
      gray: '#babfc2',
      dark: '#1B1A1F',
      white: '#ffffff',
    })
  }

  const toggle = () => isDark.value ? toWhite() : toDark()

  toWhite()

  return {
    isDark,
    toggle,
    toDark,
    toWhite,
  }
}