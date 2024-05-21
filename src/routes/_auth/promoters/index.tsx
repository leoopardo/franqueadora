import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/promoters/')({
  component: () => <div>Hello /_auth/promoters/!</div>
})