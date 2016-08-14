export const handleChat = (content: string): {} => {
  if (/^\*G\*System/.test(content)) {
    return {
      type: 'SYSTEM_MESSAGE',
      isAfk: /\$AFK/.test(content),
    }
  }
  return {
    type: 'NO_ACTION',
  }
}
