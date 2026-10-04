import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../lib/api.js'

function getCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  for (const key of ['results', 'data', 'items']) {
    if (Array.isArray(payload?.[key])) {
      return payload[key]
    }
  }

  throw new Error('The API response did not contain a collection.')
}

export default function useApiCollection(endpoint) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}.`)
        }

        setItems(getCollection(await response.json()))
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
  }, [endpoint])

  return { items, loading, error }
}
