export interface LocalAttachment {
  id?: string,
  url: string
  file: File,
}

export interface Attachment {
  id: string,
  title: string,
  url: string
}

export function triggerAttachmentsInput(inputId: string) {
  document.getElementById(inputId)?.click()
}

export function getNewAttachments(e: React.ChangeEvent<HTMLInputElement>) {
  const files = e.target.files

  if (files && files.length > 0) {
    const filesWithURL: LocalAttachment[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i)

      if (file) {
        filesWithURL.push({
          file,
          url: URL.createObjectURL(file)
        })
      }
    }

    return filesWithURL
  }

  return []
}
