'use client'

import { createQuestion } from "@/api/create-question";
import { uploadAttachment } from "@/api/upload-attachment";
import { LocalAttachment, getNewAttachments, triggerAttachmentsInput } from "@/utils/attachments";
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Paperclip } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import Attachments from "./attachments";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "./ui/input-group";
import { Separator } from "./ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const newQuestionSchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string()).default([])
})

type NewQuestion = z.infer<typeof newQuestionSchema>

interface NewQuestionInputProps {
  ref: React.Ref<HTMLDivElement>
}

export default function NewQuestionInput({ ref }: NewQuestionInputProps) {
  const [attachments, setLocalAttachments] = useState<LocalAttachment[]>([])
  const queryClient = useQueryClient()

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(newQuestionSchema)
  })

  const { mutateAsync: createQuestionFn, isPending: isPendingNewQuestion } = useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions', 1] })
    }
  })

  const { mutateAsync: uploadAttachmentFn, isPending: isPendingLocalAttachment } = useMutation({
    mutationFn: uploadAttachment,
  })

  async function handleNewQuestion(data: NewQuestion) {
    try {
      const attachmentsIds = attachments.map((attachment) => attachment.id!)
      await createQuestionFn({
        title: data.title,
        content: data.content,
        attachments: attachmentsIds,
      })

      reset()
      setLocalAttachments([])
    } catch (error) {
      toast.error("Something went wrong!", { description: "It was not possible to create the question." })

      console.log(error)
    }
  }

  async function handleNewFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const newFiles = getNewAttachments(e)
    setLocalAttachments((state) => ([...state, ...newFiles]))

    for (const attachment of newFiles) {
      try {
        const { attachmentId } = await uploadAttachmentFn({ file: attachment.file })

        setLocalAttachments(state => state.map(stateLocalAttachment =>
          stateLocalAttachment.url === attachment.url
            ? { ...stateLocalAttachment, id: attachmentId }
            : stateLocalAttachment
        ))

      } catch (error) {
        toast.error("Something went wrong!", { description: `It was not possible to add the file "${attachment.file.name}".` })

        setLocalAttachments(state =>
          state.filter(stateLocalAttachment => stateLocalAttachment.url !== attachment.url)
        )

        console.log(error)
      }
    }
  }

  function handleRemoveFile(url: string) {
    setLocalAttachments((state) =>
      state.filter(attachment => attachment.url !== url)
    )
  }


  // TODO: fix ref to use inside title input so when clicking floating button it focus on the input
  return (
    <form onSubmit={handleSubmit(handleNewQuestion)}>
      <InputGroup>
        <div className="w-full">
          <InputGroupTextarea placeholder="Title" className="min-h-6" {...register("title")} />
          <Separator />
          <InputGroupTextarea placeholder="Description" {...register("content")} />
        </div>
        <InputGroupAddon align="block-end">
          <Attachments attachments={attachments} onRemoveImage={handleRemoveFile} />

          <Tooltip>
            <TooltipTrigger asChild>
              <span className="ml-auto">
                <InputGroupButton
                  type="button"
                  variant="outline"
                  className="rounded-full"
                  size="icon-sm"
                  onClick={() => triggerAttachmentsInput("question-attachments-input")}
                  disabled={attachments.length === 5}
                >
                  <Paperclip />
                </InputGroupButton>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              {attachments.length === 5 ? (
                <p>5 attachments limit reached</p>
              ) : (
                <p>Add attachment</p>
              )}
            </TooltipContent>
          </Tooltip>

          <input
            type="file"
            multiple
            id="question-attachments-input"
            className="hidden"
            onChange={(e) => handleNewFiles(e)}
          />

          <InputGroupButton
            type="submit"
            variant="default"
            size="sm"
            className="rounded-sm"
            disabled={isPendingNewQuestion || isPendingLocalAttachment}
          >
            Post
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form >
  )
}
