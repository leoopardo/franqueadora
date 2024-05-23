import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/users/logs/')({
  component: () => <div>Hello /_auth/users/logs/!</div>
})