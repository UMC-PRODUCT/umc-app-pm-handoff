import { useEffect, useRef, useState } from 'react'

export default function GrowthHero({ animate }) {
  const heroRef = useRef(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const hero = heroRef.current
    const observer = new IntersectionObserver(([entry]) => {
      hero.dataset.offscreen = String(!entry.isIntersecting)
    })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <header className={`growth-hero${animate ? ' hero-enter' : ''}`} ref={heroRef} data-paused={paused}>
      <div className="hero-brandline">
        <span><img src="/umc-app-icon.png" width="32" height="32" alt="" />UMC App</span>
        <button className="motion-toggle" type="button" onClick={() => setPaused(!paused)}>
          {paused ? '모션 재생' : '모션 멈추기'}
        </button>
      </div>
      <h1 className="growth-title">
        <span><span>Focus on Growth,</span></span>
        <span><strong>We Handle the Ops.</strong></span>
      </h1>
      <div className="growth-stage" role="img" aria-label="공지, 출석, 스터디 업무가 UMC App을 중심으로 정돈되는 모션 그래픽">
        <div className="stage-horizon" />
        <div className="stage-floor" />
        <div className="ops-ticket ticket-notice"><span>공지</span><strong>필요한 소식을, 제때.</strong><i aria-hidden="true">✓</i></div>
        <div className="ops-ticket ticket-attendance"><span>출석</span><strong>모임의 시작을 간편하게.</strong><i aria-hidden="true">✓</i></div>
        <div className="ops-ticket ticket-study"><span>스터디</span><strong>함께 쌓아가는 성장.</strong><i aria-hidden="true">✓</i></div>
        <div className="product-float">
          <div className="product-object">
            <div className="product-edge" />
            <div className="product-face">
              <span className="product-wordmark">UMC App</span>
              <img src="/umc-app-icon.png" width="150" height="150" alt="" />
              <span className="product-signature">UMC PRODUCT TEAM</span>
              <div className="product-sheen" />
            </div>
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <p>운영의 부담을 덜고, 함께 성장하는 일에 집중하도록.<br />UMC App이 이어갈 서비스의 기준입니다.</p>
        <button className="hero-start" type="button" onClick={() => { const heading = document.getElementById('index-title'); heading?.scrollIntoView(); heading?.focus({ preventScroll: true }) }}>
          전체 목차 보기 <span aria-hidden="true">↗</span>
        </button>
      </div>
    </header>
  )
}
