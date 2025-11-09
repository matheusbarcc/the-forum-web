import { api } from "@/lib/axios"
import { Attachment } from "@/utils/attachments"

interface Question {
  questionId: string
  authorId: string
  author: string
  title: string
  content: string
  slug: {
    value: string
  }
  attachments: Attachment[]
  createdAt: Date
  updatedAt: Date
}
interface GetQuestionBySlugRequest {
  slug: string
}

export interface GetQuestionBySlugResponse {
  question: Question
}

export async function getQuestionBySlug({ slug }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse> {
  try {
    const response = await api.get(`/questions/${slug}`)

    return response.data
  } catch (error) {
    throw error
  }
}

