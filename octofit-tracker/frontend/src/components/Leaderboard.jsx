import ResourceList from './ResourceList.jsx'
import { fetchCollection as fetch } from '../lib/api.js'

function athleteName(user) {
  if (typeof user === 'string') {
    return user
  }

  return user?.displayName ?? user?.username ?? '—'
}

function teamName(team) {
  if (typeof team === 'string') {
    return team
  }

  return team?.name ?? '—'
}

const columns = [
  {
    label: 'Rank',
    render: (entry) => entry.rank ?? '—',
  },
  {
    label: 'Athlete',
    render: (entry) => athleteName(entry.user),
  },
  {
    label: 'Team',
    render: (entry) => teamName(entry.team),
  },
  {
    label: 'Points',
    render: (entry) => entry.points ?? entry.score ?? '—',
  },
]

export default function Leaderboard() {
  return (
    <ResourceList
      title="Leaderboard"
      description="See how athletes and teams are progressing."
      endpoint="/api/leaderboard/"
      fetcher={fetch}
      columns={columns}
    />
  )
}
