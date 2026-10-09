import { Link, useRouteError, isRouteErrorResponse } from "react-router"
import { Button } from "@/components/ui/button"

export default function ErrorBoundary() {
  const error = useRouteError()

  let title = "Something went wrong"
  let message = "An unexpected error occurred. Please try again."

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`
    message = error.data?.message || message
  } else if (error instanceof Error) {
    message = error.message
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="max-w-md text-muted-foreground">{message}</p>
      <Button asChild>
        <Link to="/">Go Home</Link>
      </Button>
    </div>
  )
}
