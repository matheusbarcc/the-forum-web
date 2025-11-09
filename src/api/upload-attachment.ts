import { api } from "@/lib/axios"

interface UploadAttachmentRequest {
  file: File
}

interface UploadAttachmentResponse {
  attachmentId: string
}

export async function uploadAttachment({ file }: UploadAttachmentRequest): Promise<UploadAttachmentResponse> {
  try {
    const formData = new FormData()

    formData.append("file", file)

    const response = await api.post('/attachments', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })

    return response.data
  } catch (error) {
    throw error
  }
}
