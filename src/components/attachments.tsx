import { Paperclip, X } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Image from "next/image";
import { Attachment, LocalAttachment } from "@/utils/attachments";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface AttachmentsProps {
  attachments: LocalAttachment[] | Attachment[]
  onRemoveImage?: (url: string) => void
}

export default function Attachments({ attachments, onRemoveImage }: AttachmentsProps) {
  function getButtonName() {
    if (attachments.length > 0) {
      if (attachments.length > 1) return `${attachments.length} attachments`

      return "1 attachment"
    }
  }

  return (
    attachments.length > 0 ? (
      <Popover>
        <PopoverTrigger asChild>
          <Button type="button" variant="ghost" size="sm">
            <Paperclip />
            <p className="font-bold">
              {getButtonName()}
            </p>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit">
          <div className="flex items-center justify-center gap-6">
            {attachments.map(attachment => (
              <div key={attachment.url} className="relative">
                {onRemoveImage ? (
                  <Button onClick={() => onRemoveImage(attachment.url)} type="button" variant="secondary" size="icon-sm" className="absolute -top-2.5 -right-2.5 z-10 rounded-full">
                    <X size={3} />
                  </Button>
                ) : (
                  null
                )}
                <Dialog>
                  <DialogTrigger className="hover:cursor-pointer">
                    <div className="w-[70px] h-[70px] relative overflow-hidden rounded">
                      <Image
                        src={attachment.url}
                        alt=""
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-fit p-0" showCloseButton={false}>
                    <DialogTitle className="hidden">Image</DialogTitle>
                    <div className="relative overflow-hidden rounded">
                      <Image
                        src={attachment.url}
                        alt=""
                        width={500}
                        height={500}
                        className="object-cover max-w-[90vw] max-h-[90vh]"
                        unoptimized
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    ) : (
      null
    )
  )
}
