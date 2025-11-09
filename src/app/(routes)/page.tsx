'use client'

import FloatingNewQuestionButton from "@/components/floating-new-question-button";
import NewQuestionInput from "@/components/new-question-input";
import { Pagination } from "@/components/pagination";
import { Questions } from "@/components/questions";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useRef } from 'react';
import z from "zod";

export default function Home() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page)
    .parse(searchParams.get('page') ?? '1')

  const newQuestionInputRef = useRef<HTMLDivElement>(null)

  function handlePaginate(pageIndex: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', (pageIndex).toString())

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col justify-center gap-4 py-8 min-w-xl max-w-xl relative">
        <NewQuestionInput ref={newQuestionInputRef} />
        <FloatingNewQuestionButton newQuestionInputRef={newQuestionInputRef} />
        <Pagination pageIndex={pageIndex} handlePaginate={handlePaginate} />
        <Questions pageIndex={pageIndex} />
        <Pagination pageIndex={pageIndex} handlePaginate={handlePaginate} />
      </div>
    </div>
  )
}
