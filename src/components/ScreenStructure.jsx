const tabs = [
  { name: '홈', purpose: '오늘의 소식과 일정', routes: [
    ['최근 공지', '공지 상세'],
    ['월간 일정·일정 목록', '일정 상세', '연결된 출석'],
    ['알림 보관함', '알림 내용·지원되는 연결 화면'],
  ] },
  { name: '공지', purpose: '전달부터 확인까지', routes: [
    ['목록·검색', '공지 상세', '첨부·링크·투표'],
    ['운영진 작성·편집', '대상·내용 설정'],
    ['관리 가능한 공지', '열람 현황', '미확인자 재알림'],
  ] },
  { name: '활동', purpose: '참여와 운영', routes: [
    ['챌린저 모드', '출석 세션', '위치 출석·사유 제출', '처리 상태'],
    ['챌린저 모드', '스터디', '커리큘럼·학습 현황'],
    ['관리자 모드', '출석·스터디·구성원 관리'],
  ] },
  { name: '커뮤니티', purpose: '스레드에서 이어지는 대화', routes: [
    ['스레드 목록·검색', '채팅방', '대화·사진·답장·반응'],
    ['스레드 생성', '정보·참여자 설정', '채팅방'],
    ['채팅방', '스레드 정보·참여자 관리'],
  ] },
  { name: '마이페이지', purpose: '명함 중심의 나의 공간', routes: [
    ['명함', '내 명함·받은 명함'],
    ['내 정보 편집', '프로필·챌린저 코드 등록'],
    ['나의 스터디', '활동 탭의 스터디'],
    ['내 프로젝트', '프로젝트 목록·상세'],
    ['활동 기록·수료증·설정'],
  ] },
]

export default function ScreenStructure() {
  return (
    <figure className="permissions-map screen-map" aria-labelledby="screen-map-caption">
      <figcaption id="screen-map-caption"><span>화면 구조와 주요 진입 경로</span><p>메인에서 목적에 맞는 탭을 선택하고, 연결된 상세 화면으로 이동합니다.</p></figcaption>
      <div className="permissions-root"><strong>UMC App 메인</strong><span>로그인·챌린저 코드 인증 후 이용 · 5개 탭 사이 이동</span></div>
      <div className="screen-map-tabs">
        {tabs.map((tab, index) => <section className="screen-map-tab" key={tab.name}>
          <header><small>0{index + 1}</small><h4>{tab.name}</h4><p>{tab.purpose}</p></header>
          <div className="screen-map-routes">{tab.routes.map((route, i) => <ol aria-label={`${tab.name} 진입 경로 ${i + 1}`} key={i}>
            {route.map((step, j) => <li key={step}>{j > 0 && <span className="screen-map-arrow" aria-hidden="true">→</span>}<span className="screen-map-node">{step}</span></li>)}
          </ol>)}</div>
        </section>)}
      </div>
      <div className="permissions-notes">
        <p><strong>화살표는 이동 방향입니다.</strong> 각 줄은 별도의 경로이며, 탭 전체를 순서대로 이용할 필요는 없습니다. 관리 메뉴와 행동은 역할·대상 권한에 따라 달라집니다.</p>
        <p><strong>탭 사이에서도 이어집니다.</strong> 홈의 최근 공지와 커뮤니티의 공지 링크 카드는 공지 상세로, 마이페이지의 나의 스터디는 활동 탭으로 연결됩니다.</p>
        <p>명함 교환·받은 명함 등 세부 화면은 플랫폼과 제공 상태에 따라 다릅니다. 워크북 제출·전반적인 관리는 웹으로 조정했으며, 앱의 확인 범위는 아래 활동 설명을 참고합니다.</p>
      </div>
    </figure>
  )
}
