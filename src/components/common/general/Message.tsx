import { CircleAlert } from 'lucide-react'
import React from 'react'

export interface MessageProps {
  type?: 'error' | 'info' | 'success' | 'warning'
  children: React.ReactNode
}
const Message: React.FC<MessageProps> = ({ children = 'This is a SUCCESS message', type = 'success' }) => {
  let color = ''
  switch (type) {
    case 'success':
      color += ' text-status-success bg-status-successBg'
      break
    case 'error':
      color += ' text-status-error bg-status-errorBg'
      break
    case 'warning':
      color += ' text-status-warning bg-status-warningBg'
      break
    case 'info':
      color += ' text-status-info bg-status-infoBg'
      break
    default:
      break
  }
  return (
    <div className={`${color} text-paragraph-small flex px-4 py-2`}>
      <CircleAlert className="me-2 size-5 shrink-0" aria-hidden="true" />
      {children}
    </div>
  )
}

export default Message
