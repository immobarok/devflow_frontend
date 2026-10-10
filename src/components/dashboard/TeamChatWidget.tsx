import { useState } from "react"
import { Headphones, ChevronDown, Bell, MoreHorizontal, Paperclip, Smile, Send } from "lucide-react"

export function TeamChatWidget() {
  const [chatInput, setChatInput] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Michie",
      text: "Morning Team 👋",
      time: "07:00",
      isMine: false,
    },
    {
      id: 2,
      sender: "Michie",
      text: "Today we will have a scrum meeting at 10 am.",
      time: "07:01",
      isMine: false,
    },
    {
      id: 3,
      sender: "Brenda",
      text: "Okay Michie 👍",
      time: "07:03",
      isMine: true,
    },
  ])

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!chatInput.trim()) return

    const now = new Date()
    const hours = now.getHours().toString().padStart(2, "0")
    const mins = now.getMinutes().toString().padStart(2, "0")

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "Brenda",
        text: chatInput.trim(),
        time: `${hours}:${mins}`,
        isMine: true,
      },
    ])
    setChatInput("")
  }

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-white/80 bg-white/70 dark:border-white/10 dark:bg-[#141a29]/70 backdrop-blur-xl p-4.5 shadow-sm shadow-slate-900/[0.03] dark:shadow-none min-h-[320px] transition-all hover:bg-white/85 dark:hover:bg-[#192133]/80 hover:border-white dark:hover:border-white/20 hover:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
        <div className="flex items-center gap-1.5 text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
          <Headphones className="size-4.5 text-slate-700 dark:text-slate-300" />
          <span>Design Team Chat</span>
          <ChevronDown className="size-3.5 text-slate-400" />
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <button type="button" className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <Bell className="size-4" />
          </button>
          <button type="button" className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <MoreHorizontal className="size-4.5" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="my-2.5 flex-1 space-y-2.5 overflow-y-auto pr-1 max-h-[175px] no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.isMine ? "items-end" : "items-start"}`}
          >
            {!msg.isMine && (
              <span className="mb-0.5 text-[11px] font-semibold text-[#EF4671]">
                {msg.sender}
              </span>
            )}
            <div className={`flex items-end gap-1.5 ${msg.isMine ? "flex-row-reverse" : "flex-row"}`}>
              <div
                className={`rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                  msg.isMine
                    ? "rounded-tr-xs border border-slate-200/80 bg-white font-normal text-slate-800 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 shadow-2xs"
                    : "rounded-tl-xs bg-slate-100 dark:bg-slate-800 font-normal text-slate-800 dark:text-slate-200"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] font-normal text-slate-400 dark:text-slate-500 pb-0.5">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 rounded-full border border-white/90 bg-white/70 dark:border-white/10 dark:bg-slate-900/80 backdrop-blur-md px-3 py-1.5 focus-within:border-[#EF4671] focus-within:bg-white dark:focus-within:bg-slate-900 transition-all shadow-2xs"
      >
        <button
          type="button"
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <Paperclip className="size-4" />
        </button>
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Message Here..."
          className="flex-1 bg-transparent text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
        />
        <button
          type="button"
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <Smile className="size-4" />
        </button>
        <button
          type="submit"
          className="flex size-7 items-center justify-center rounded-full bg-slate-950 text-white hover:bg-[#EF4671] dark:bg-white dark:text-slate-950 dark:hover:bg-[#EF4671] dark:hover:text-white transition-colors shadow-2xs"
        >
          <Send className="size-3" />
        </button>
      </form>
    </div>
  )
}
