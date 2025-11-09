import { getQuestionBySlug } from "@/api/get-question-by-slug";
import { useQuery } from "@tanstack/react-query";
import { formatDistance } from "date-fns";
import { useParams } from "next/navigation";
import Attachments from "./attachments";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";

export default function QuestionDetailsCard() {
  const params = useParams()
  const slug = params.slug as string

  const { data, isLoading } = useQuery({
    queryKey: ['question', slug],
    queryFn: () => getQuestionBySlug({ slug })
  })

  const question = data?.question

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!question) {
    return <div>Error: Question not found</div>
  }

  return (
    <div className="flex flex-col gap-4 w-xl relative">
      <div className="flex items-start relative">
        <p className="absolute right-full mr-4 w-40 text-right break-words">
          {question.author}
        </p>
        <Card className="rounded-md p-6 w-full">
          <CardTitle>{question.title}</CardTitle>
          <CardContent className="p-0 text-justify">
            {question.content}
          </CardContent>
          <CardFooter className="flex justify-between px-0 text-sm text-muted-foreground">
            <Attachments attachments={question.attachments} />
            <span>
              {formatDistance(question.createdAt, new Date(), { addSuffix: true })}
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
