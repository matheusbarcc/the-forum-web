'use client'

import QuestionDetailsCard from "@/components/question-details-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QuestionDetails() {
  const router = useRouter()

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col justify-center gap-8 py-8 relative">
        <Button onClick={() => router.back()} variant="ghost" className="absolute w-fit -left-40 top-7 -translate-x-full">
          <ArrowLeft />
          Go back
        </Button>

        <QuestionDetailsCard />

        <Card className="bg-background">
          <CardContent>
            test
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
