export const useCopyToClipboard = () => {
  const copyToClipboard = async (text: string) => {
    try {
      await window.navigator.clipboard.writeText(text)
    } catch (e: any) {
      if (e.message === 'NotAllowedError') {
        alert("No permissions for copy to clipboard")
      }
    }
  }

  return { 
    copyToClipboard
  }
}