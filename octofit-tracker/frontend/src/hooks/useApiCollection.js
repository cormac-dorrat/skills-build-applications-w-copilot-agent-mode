import { useEffect, useState } from 'react'

export default function useApiCollection(endpoint, loadCollection) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setLoading(true)
      setError('')

      try {
        setItems(await loadCollection(endpoint, controller.signal))
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setItems([])
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'Unable to load this collection.',
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadCollection()
    return () => controller.abort()
  }, [endpoint, loadCollection])

  return { items, loading, error }
}
