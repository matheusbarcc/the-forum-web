import { useState, useEffect } from "react";
import { Button } from "./ui/button";

interface FloatingNewQuestionButtonProps {
  newQuestionInputRef: React.RefObject<HTMLDivElement | null>;
}

export default function FloatingNewQuestionButton({ newQuestionInputRef }: FloatingNewQuestionButtonProps) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleScrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    newQuestionInputRef.current?.focus()
  }
  return (
    show && (
      <Button onClick={handleScrollToTop} className="fixed top-3 left-1/2 -translate-x-1/2 max-w-fit">
        New post
      </Button>
    )
  )
}
