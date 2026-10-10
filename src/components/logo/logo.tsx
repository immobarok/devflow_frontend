import logo from "@/assets/images/logo.svg"
export function Logo({ className }: { className?: string }) {
  return (
    <img src={logo} className={className} alt="logo" />
  )
}