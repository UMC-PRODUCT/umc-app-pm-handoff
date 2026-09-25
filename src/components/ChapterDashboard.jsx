import { captureCount, capturePlatforms, screenCaptures } from '../modules/screenCaptures'
import PerformanceDashboard from './PerformanceDashboard'
import RolePermissions from './RolePermissions'
import ScreenStructure from './ScreenStructure'
import AppExtensions from './AppExtensions'
import NoticeMarkdownGuide from './NoticeMarkdownGuide'
import CardExchangeDiagram from './CardExchangeDiagram'
import { AttendanceFlow, IncidentFlow, NoticeFlow, RoadmapMap } from './FlowVisuals'

const priorities = {
  core: { label: '핵심', description: '기본 이용과 UMC App의 본래 목적에 꼭 필요한 기능' },
  main: { label: '주요', description: '활동과 운영의 흐름을 완성하는 기능' },
  extra: { label: '확장', description: '앱의 편의와 새로운 경험을 더하는 기능' },
}

function PriorityBadge({ priority }) {
  return priorities[priority] && <span className={`priority-badge priority-${priority}`} aria-label={`중요도: ${priorities[priority].label}`}>{priorities[priority].label}</span>
}

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
      <section className="chapter-content" aria-labelledby="chapter-title">
        {chapter.id === 'chapter-05' && chapter.note && <div className="chapter-note capture-reading-guide"><h3>{chapter.note.title}</h3><p>{chapter.note.body}</p></div>}
        {chapter.id === 'chapter-05' && <aside className="priority-guide" aria-labelledby="priority-guide-title">
          <h2 id="priority-guide-title">기능 중요도 <small>검토용 제안</small></h2>
          <ul>{Object.entries(priorities).map(([priority, { description }]) => <li key={priority}><PriorityBadge priority={priority} /><span>{description}</span></li>)}</ul>
          <p>화면 제목은 해당 영역의 중요도, 세부 제목은 개별 기능의 중요도를 나타냅니다. 구현·출시 상태나 개발 순서와는 별개이며, ‘확장’도 삭제해도 되는 기능을 뜻하지 않습니다.</p>
        </aside>}
        <ol className="topic-list">
          {chapter.topics.map((topic, topicIndex) => {
            const detail = chapter.details?.[topicIndex]
            return (
              <li key={topic}>
                <div className="topic-title"><span className="topic-number">{String(topicIndex + 1).padStart(2, '0')}</span><h3>{topic}{detail?.priority && <PriorityBadge priority={detail.priority} />}</h3></div>
                {detail && <div className="topic-detail">
                  <p>{detail.body}</p>
                  {chapter.id === 'chapter-06' && topicIndex === 0 && <NoticeFlow />}
                  {chapter.id === 'chapter-06' && topicIndex === 1 && <AttendanceFlow />}
                  {chapter.id === 'chapter-09' && topicIndex === 0 && <RoadmapMap />}
                  {chapter.id === 'chapter-03' && topicIndex === 1 && <ScreenStructure />}
                  {chapter.id === 'chapter-03' && topicIndex === 2 && <RolePermissions />}
                  {chapter.id === 'chapter-03' && topicIndex === 3 && <AppExtensions />}
                  {detail.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {detail.points?.length > 0 && <ul className="detail-points">{detail.points.map((point) => <li key={point}>{point}</li>)}</ul>}
                  {detail.groups?.length > 0 && <div className="detail-groups">{detail.groups.map((group) => <section key={group.title}>
                    <h4>{group.title}{group.priority && <PriorityBadge priority={group.priority} />}</h4>
                    {group.visual === 'notice-markdown' && <NoticeMarkdownGuide />}
                    {group.visual === 'card-exchange' && <CardExchangeDiagram />}
                    {group.visual === 'incident-flow' && <IncidentFlow />}
                    {group.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {group.points?.length > 0 && <ul>{group.points.map((point) => <li key={point}>{point}</li>)}</ul>}
                    {group.links?.length > 0 && <ul>{group.links.map((link) => <li key={link.href}><a href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a></li>)}</ul>}
                  </section>)}</div>}
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
                </div>}
              </li>
            )
          })}
        </ol>
        {chapter.id !== 'chapter-05' && chapter.note && <div className="chapter-note"><h3>{chapter.note.title}</h3><p>{chapter.note.body}</p></div>}
      </section>

      <nav className="chapter-pagination" aria-label="장 이동">
        {previous ? <a href={`#${previous.id}`}><small>← 이전 장</small><strong>{previous.title}</strong></a> : <span />}
        {next ? <a href={`#${next.id}`}><small>다음 장 →</small><strong>{next.title}</strong></a> : <a href="#top"><small>처음으로 ↗</small><strong>전체 목차</strong></a>}
      </nav>
    </>
  )
}
