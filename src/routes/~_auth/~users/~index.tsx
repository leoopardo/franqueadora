import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/users/')({
  component: () => <div>Hello /_auth/users/!</div>
})