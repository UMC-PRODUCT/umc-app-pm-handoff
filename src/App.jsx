import { useEffect, useRef, useState } from 'react'
import { chapters } from './modules'
import OverviewDashboard from './components/OverviewDashboard'
import ChapterDashboard from './components/ChapterDashboard'

function currentChapter() {
  return chapters.find((chapter) => `#${chapter.id}` === window.location.hash) ?? null
}

export default function App() {
  const [activeChapter, setActiveChapter] = useState(currentChapter)
  const [navigationCount, setNavigationCount] = useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    try { return window.localStorage.getItem('umc-handoff-sidebar') === 'open' } catch { return false }
  })
  const animateOverview = useRef(true)
  const welcomeDialog = useRef(null)
  const hideWelcomeToday = useRef(null)

  const openWelcome = () => {
    if (!welcomeDialog.current?.open) welcomeDialog.current?.showModal()
  }

  const toggleSidebar = () => {
    const next = !isSidebarOpen
    setIsSidebarOpen(next)
    try { window.localStorage.setItem('umc-handoff-sidebar', next ? 'open' : 'closed') } catch { /* Keep the toggle usable without storage. */ }
  }

  useEffect(() => {
    if (activeChapter) animateOverview.current = false
  }, [activeChapter])

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

  useEffect(() => {
    try {
      if (Number(window.localStorage.getItem('umc-handoff-welcome-hidden-until')) > Date.now()) return
    } catch { /* Show the welcome message when storage is unavailable. */ }
    openWelcome()
  }, [])

  return (
    <div className={`app-shell${isSidebarOpen ? '' : ' sidebar-collapsed'}`} id="top">
      <a className="skip-link" href="#main-content" onClick={(event) => { event.preventDefault(); document.getElementById('main-content')?.focus() }}>본문으로 바로가기</a>
      <aside className="sidebar" id="chapter-sidebar" aria-label="서비스 기획 목차">
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
        <p className="sidebar-foot">내부 공유 문서 · 작성 완료</p>
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
          <div className="utility-leading">
            <button className="sidebar-toggle" type="button" onClick={toggleSidebar} aria-controls="chapter-sidebar" aria-expanded={isSidebarOpen}>
              <span aria-hidden="true">{isSidebarOpen ? '←' : '☰'}</span>{isSidebarOpen ? '목차 접기' : '목차 열기'}
            </button>
            <span>UMC App <i aria-hidden="true">/</i> 서비스 기획 인수인계</span>
          </div>
          <span className="utility-status">서비스 기획 · 내부용</span>
        </div>

        <main id="main-content" tabIndex="-1">
          {activeChapter
            ? <ChapterDashboard chapter={activeChapter} chapters={chapters} />
            : <OverviewDashboard chapters={chapters} animate={animateOverview.current} onOpenWelcome={openWelcome} />}
        </main>

        <footer className="site-footer">
          <div className="footer-credits"><span>UMC App 서비스 기획 인수인계</span><span>Copyright © 2026 제옹</span></div>
          <div className="footer-reference"><span>UMC PRODUCT Design System을 참고하여 제작했습니다.</span></div>
        </footer>
      </div>

      <dialog className="welcome-dialog" ref={welcomeDialog} aria-labelledby="welcome-title" onClose={() => {
        try {
          if (hideWelcomeToday.current?.checked) {
            const tomorrow = new Date()
            tomorrow.setHours(24, 0, 0, 0)
            window.localStorage.setItem('umc-handoff-welcome-hidden-until', String(tomorrow.getTime()))
          }
        } catch { /* The dialog remains usable without storage. */ }
        hideWelcomeToday.current.checked = false
      }}>
        <div className="welcome-dialog-heading">
          <p>제옹의 인사</p>
          <button type="button" onClick={() => welcomeDialog.current?.close()} aria-label="인사말 닫기">×</button>
        </div>
        <h2 id="welcome-title">UMC App 인수인계 문서를 공유합니다</h2>
        <div className="welcome-dialog-body">
          <p>안녕하세요. MacPilot 담당 제옹입니다.</p>
          <p>작년 이맘때쯤 리버와 함께 팀을 만들면서 UMC App의 기획도 시작됐습니다. 어떤 문제를 앱으로 해결할 수 있을지 고민했고, 앱을 배포한 뒤에는 실제 사용 과정에서 드러난 문제를 어떻게 개선할지 계속 논의했습니다. 저는 그때 있었던 일과 기획의 이유, 내린 결정과 아쉬움을 수기 노트에 기록해 왔습니다.</p>
          <p>리버는 제 기획을 다른 시선에서 살펴보고 의견을 더해 주었습니다. 덕분에 주어진 조건 안에서도 문제를 모바일에서 더 편하게 풀 방법을 함께 찾을 수 있었습니다.</p>
          <p>저는 지금까지 두 기수 동안 UMC App의 모바일 PM과 iOS 개발을 담당해 왔습니다. 제 손안에 있던 앱을 이제 내려놓고, UMC PRODUCT의 모든 분께 전하려 합니다. 인수인계 문서에는 기능을 만든 이유부터 배포 후 겪은 문제, 이를 개선하려 했던 과정과 앞으로의 방향까지 담았습니다. 앱을 이어갈 분들이 지금의 화면과 기능뿐 아니라 그 뒤에 있던 고민도 이해할 수 있기를 바랍니다.</p>
          <p>이 문서는 앞 장의 기획 배경을 알아야 뒤에 나오는 기능과 운영 이야기를 온전히 이해할 수 있도록 구성했습니다. 시간을 내어 첫 목차부터 순서대로, 어느 장도 빠뜨리지 말고 꼼꼼히 읽어주시기를 부탁드립니다. 그래야 기능이 만들어진 이유와 앞으로 지켜야 할 방향까지 함께 전해질 수 있습니다.</p>
          <p>기록하지 못한 맥락이나 부족한 설명도 있을 수 있습니다. 읽다가 궁금한 점이 생기면 저나 리버를 태그해 주세요. 언제든 함께 살펴보고 답하겠습니다.</p>
          <p>저는 이제 모두를 위한 새로운 UMC macOS 앱을 기획하고 만들러 가보겠습니다.</p>
        </div>
        <div className="welcome-dialog-actions">
          <label><input type="checkbox" ref={hideWelcomeToday} /> 오늘 하루 보지 않기</label>
          <button type="button" onClick={() => welcomeDialog.current?.close()}>닫기</button>
          <a href="#chapter-01" onClick={() => welcomeDialog.current?.close()}>목차 순서대로 읽기 <span aria-hidden="true">↗</span></a>
        </div>
      </dialog>
    </div>
  )
}
