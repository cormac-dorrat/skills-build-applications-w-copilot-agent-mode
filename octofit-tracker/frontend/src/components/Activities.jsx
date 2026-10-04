import ResourceList from './ResourceList.jsx'
import { fetchCollection as fetch } from '../lib/api.js'

function athleteName(user) {
  if (typeof user === 'string') {
    return user
  }

  return user?.displayName ?? user?.username ?? '—'
}

const columns = [
  {
    label: 'Activity',
    render: (activity) =>
      activity.activityType ?? activity.type ?? activity.name ?? 'Activity',
  },
  {
    label: 'Athlete',
    render: (activity) => athleteName(activity.user),
  },
  {
    label: 'Date',
    render: (activity) => {
      const date = activity.completedAt ?? activity.date ?? activity.createdAt
      if (!date) {
        return '—'
      }

      const parsedDate = new Date(date)
      return Number.isNaN(parsedDate.valueOf())
        ? '—'
        : parsedDate.toLocaleDateString()
    },
  },
  {
    label: 'Duration',
    render: (activity) => {
      const duration = activity.durationMinutes ?? activity.duration
      return duration != null ? `${duration} min` : '—'
    },
  },
  {
    label: 'Calories',
    render: (activity) =>
      activity.caloriesBurned ?? activity.calories ?? '—',
  },
]

export default function Activities() {
  return (
    <ResourceList
      title="Activities"
      description="Recent workouts and movement logged by the community."
      endpoint="/api/activities/"
      fetcher={fetch}
      columns={columns}
    />
  )
}
