import { api } from "@/lib/axios"

interface CreateQuestionRequest {
  title: string,
  content: string,
  attachments: string[],
}

export async function createQuestion({ title, content, attachments }: CreateQuestionRequest) {
  try {
    await api.post('/questions', {
      title,
      content,
      attachments,
    })
  } catch (error) {
    throw error
  }
}
