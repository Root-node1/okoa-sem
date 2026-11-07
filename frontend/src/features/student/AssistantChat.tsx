'use client'

import { useState, type FormEvent } from 'react'
import { Icon } from '@/components/ui/Icon'
interface Message {
  id: number
  role: 'assistant' | 'user'
  text: string
  citation?: string
}

const suggestions = ['What is due this week?', 'When is my next CAT?', 'Show recent course changes']

export function AssistantChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  function ask(question: string) {
    const text = question.trim()
    if (!text) return
    const next = messages.length + 1
    setMessages((current) => [
      ...current,
      { id: next, role: 'user', text },
      {
        id: next + 1,
        role: 'assistant',
        text: text.toLowerCase().includes('cat')
          ? 'Your next confirmed CAT is ICS 2207 on Monday, November 9 at 10:00 AM in LT 2.'
          : text.toLowerCase().includes('change')
            ? 'The latest confirmed update is that your ICS 2207 CAT 2 time is Monday at 10:00 AM. Your ICS 2211 project checkpoint is due Wednesday.'
            : 'You have three upcoming items: your ICS 2211 project checkpoint on Wednesday, the ICS 2203 design critique on Thursday, and the MAT 2201 problem set on Friday.',
        citation: 'Verified course information · ICS 2207 and ICS 2211',
      },
    ])
    setInput('')
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    ask(input)
  }

  return <section className="assistant-layout">
    <div className="assistant-main content-panel">
      <div className="assistant-top"><span className="assistant-avatar"><Icon name="spark" /></span><div><strong>Okoa academic assistant</strong><span><i /> Answers grounded in verified course info</span></div><span className="assistant-scope">YOUR COURSES</span></div>
      <div aria-live="polite" className="chat-messages">
        {!messages.length ? <div className="assistant-welcome"><span className="welcome-spark"><Icon name="spark" /></span><span className="eyebrow">A BETTER WAY TO GET UNSTUCK</span><h2>What would you like<br />to figure out?</h2><p>Ask about your deadlines, course changes, or what&apos;s next. I&apos;ll point you to the source.</p><div className="suggestion-list">{suggestions.map((suggestion) => <button key={suggestion} onClick={() => ask(suggestion)}>{suggestion}<Icon name="arrow" /></button>)}</div></div> : <div className="message-list">{messages.map((message) => <article className={`chat-message ${message.role}`} key={message.id}><span className="chat-avatar">{message.role === 'assistant' ? <Icon name="spark" /> : 'AM'}</span><div><p>{message.text}</p>{message.citation && <span className="chat-citation"><Icon name="check" />{message.citation}</span>}</div></article>)}</div>}
      </div>
      <form className="chat-input-form" onSubmit={onSubmit}><label className="sr-only" htmlFor="assistant-question">Ask about your courses</label><input id="assistant-question" onChange={(event) => setInput(event.target.value)} placeholder="Ask about your academic week..." value={input} /><button aria-label="Send question" className="send-button" disabled={!input.trim()} type="submit"><Icon name="arrow" /></button></form>
      <p className="assistant-disclaimer">Answers should be checked against their cited source. Pending claims are not treated as confirmed facts.</p>
    </div>
    <aside className="assistant-side content-panel"><span className="eyebrow">A QUICK REMINDER</span><h3>Only confirmed info, please.</h3><p>Okoa uses verified course records first. New or unverified messages are clearly labelled and won&apos;t be presented as confirmed dates.</p><div className="assistant-cited"><Icon name="check" /><span>Every answer links back to a source</span></div><div className="assistant-cited"><Icon name="book" /><span>Scoped to your enrolled courses</span></div></aside>
  </section>
}
