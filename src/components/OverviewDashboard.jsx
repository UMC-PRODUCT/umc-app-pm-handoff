export default function OverviewDashboard({ chapters }) {
  const topicCount = chapters.reduce((sum, chapter) => sum + chapter.topics.length, 0)

  return (
    <>
      <header className="page-heading">
        <p className="page-context">UMC App · PM 인수인계</p>
        <h1>서비스 기획 인수인계</h1>
        <p className="page-description">다음 PM이 서비스의 의도와 각 화면의 기능을 빠르게 파악하고, 남은 결정을 이어갈 수 있도록 정리합니다.</p>
        <dl className="document-facts">
          <div><dt>대상</dt><dd>다음 기수 PM · 운영진</dd></div>
          <div><dt>범위</dt><dd>UMC App 서비스 전체</dd></div>
          <div><dt>현재 상태</dt><dd>내용 정리 전</dd></div>
        </dl>
      </header>

      <section className="index-section" aria-labelledby="index-title">
        <div className="section-heading">
          <div><h2 id="index-title">전체 목차</h2><p>각 장에서 다룰 내용을 한눈에 확인할 수 있습니다.</p></div>
          <span>{chapters.length}개 장 · {topicCount}개 항목</span>
        </div>
        <div className="index-list">
          {chapters.map((chapter) => (
            <article className="index-row" key={chapter.id}>
              <a className="index-row-link" href={`#${chapter.id}`}>
                <span className="index-number">{chapter.number}</span>
                <span className="index-copy"><strong>{chapter.title}</strong><span>{chapter.summary}</span></span>
                <span className="index-end" aria-hidden="true">↗</span>
              </a>
              <ul className="index-topics">{chapter.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
