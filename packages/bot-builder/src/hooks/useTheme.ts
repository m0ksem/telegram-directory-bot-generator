import { useColors } from 'vuestic-ui'
import { ref } from 'vue'

export const useTheme = () => {
  const { setColors } = useColors()

  const isDark = ref(false)

  const toDark = () => {
    isDark.value = true
    setColors({
      primary: '#3e4df7',
      secondary: '#474554',
      background: '#0c121c',
      success: '#60a315',
      info: '#827ef3',
      danger: '#f00a67',
      warning: '#febf6d',
      gray: '#aeaeb1',
      dark: '#ffffff',
      white: '#020000',
      cardColor: '#060609',
    })
  }

  const toWhite = () => {
    isDark.value = false
    setColors({
      primary: '#2C82E0',
      secondary: '#cbe4f0',
      background: '#f4f8fa',
      success: '#40e583',
      info: '#2c82e0',
      danger: '#DE1041',
      warning: '#FFAC0A',
      gray: '#babfc2',
      dark: '#0a1622',
      white: '#ffffff',
      cardColor: '#fcfdff',
    })
  }

  const toggle = () => isDark.value ? toWhite() : toDark()

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    toDark()
  } else {
    toWhite()
  }

  return {
    isDark,
    toggle,
    toDark,
    toWhite,
  }
}