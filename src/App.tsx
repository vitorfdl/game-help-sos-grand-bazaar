import { Routes, Route } from 'react-router-dom'
import Residents from './components/Residents'
import Windmills from './components/Windmills'
import Calendar from './components/Calendar'
import AppLayout from '@/components/layout/AppLayout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Residents />} />
        <Route path="windmills" element={<Windmills />} />
        <Route path="calendar" element={<Calendar />} />
      </Route>
    </Routes>
  )
}

export default App
