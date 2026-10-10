import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Logo } from "../logo/logo"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-4 pb-2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-0">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-2">
          <Logo className="h-10 w-10"/>
            <span className="text-xl font-black tracking-tight">DEVFLOW</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/#features"
              className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Pricing
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Dashboard
            </Link>
            <Link
              to="/blog"
              className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Blog
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/login" className="text-sm font-bold hover:text-primary transition-colors hidden sm:block">
            Sign In
          </Link>
          <Button asChild className="bg-[#4F46E5] hover:bg-[#4338ca] text-white rounded-lg px-6 font-semibold shadow-sm">
            <Link to="/register">Start Free</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
