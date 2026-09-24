const surfaces = [
  { title: 'Live Activity', location: '잠금 화면 · Dynamic Island · Smart Stack', status: '출석 시간 안내 구현', kind: 'live', label: '출석 세션', value: '정시 → 지각 → 마감', description: '세션 이름과 남은 시간 표시', note: '출석 가능한 시간대를 확인합니다. 표시만으로 출석이 완료되지는 않습니다.' },
  { title: 'iPhone 홈 위젯', location: '홈 화면 · 작은 크기 / 중간 크기', status: '준비 중', kind: 'widget', label: 'UMC', value: '위젯 준비 중입니다.', description: '현재는 준비 중 안내 표시', note: '공지·일정 등 실제 정보와 상세 화면 연결은 추가 구현이 필요합니다.' },
  { title: 'watchOS', location: 'Apple Watch 앱 · 워치페이스', status: '화면 구성 · 일부 연결 필요', kind: 'watch', label: '손목 위의 UMC', value: '출석 · The Ping', description: '세션·결과·공지 확인 화면', note: 'iPhone과 정보를 동기화합니다. 출석 요청의 실제 전송 연결은 추가 확인이 필요합니다.' },
]

export default function AppExtensions() {
  return (
    <figure className="permissions-map extensions-map" aria-labelledby="extensions-caption">
      <figcaption id="extensions-caption"><span>앱 밖으로 이어지는 UMC App</span><p>표시 위치와 역할을 설명하는 개념도입니다. 실제 앱 화면 캡처는 아닙니다.</p></figcaption>
      <div className="permissions-root"><strong>UMC App · iPhone</strong><span>로그인 · 활동 권한 · 출석과 공지 정보</span></div>
      <div className="permissions-branches">
        {surfaces.map(surface => <section className="permissions-branch extension-surface" key={surface.kind}>
          <h4>{surface.title}</h4>
          <p className="extension-location">{surface.location}</p>
          <div className={`extension-preview extension-${surface.kind}`}>
            <small>{surface.label}</small><strong>{surface.value}</strong><span>{surface.description}</span>
            {surface.kind === 'live' && <div className="extension-timeline" aria-hidden="true"><i /><i /><i /></div>}
          </div>
          <strong className="extension-status">{surface.status}</strong>
          <p>{surface.note}</p>
          {surface.kind === 'watch' && <div className="extension-complications"><strong>워치페이스 정보 영역</strong><span>다음 세션</span><span>미확인 The Ping 건수</span><span>출석 상태</span></div>}
        </section>)}
      </div>
      <div className="extension-return"><strong>실제 참여와 완료 확인은 별도의 단계입니다.</strong><span>시간·현황 확인 <b aria-hidden="true">→</b> 해당 기능에서 필요한 행동 <b aria-hidden="true">→</b> 처리 결과 확인</span></div>
      <div className="permissions-notes"><p>기기 지원, Live Activity 허용 여부, iPhone 연결과 동기화 상태에 따라 표시가 달라집니다. 워치의 대기·연결 실패 상태를 출석 성공으로 안내하지 않습니다.</p></div>
    </figure>
  )
}
