export default function About() {
  return (
    <div className="container page-section" style={{ maxWidth: 720 }}>
      <span className="eyebrow">Sobre</span>
      <h1>Nosso propósito</h1>
      <p style={{ fontSize: 'var(--fs-md)', color: 'var(--text-primary)' }}>
        O <strong>Jesus Voltará</strong> nasceu de um desejo simples: colocar, todos os dias, uma palavra de fé,
        esperança e encorajamento ao alcance de quem precisa. Acreditamos que a Bíblia continua falando ao coração
        humano — em tempos de alegria e também nos dias mais difíceis.
      </p>
      <p>
        Aqui você encontra devocionais curtos, pensados para caber na correria do dia a dia, mas com profundidade
        suficiente para gerar reflexão real. Cada mensagem parte de um versículo e se desenvolve em um texto que busca
        aplicar a Escritura à vida prática: família, trabalho, relacionamentos, dúvidas e recomeços.
      </p>
      <p>
        Não pertencemos a uma denominação específica — nosso compromisso é com o texto bíblico e com quem busca, nele,
        um pouco mais de luz para o caminho. Se uma mensagem tocou você, considere compartilhar com alguém que também
        precise ouvi-la hoje.
      </p>
      <div
        style={{
          marginTop: 'var(--sp-4)',
          padding: 'var(--sp-4)',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-secondary)',
          borderLeft: '4px solid var(--accent-gold)',
        }}
      >
        <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'var(--fs-lg)', color: 'var(--text-primary)', margin: 0 }}>
          “A tua palavra é lâmpada para os meus pés e luz para o meu caminho.”
        </p>
        <p style={{ color: 'var(--accent-gold)', fontWeight: 700, marginTop: '0.5em', marginBottom: 0 }}>SALMOS 119:105</p>
      </div>
    </div>
  )
}
