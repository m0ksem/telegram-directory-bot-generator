

export const createSessions = <T>(defaultValue: any = {}) => {
  const sessions: { [key: string]: T } = {

  }

  return new Proxy(sessions, {
    get(target, name: string) {
      return sessions[name] || defaultValue
    }
  })
}