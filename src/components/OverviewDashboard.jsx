import GrowthHero from './GrowthHero'

export default function OverviewDashboard({ chapters, animate }) {
  const topicCount = chapters.reduce((sum, chapter) => sum + chapter.topics.length, 0)

  return (
    <>
      <GrowthHero animate={animate} />
      <section className="handoff-intro" aria-labelledby="handoff-title">
        <div className="handoff-intro-copy">
          <p className="page-context">UMC App 서비스 기획</p>
          <h2 id="handoff-title">다음 PM을 위한<br />인수인계 기록.</h2>
          <p>서비스 의도부터 화면별 기능과 운영 정책까지.<br />다음 기수의 결정을 위한 기록을 한곳에 모았습니다.</p>
        </div>
        <nav className="handoff-paths" aria-label="주요 내용 바로가기">
          {[
            [chapters[1], '서비스를 이해하려면'],
            [chapters[4], '화면 기능을 찾으려면'],
            [chapters[8], '다음 결정을 준비하려면'],
          ].map(([chapter, prompt]) => (
            <a className="handoff-path" href={`#${chapter.id}`} key={chapter.id}>
              <span><small>{prompt}</small><strong>{chapter.title}</strong></span>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
        <dl className="document-facts">
          <div><dt>대상</dt><dd>다음 기수 PM · 운영진</dd></div>
          <div><dt>범위</dt><dd>UMC App 서비스 전체</dd></div>
          <div><dt>현재 상태</dt><dd>PM 검토 중</dd></div>
        </dl>
      </section>

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
