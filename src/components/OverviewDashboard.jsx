export default function OverviewDashboard({ chapters, animate }) {
  const topicCount = chapters.reduce((sum, chapter) => sum + chapter.topics.length, 0)

  return (
    <>
      <header className={`page-heading overview-heading${animate ? ' enter-once' : ''}`}>
        <div className="cover-copy">
          <p className="page-context">UMC App 서비스 기획</p>
          <h1>다음 PM을 위한<br /><span>인수인계 기록</span></h1>
          <p className="page-description">UMC App의 화면과 운영 흐름을 다음 기수에 전합니다. 서비스 의도부터 기능별 정책, 남은 결정까지 한곳에서 확인하세요.</p>
          <button className="cover-start" type="button" onClick={() => { const heading = document.getElementById('index-title'); heading?.scrollIntoView(); heading?.focus({ preventScroll: true }) }}>전체 목차 보기 <span aria-hidden="true">↓</span></button>
        </div>
        <div className="cover-side">
          <div className="cover-value">
            <div className="cover-value-heading"><span>UMC App이 지향하는 경험</span><img src="/umc-app-icon.png" width="36" height="36" alt="" /></div>
            <div className="cover-value-art" aria-hidden="true">
              <div className="cover-ops"><span>공지</span><span>출석</span><span>스터디</span></div>
              <svg className="cover-growth" viewBox="0 0 260 130" fill="none" preserveAspectRatio="xMidYMid meet">
                <path className="growth-trail" d="M8 110 C70 110 80 90 123 83 S192 28 244 17" pathLength="1" />
                <path className="growth-arrow" d="M228 18 L245 16 L241 33" />
              </svg>
            </div>
            <p className="cover-value-line">Focus on Growth,<br /><strong>We Handle the Ops.</strong></p>
          </div>
          <nav className="cover-paths" aria-label="주요 내용 바로가기">
            <div className="cover-paths-heading"><strong>먼저 볼 곳</strong><span aria-hidden="true">↘</span></div>
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
        </div>
        <dl className="document-facts">
          <div><dt>대상</dt><dd>다음 기수 PM · 운영진</dd></div>
          <div><dt>범위</dt><dd>UMC App 서비스 전체</dd></div>
          <div><dt>현재 상태</dt><dd>PM 검토 중</dd></div>
        </dl>
      </header>

      <section className="index-section" aria-labelledby="index-title">
        <div className="section-heading">
          <div><h2 id="index-title" tabIndex="-1">전체 목차</h2><p>각 항목에 서비스 동작과 다음 PM이 검토할 질문을 정리했습니다.</p></div>
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
