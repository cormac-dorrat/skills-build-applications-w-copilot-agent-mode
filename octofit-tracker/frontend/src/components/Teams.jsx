import ResourceList from './ResourceList.jsx'

const columns = [
  {
    label: 'Team',
    render: (team) => team.name ?? 'Team',
  },
  {
    label: 'Members',
    render: (team) =>
      Array.isArray(team.members)
        ? team.members.length
        : team.memberCount ?? '—',
  },
  {
    label: 'Description',
    render: (team) => team.description ?? '—',
  },
]

export default function Teams() {
  return (
    <ResourceList
      title="Teams"
      description="Find a team and take on your next fitness goal together."
      endpoint="/api/teams/"
      columns={columns}
    />
  )
}
