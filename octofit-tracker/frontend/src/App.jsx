import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Activities', to: '/activities' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Teams', to: '/teams' },
  { label: 'Users', to: '/users' },
  { label: 'Workouts', to: '/workouts' },
]

function Dashboard() {
  return (
    <section className="dashboard-panel">
      <p className="eyebrow">Your fitness community</p>
      <h1>Move together. Get stronger.</h1>
      <p className="lead">
        Track activity, connect with a team, and keep your next goal in sight.
      </p>
      <div className="row g-3 mt-4">
        {navigation.map(({ label, to }) => (
          <div className="col-12 col-sm-6 col-lg-4" key={to}>
            <Link className="dashboard-card" to={to}>
              <span>{label}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="navbar navbar-expand-lg navbar-dark app-header">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            Octofit Tracker
          </Link>
          <nav className="navbar-nav flex-row flex-wrap gap-2" aria-label="Main navigation">
            {navigation.map(({ label, to }) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active' : ''}`
                }
                key={to}
                to={to}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-4 py-md-5">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
