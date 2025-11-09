'use client'

import { fetchRecentQuestions } from "@/api/fetch-recent-questions"
import { useQuery } from "@tanstack/react-query"
import { formatDistance } from "date-fns"
import { Card, CardFooter, CardTitle } from "./ui/card"
import { useRouter } from "next/navigation"

interface QuestionsProps {
  pageIndex: number
}
export function Questions({ pageIndex }: QuestionsProps) {
  const router = useRouter()

  const { data, isLoading } = useQuery({
    queryKey: ['questions', pageIndex],
    queryFn: () => {
      return fetchRecentQuestions({ pageIndex })
    }
  })

  if (isLoading) {
    return (
      <div>loading...</div>
    )
  }

  return (
    data && data.questions.map((question) => (
      <Card
        onClick={() => router.push(`/question/${question.slug}`)}
        key={question.id}
        className="rounded-md p-6 hover:cursor-pointer hover:bg-background transition-all"
      >
        <CardTitle>
          {question.title}
        </CardTitle>
        <CardFooter className="ml-auto px-0 text-sm text-muted-foreground">
          {formatDistance(question.createdAt, new Date(), { addSuffix: true })}
        </CardFooter>
      </Card>
    ))
  )
}
