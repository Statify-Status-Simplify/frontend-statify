import { useState } from 'react'
import { AuthFlow } from './components/AuthFlow'
import { MainDashboard } from './components/dashboard/MainDashboard'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated) {
    return <AuthFlow onAuthenticated={() => setIsAuthenticated(true)} />
  }

  return (
    <MainDashboard onLogout={() => setIsAuthenticated(false)} />
  )
}

export default App
