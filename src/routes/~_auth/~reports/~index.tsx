import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/reports/')({
  component: () => <div>Hello /_auth/reports/!</div>
})