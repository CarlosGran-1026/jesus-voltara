import { Link } from 'react-router-dom'
import NewsletterForm from './NewsletterForm'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-subtle)', marginTop: 'var(--sp-7)', background: 'var(--bg-secondary)' }}>
      <div className="container page-section">
        <div className="grid" style={{ gridTemplateColumns: '1.3fr 1fr 1fr', gap: 'var(--sp-5)' }}>
          <div>
            <h4 style={{ marginBottom: '0.6em' }}>Receba a mensagem do dia</h4>
            <p style={{ marginBottom: '1em' }}>
              Um versículo e uma reflexão curta, direto na sua caixa de entrada, sem spam.
            </p>
            <NewsletterForm compact />
          </div>

          <div>
            <h4 style={{ marginBottom: '0.6em', fontSize: 'var(--fs-md)' }}>Navegação</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
              <Link to="/mensagens">Mensagens</Link>
              <Link to="/categorias">Categorias</Link>
              <Link to="/buscar">Buscar versículo</Link>
              <Link to="/sobre">Sobre</Link>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '0.6em', fontSize: 'var(--fs-md)' }}>Contato</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
              <Link to="/contato">Fale conosco</Link>
              <Link to="/admin">Painel administrativo</Link>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 'var(--sp-5)',
            paddingTop: 'var(--sp-3)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5em',
            fontSize: 'var(--fs-xs)',
            color: 'var(--text-muted)',
          }}
        >
          <span>© {new Date().getFullYear()} Jesus Voltará. Todos os direitos reservados.</span>
          <span>Feito com fé, para edificar quem lê.</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer .grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
