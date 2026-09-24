export default function OverviewDashboard({ chapters, animate }) {
  const topicCount = chapters.reduce((sum, chapter) => sum + chapter.topics.length, 0)

  return (
    <>
      <header className={`page-heading overview-heading${animate ? ' enter-once' : ''}`}>
        <div className="cover-copy">
          <p className="page-context">UMC App 서비스 기획</p>
          <h1>다음 PM을 위한<br /><span>인수인계 기록</span></h1>
          <p className="page-description">서비스의 구조와 화면별 기능을 실제 iOS 구현에서 확인했습니다. 기획 의도와 운영 정책은 PM이 확인할 질문으로 남겼습니다.</p>
          <button className="cover-start" type="button" onClick={() => { const heading = document.getElementById('index-title'); heading?.scrollIntoView(); heading?.focus({ preventScroll: true }) }}>전체 목차 보기 <span aria-hidden="true">↓</span></button>
        </div>
        <nav className="cover-paths" aria-label="주요 내용 바로가기">
          <div className="cover-paths-heading"><img src="/umc-app-icon.png" width="44" height="44" alt="" /><strong>먼저 볼 곳</strong></div>
          {[
            [chapters[1], '서비스를 이해하려면'],
            [chapters[4], '화면 기능을 찾으려면'],
            [chapters[8], '다음 결정을 준비하려면'],
          ].map(([chapter, prompt]) => (
            <a className="cover-path" href={`#${chapter.id}`} key={chapter.id}>
              <span><small>{prompt}</small><strong>{chapter.title}</strong></span>
              <span className="path-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
        <dl className="document-facts">
          <div><dt>대상</dt><dd>다음 기수 PM · 운영진</dd></div>
          <div><dt>범위</dt><dd>UMC App 서비스 전체</dd></div>
          <div><dt>현재 상태</dt><dd>코드 기반 초안 · PM 검토 중</dd></div>
        </dl>
      </header>

      <section className="index-section" aria-labelledby="index-title">
        <div className="section-heading">
          <div><h2 id="index-title" tabIndex="-1">전체 목차</h2><p>각 항목에 구현 내용과 다음 PM이 검토할 질문을 정리했습니다.</p></div>
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
