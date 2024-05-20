import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div >
      <h3>{window.location.host.split('.')[0]}</h3>
    </div>
  )
}
