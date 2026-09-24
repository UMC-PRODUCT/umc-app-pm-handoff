import { useEffect, useState } from 'react'
import { chapters } from './modules'
import OverviewDashboard from './components/OverviewDashboard'
import ChapterDashboard from './components/ChapterDashboard'

function currentChapter() {
  return chapters.find((chapter) => `#${chapter.id}` === window.location.hash) ?? null
}

export default function App() {
  const [activeChapter, setActiveChapter] = useState(currentChapter)
  const [navigationCount, setNavigationCount] = useState(0)

  useEffect(() => {
    const handleHashChange = () => {
      setActiveChapter(currentChapter())
      setNavigationCount((count) => count + 1)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    document.title = activeChapter
      ? `${activeChapter.title} | UMC App 기획 인수인계`
      : 'UMC App | 서비스 기획 인수인계'
    window.scrollTo(0, 0)
  }, [activeChapter])

  useEffect(() => {
    if (navigationCount > 0) document.getElementById('main-content')?.focus()
  }, [navigationCount])

  return (
    <div className="app-shell" id="top">
      <a className="skip-link" href="#main-content" onClick={(event) => { event.preventDefault(); document.getElementById('main-content')?.focus() }}>본문으로 바로가기</a>
      <aside className="sidebar" aria-label="서비스 기획 목차">
        <a className="brand" href="#top" aria-label="UMC App 인수인계 첫 화면">
          <img src="/umc-app-icon.png" width="42" height="42" alt="" />
          <span>
            <strong>UMC App</strong>
            <small>서비스 기획 인수인계</small>
          </span>
        </a>
        <div className="sidebar-rule" />
        <p className="sidebar-label">목차</p>
        <nav aria-label="장별 이동">
          <a className={`nav-link overview-link${!activeChapter ? ' is-active' : ''}`} href="#top" aria-current={!activeChapter ? 'page' : undefined}>
            <span className="nav-number">—</span><span>전체 목차</span>
          </a>
          <ol className="chapter-nav">
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <a className={`nav-link${activeChapter?.id === chapter.id ? ' is-active' : ''}`} href={`#${chapter.id}`} aria-current={activeChapter?.id === chapter.id ? 'page' : undefined}>
                  <span className="nav-number">{chapter.number}</span>
                  <span>{chapter.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <p className="sidebar-foot">내부 공유 문서 · 목차 초안</p>
      </aside>

      <div className="workspace">
        <header className="mobile-header">
          <a className="mobile-brand" href="#top" aria-label="UMC App 인수인계 첫 화면">
            <img src="/umc-app-icon.png" width="36" height="36" alt="" />
            <strong>UMC App</strong>
          </a>
          <details className="mobile-menu" key={activeChapter?.id ?? 'overview'}>
            <summary>목차 <span aria-hidden="true">＋</span></summary>
            <nav aria-label="모바일 장별 이동">
              <a href="#top" aria-current={!activeChapter ? 'page' : undefined}>전체 목차</a>
              {chapters.map((chapter) => <a href={`#${chapter.id}`} key={chapter.id} aria-current={activeChapter?.id === chapter.id ? 'page' : undefined}>{chapter.number} {chapter.title}</a>)}
            </nav>
          </details>
        </header>

        <div className="utility-bar">
          <span>UMC App <i aria-hidden="true">/</i> 서비스 기획 인수인계</span>
          <span className="utility-status">목차 초안 · 내부용</span>
        </div>

        <main id="main-content" tabIndex="-1">
          {activeChapter
            ? <ChapterDashboard chapter={activeChapter} chapters={chapters} />
            : <OverviewDashboard chapters={chapters} />}
        </main>

        <footer className="site-footer"><span>UMC App 서비스 기획 인수인계</span><span>기획 내용을 함께 채우는 중</span></footer>
      </div>
    </div>
  )
}
