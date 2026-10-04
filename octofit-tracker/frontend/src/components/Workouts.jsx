import ResourceList from './ResourceList.jsx'

const columns = [
  {
    label: 'Workout',
    render: (workout) => workout.name ?? workout.title ?? 'Workout',
  },
  {
    label: 'Type',
    render: (workout) => workout.type ?? workout.category ?? '—',
  },
  {
    label: 'Duration',
    render: (workout) => {
      const duration = workout.durationMinutes ?? workout.duration
      return duration != null ? `${duration} min` : '—'
    },
  },
  {
    label: 'Description',
    render: (workout) => workout.description ?? '—',
  },
]

export default function Workouts() {
  return (
    <ResourceList
      title="Workouts"
      description="Browse workout ideas to support your training."
      endpoint="/api/workouts/"
      columns={columns}
    />
  )
}
