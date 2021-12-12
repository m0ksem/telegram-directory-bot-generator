export const useHash = () => {
  const random = () => Math.random() + new Date().valueOf()

  const generateHash = () => {
    return (random() + 1).toString(36).substring(7)
  }

  return { generateHash }
}