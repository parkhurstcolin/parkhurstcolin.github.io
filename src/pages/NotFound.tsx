import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main>
      <h1>404 — Not found</h1>
      <p>That page doesn’t exist.</p>
      <Link to="/">Go home</Link>
    </main>
  )
}
