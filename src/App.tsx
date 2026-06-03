import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/Layout.tsx'
import Home from './pages/Home.tsx'
import Blog from './pages/Blog.tsx'
import Projects from './pages/Projects.tsx'
import NotFound from './pages/NotFound.tsx'

const Post = lazy(() => import('./pages/Post.tsx'))
const Admin = lazy(() => import('./pages/Admin.tsx'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Post />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
