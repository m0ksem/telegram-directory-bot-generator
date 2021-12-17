

export const createSessions = <T>(defaultValue: T) => {
  const sessions: { [key: string]: T } = {}

  return {
    clean: () => {
      Object.keys(sessions).forEach((key) => {
        sessions[key] = defaultValue
      })
    },
    sessions: new Proxy(sessions, {
      get(target, name: string) {
        return sessions[name] || defaultValue
      }
    })
  }
}