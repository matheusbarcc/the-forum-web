import { api } from "@/lib/axios"

interface QuestionSummary {
  id: string
  authorId: string
  title: string
  slug: string
  createdAt: Date
  updatedAt: Date
}
interface FetchRecentQuestionsRequest {
  pageIndex: number
}

interface FetchRecentQuestionsResponse {
  questions: QuestionSummary[]
}

export async function fetchRecentQuestions({ pageIndex }: FetchRecentQuestionsRequest): Promise<FetchRecentQuestionsResponse> {
  const response = await api.get(`/questions?page=${pageIndex}`)

  return response.data
}
