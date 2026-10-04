import useApiCollection from '../hooks/useApiCollection.js'

export default function ResourceList({
  title,
  description,
  endpoint,
  fetcher,
  columns,
}) {
  const { items, loading, error } = useApiCollection(endpoint, fetcher)

  return (
    <section className="resource-panel">
      <h1>{title}</h1>
      <p className="resource-description">{description}</p>

      {loading && (
        <p role="status" className="text-secondary">
          Loading {title.toLowerCase()}…
        </p>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          Could not load {title.toLowerCase()}: {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="alert alert-light border mb-0" role="status">
          No {title.toLowerCase()} to show yet.
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover resource-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th scope="col" key={column.label}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? item.id ?? index}>
                  {columns.map((column) => (
                    <td key={column.label}>{column.render(item)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
