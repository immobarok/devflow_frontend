import { useState } from "react"
import { Plus, MoreHorizontal, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Member {
  name: string
  email: string
  role: "Workspace Owner" | "Tech Lead" | "Product Designer" | "Backend Engineer" | "Frontend Engineer"
  status: "Active" | "Invited"
  avatar: string
}

const membersList: Member[] = [
  {
    name: "Brenda Vance",
    email: "brenda@milesto.com",
    role: "Workspace Owner",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
  },
  {
    name: "Michie Tan",
    email: "michie@milesto.com",
    role: "Tech Lead",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Sarah Jenkins",
    email: "sarah@milesto.com",
    role: "Product Designer",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Alex Rivera",
    email: "alex@milesto.com",
    role: "Backend Engineer",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "David Kim",
    email: "david@milesto.com",
    role: "Frontend Engineer",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
  },
]

export default function TeamMembersPage() {
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [invitedSuccess, setInvitedSuccess] = useState(false)

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteEmail.trim()) return
    setInvitedSuccess(true)
    setTimeout(() => {
      setInviteEmail("")
      setInvitedSuccess(false)
      setInviteModalOpen(false)
    }, 1500)
  }

  return (
    <div className="p-3 sm:p-4 lg:p-4.5 space-y-4 max-w-[1640px]">
      {/* Title & Invite Action */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-slate-900 dark:text-white">
            Team Members
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage your Milesto Team collaborators, roles, and workspace invitations.
          </p>
        </div>

        <Button
          onClick={() => setInviteModalOpen(true)}
          className="h-9 rounded-full bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 px-4 text-xs font-bold shadow-xs active:scale-95 transition-all w-fit"
        >
          <Plus className="mr-1.5 size-3.5" />
          Invite Member
        </Button>
      </div>

      {/* Invite Modal Dialog */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/80 bg-white/95 dark:border-white/10 dark:bg-slate-900/95 backdrop-blur-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Invite Team Member</h3>
              <button
                type="button"
                onClick={() => setInviteModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enter their email address to send a secure workspace invitation link.
            </p>

            {invitedSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-1">
                <CheckCircle2 className="size-6 text-emerald-500 mx-auto" />
                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Invitation sent successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleSendInvite} className="space-y-3.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="teammate@company.com"
                    className="h-10 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 px-3.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#EF4671]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setInviteModalOpen(false)}
                    className="h-9 rounded-full text-xs font-bold"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="h-9 rounded-full bg-[#EF4671] text-white hover:bg-[#e03460] text-xs font-bold"
                  >
                    Send Invitation
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Members List Cards */}
      <div className="rounded-3xl border border-white/80 bg-white/70 dark:border-white/10 dark:bg-[#141a29]/70 backdrop-blur-xl p-4 shadow-sm space-y-3">
        <div className="grid grid-cols-1 divide-y divide-slate-100 dark:divide-white/5">
          {membersList.map((member) => (
            <div key={member.email} className="flex items-center justify-between py-3.5 px-2 hover:bg-white/40 dark:hover:bg-white/5 rounded-2xl transition-colors">
              <div className="flex items-center gap-3">
                <Avatar className="size-10 ring-2 ring-white/80 dark:ring-slate-800 shadow-2xs">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="font-bold text-xs bg-slate-900 text-white">
                    {member.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    {member.name}
                    {member.role === "Workspace Owner" && (
                      <span className="rounded-full bg-[#f3e8ff] dark:bg-purple-950/70 text-[#9333ea] dark:text-purple-300 text-[10px] font-bold px-2 py-0.5">
                        Owner
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">{member.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 hidden sm:inline-block">
                  {member.role}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
                <button type="button" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  <MoreHorizontal className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
