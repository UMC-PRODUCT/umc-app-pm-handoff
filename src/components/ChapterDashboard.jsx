import { captureCount, capturePlatforms, screenCaptures } from '../modules/screenCaptures'
import PerformanceDashboard from './PerformanceDashboard'

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
        <p className="chapter-status">2026.09.24 정리 <span aria-hidden="true">·</span> {chapter.topics.length}개 항목{chapter.id === 'chapter-05' && <> <span aria-hidden="true">·</span> {captureCount}장 화면 캡처 ({capturePlatforms.map((platform) => `${platform.label} ${platform.count}장`).join(' · ')})</>}</p>
      </header>

      {chapter.id === 'chapter-08' && <PerformanceDashboard />}
      <section className="chapter-content" aria-labelledby="topic-title">
        <div className="section-heading"><div><h2 id="topic-title">{chapter.sectionTitle ?? (chapter.id === 'chapter-08' ? '다음 PM에게 이어갈 일' : '이 장에서 다룰 내용')}</h2><p>{chapter.sectionDescription ?? (chapter.id === 'chapter-08' ? '관찰한 성과와 조사할 문제를 구분하고, 후속 확인 항목을 남깁니다.' : '서비스 동작을 설명하고, 결정이 필요한 부분은 따로 표시했습니다.')}</p></div></div>
        <ol className="topic-list">
          {chapter.topics.map((topic, topicIndex) => {
            const detail = chapter.details?.[topicIndex]
            return (
              <li key={topic}>
                <div className="topic-title"><span className="topic-number">{String(topicIndex + 1).padStart(2, '0')}</span><h3>{topic}</h3></div>
                {detail && <div className="topic-detail">
                  <p>{detail.body}</p>
                  {detail.points?.length > 0 && <ul className="detail-points">{detail.points.map((point) => <li key={point}>{point}</li>)}</ul>}
                  {detail.groups?.length > 0 && <div className="detail-groups">{detail.groups.map((group) => <section key={group.title}><h4>{group.title}</h4><ul>{group.points.map((point) => <li key={point}>{point}</li>)}</ul></section>)}</div>}
                  {chapter.id === 'chapter-05' && screenCaptures[topicIndex] && <section className="capture-section" aria-label={`${topic} 화면 캡처`}>
                    <h4>화면 캡처</h4>
                    {screenCaptures[topicIndex].map((section) => <div className="capture-group" key={section.title}>
                      <h5>{section.title}</h5>
                      <div className="capture-platforms">{section.platforms.map((platform) => <section className="capture-platform" key={platform.id} aria-label={`${section.title} ${platform.label}`}>
                        <h6>{platform.label}<span>{platform.images.length}장</span></h6>
                        {platform.images.length ? <div className="capture-grid">{platform.images.map((image) => <a className="capture-card" href={image.src} target="_blank" rel="noreferrer" key={image.id} aria-label={`${platform.label} ${image.title} 캡처 원본 보기`}>
                          <span className="capture-image"><img src={image.src} alt={`${platform.label} ${image.title} 화면`} width={platform.width} height={platform.height} loading="lazy" decoding="async" /></span>
                          <span className="capture-caption"><small>{image.id}</small>{image.title}<span aria-hidden="true">↗</span></span>
                        </a>)}</div> : <p className="capture-empty">제공된 {platform.label} 캡처가 없습니다.</p>}
                      </section>)}</div>
                    </div>)}
                  </section>}
                  {detail.questions?.length > 0 && <div className="detail-questions"><h4>PM 확인 필요</h4><ul>{detail.questions.map((question) => <li key={question}>{question}</li>)}</ul></div>}
                </div>}
              </li>
            )
          })}
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
