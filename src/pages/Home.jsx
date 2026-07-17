import { Link } from 'react-router-dom'
import { useMessages } from '@/hooks/useMessages'
import VerseOfDay from '@/components/VerseOfDay'
import VerseRotator from '@/components/VerseRotator'
import MessageCard from '@/components/MessageCard'
import NewsletterForm from '@/components/NewsletterForm'
import { categories } from '@/data/categories'

export default function Home() {
  const { messages } = useMessages()
  const latest = messages.slice(0, 6)

  return (
    <>
      <div className="container" style={{ paddingTop: 'var(--sp-4)' }}>
        <VerseOfDay messages={messages} />
      </div>

      <div style={{ marginTop: 'var(--sp-5)' }}>
        <VerseRotator messages={messages} />
      </div>

      <section className="container page-section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Últimas publicações</span>
            <h2 className="mt-0">Mensagens recentes</h2>
          </div>
          <Link to="/mensagens" className="btn btn-outline">
            Ver todas
          </Link>
        </div>
        <div className="grid grid-3">
          {latest.map((m) => (
            <MessageCard key={m.id} message={m} />
          ))}
        </div>
      </section>

      <section className="container page-section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <div>
            <span className="eyebrow">Explore por tema</span>
            <h2 className="mt-0">Categorias</h2>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.7em', flexWrap: 'wrap' }}>
          {categories.map((c) => (
            <Link key={c.slug} to={`/categorias/${c.slug}`} className="badge" style={{ padding: '0.6em 1.1em', fontSize: 'var(--fs-sm)' }}>
              <span aria-hidden="true" style={{ marginRight: '0.5em' }}>{c.icon}</span>
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="page-section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container text-center" style={{ maxWidth: 640 }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Newsletter</span>
          <h2>Uma palavra por dia, direto para você</h2>
          <p style={{ marginBottom: 'var(--sp-3)' }}>
            Inscreva-se e receba, gratuitamente, uma mensagem bíblica e uma breve reflexão em seu e-mail.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  )
}
