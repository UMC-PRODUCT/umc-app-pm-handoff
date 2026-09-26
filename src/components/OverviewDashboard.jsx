import GrowthHero from './GrowthHero'

export default function OverviewDashboard({ chapters, animate, onOpenWelcome }) {
  const topicCount = chapters.reduce((sum, chapter) => sum + chapter.topics.length, 0)

  return (
    <>
      <GrowthHero animate={animate} />
      <section className="handoff-intro" aria-labelledby="handoff-title">
        <div className="handoff-intro-copy">
          <p className="page-context">UMC App 서비스 기획</p>
          <h2 id="handoff-title">UMC PRODUCT를 위한<br />App 인수인계 기록.</h2>
          <p>제가 수기 노트에 남긴 기획 의도와 고민,<br />그리고 UMC App의 기능과 운영 정책을 함께 정리했습니다.</p>
          <button className="welcome-reopen" type="button" onClick={onOpenWelcome}>제옹의 인사 다시 읽기 <span aria-hidden="true">↗</span></button>
        </div>
        <nav className="handoff-paths" aria-label="주요 내용 바로가기">
          {[
            [chapters[0], '이 기록을 읽기 전에'],
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
          <div><dt>대상</dt><dd>PM을 포함한 UMC PRODUCT 구성원 전체</dd></div>
          <div><dt>범위</dt><dd>UMC App 서비스 전체</dd></div>
          <div><dt>현재 상태</dt><dd>작성 완료</dd></div>
        </dl>
      </section>

      <section className="index-section" aria-labelledby="index-title">
        <div className="section-heading">
          <div><h2 id="index-title" tabIndex="-1">전체 목차</h2><p>기획 배경부터 실제 기능, 성과와 남은 과제까지 장별로 살펴볼 수 있습니다.</p></div>
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
