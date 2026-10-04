import ResourceList from './ResourceList.jsx'

const columns = [
  {
    label: 'Name',
    render: (user) => user.displayName ?? user.username ?? 'Member',
  },
  {
    label: 'Username',
    render: (user) => user.username ?? '—',
  },
  {
    label: 'Email',
    render: (user) => user.email ?? '—',
  },
]

export default function Users() {
  return (
    <ResourceList
      title="Users"
      description="Meet the members of the Octofit community."
      endpoint="/api/users/"
      columns={columns}
    />
  )
}
