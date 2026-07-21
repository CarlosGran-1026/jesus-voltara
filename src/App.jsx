import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

const Home = lazy(() => import('@/pages/Home'))
const Messages = lazy(() => import('@/pages/Messages'))
const MessageDetail = lazy(() => import('@/pages/MessageDetail'))
const Categories = lazy(() => import('@/pages/Categories'))
const CategoryDetail = lazy(() => import('@/pages/CategoryDetail'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const Search = lazy(() => import('@/pages/Search'))
const Admin = lazy(() => import('@/pages/Admin'))
const ReadingPlan = lazy(() => import('@/pages/ReadingPlan'))

function PageLoading() {
  return (
    <div className="container page-section text-center">
      <p style={{ color: 'var(--text-muted)' }}>Carregando...</p>
    </div>
  )
}

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <Header />
      <main style={{ flex: 1 }}>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mensagens" element={<Messages />} />
            <Route path="/mensagens/:slug" element={<MessageDetail />} />
            <Route path="/categorias" element={<Categories />} />
            <Route path="/categorias/:slug" element={<CategoryDetail />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/buscar" element={<Search />} />
            <Route path="/calendario" element={<ReadingPlan />} />
            <Route path="/admin" element={<Admin />} />
            <Route
              path="*"
              element={
                <div className="container page-section empty-state">
                  <h2>Página não encontrada</h2>
                  <p>O endereço acessado não existe.</p>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
