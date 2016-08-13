export const handleChat = (content: string): {} => {
  if (/^\*G\*System/.test(content)) {
    return {
      type: 'SYSTEM_MESSAGE',
      message: content.replace('*G*System:', ''),
    }
  }
  return {
    type: 'NO_ACTION',
  }
}
