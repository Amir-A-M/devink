import type { FC, SubmitEvent } from 'react'

import React from 'react'

import { Button } from '@/libs/design/Button'
import ButtonPrimary from '@/libs/design/ButtonPrimary'
import Textarea from '@/libs/design/Textarea'

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
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
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
