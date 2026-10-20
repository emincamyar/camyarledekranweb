'use client'

import { openQuoteModal, type QuoteModalPayload } from '@/lib/dataStore'

interface QuoteTriggerButtonProps {
  payload?: QuoteModalPayload
  className?: string
  children: React.ReactNode
  id?: string
}

export default function QuoteTriggerButton({
  payload,
  className = '',
  children,
  id,
}: QuoteTriggerButtonProps) {
  return (
    <button
      type="button"
      id={id}
      onClick={() => openQuoteModal(payload)}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </button>
  )
}
