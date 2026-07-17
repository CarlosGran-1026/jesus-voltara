import { Routes, Route } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import Home from '@/pages/Home'
import Messages from '@/pages/Messages'
import MessageDetail from '@/pages/MessageDetail'
import Categories from '@/pages/Categories'
import CategoryDetail from '@/pages/CategoryDetail'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Search from '@/pages/Search'
import Admin from '@/pages/Admin'

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mensagens" element={<Messages />} />
          <Route path="/mensagens/:slug" element={<MessageDetail />} />
          <Route path="/categorias" element={<Categories />} />
          <Route path="/categorias/:slug" element={<CategoryDetail />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/buscar" element={<Search />} />
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
      </main>
      <Footer />
    </div>
  )
}
