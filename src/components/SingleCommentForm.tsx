import { Button } from '@/shared/Button'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Textarea from '@/shared/Textarea'
import React, { type FC, type FormEvent } from 'react'

interface Props extends React.HTMLAttributes<HTMLTextAreaElement> {
  className?: string
  onClickSubmit?: () => void
  onClickCancel?: () => void
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>
  defaultValue?: string
  rows?: number
}

const SingleCommentForm: FC<Props> = ({
  className = 'mt-5',
  onClickSubmit,
  onClickCancel,
  textareaRef,
  defaultValue = '',
  rows = 4,
  ...props
}) => {
  // No backend: swallow the native submit that would reload the page and drop
  // the comment, and let the parent decide what to show instead.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onClickSubmit?.()
  }

  return (
    <form className={`single-comment-form ${className}`} onSubmit={handleSubmit}>
      <Textarea
        placeholder="Add to discussion"
        aria-label="Add to discussion"
        name="comment"
        ref={textareaRef}
        required={true}
        defaultValue={defaultValue}
        rows={rows}
        {...props}
      />
      <div className="mt-3 flex gap-3">
        <Button plain type="button" onClick={onClickCancel}>
          Cancel
        </Button>
        <ButtonPrimary type="submit">Submit</ButtonPrimary>
      </div>
    </form>
  )
}

export default SingleCommentForm
