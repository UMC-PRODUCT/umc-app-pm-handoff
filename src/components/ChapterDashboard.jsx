export default function ChapterDashboard({ chapter, chapters }) {
  const index = chapters.findIndex((item) => item.id === chapter.id)
  const previous = chapters[index - 1]
  const next = chapters[index + 1]

  return (
    <>
      <header className="page-heading chapter-heading">
        <a className="back-link" href="#top">← 전체 목차</a>
        <p className="page-context">{chapter.number} / {String(chapters.length).padStart(2, '0')} · {chapter.label}</p>
        <h1 id="chapter-title">{chapter.title}</h1>
        <p className="page-description">{chapter.summary}</p>
        <p className="chapter-status">목차 초안 <span aria-hidden="true">·</span> {chapter.topics.length}개 항목</p>
      </header>

      <section className="chapter-content" aria-labelledby="topic-title">
        <div className="section-heading"><div><h2 id="topic-title">이 장에서 다룰 내용</h2><p>실제 기획 의도와 화면 동작은 자료를 확인하며 기록합니다.</p></div></div>
        <ol className="topic-list">
          {chapter.topics.map((topic, topicIndex) => (
            <li key={topic}><span className="topic-number">{String(topicIndex + 1).padStart(2, '0')}</span><h3>{topic}</h3></li>
          ))}
        </ol>
        {chapter.note && <div className="chapter-note"><h3>{chapter.note.title}</h3><p>{chapter.note.body}</p></div>}
      </section>

      <nav className="chapter-pagination" aria-label="장 이동">
        {previous ? <a href={`#${previous.id}`}><small>← 이전 장</small><strong>{previous.title}</strong></a> : <span />}
        {next ? <a href={`#${next.id}`}><small>다음 장 →</small><strong>{next.title}</strong></a> : <a href="#top"><small>처음으로 ↗</small><strong>전체 목차</strong></a>}
      </nav>
    </>
  )
}
