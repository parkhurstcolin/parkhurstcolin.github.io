import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Home from './pages/Home.tsx'
import NotFound from './pages/NotFound.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
