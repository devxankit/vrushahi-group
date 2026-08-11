import { useEffect, useState } from 'react'
import { getHealth } from '@/services/healthService'

export default function Home() {
  const [status, setStatus] = useState('checking...')

  useEffect(() => {
    getHealth()
      .then((data) => setStatus(data?.status ?? 'unknown'))
      .catch(() => setStatus('unreachable'))
  }, [])

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Frontend is wired up 🎉</h1>
      <p className="text-gray-600">
        React + Vite + Tailwind CSS on the frontend, Express on the backend.
      </p>
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-500">Backend health check:</p>
        <p className="mt-1 font-mono text-sm">{status}</p>
      </div>
    </section>
  )
}
