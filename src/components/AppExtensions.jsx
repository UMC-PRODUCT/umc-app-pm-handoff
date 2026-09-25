const surfaces = [
  { title: 'Live Activity', location: '잠금 화면 · Dynamic Island · Smart Stack', status: '출석 시간 안내 구현', kind: 'live', label: '출석 세션', value: '정시 → 지각 → 마감', description: '세션 이름과 남은 시간 표시', note: '출석 가능한 시간대를 확인합니다. 표시만으로 출석이 완료되지는 않습니다.' },
  { title: 'iPhone 홈 위젯', location: '홈 화면 · 작은 크기 / 중간 크기', status: '준비 중', kind: 'widget', label: 'UMC', value: '위젯 준비 중입니다.', description: '현재는 준비 중 안내 표시', note: '공지·일정 등 실제 정보와 상세 화면 연결은 추가 구현이 필요합니다.' },
  { title: 'watchOS', location: 'Apple Watch 앱 · 워치페이스', status: '화면 구성 · 데이터 연결 필요', kind: 'watch', label: '손목 위의 UMC', value: '출석 · The Ping', description: '세션·결과·공지 화면 구성', note: '운영 일정·공지의 실제 공급과 출석 요청 전송은 아직 연결이 필요합니다.' },
]

export default function AppExtensions() {
  return (
    <figure className="permissions-map extensions-map" aria-labelledby="extensions-caption">
      <figcaption id="extensions-caption"><span>앱 밖으로 이어지는 UMC App</span><p>표시 위치와 역할을 설명하는 개념도입니다. 실제 앱 화면 캡처는 아닙니다.</p></figcaption>
      <div className="permissions-root"><strong>UMC App의 일정</strong><span>평소 사용하는 캘린더에서 함께 확인</span></div>
      <div className="permissions-branches calendar-branches">
        <section className="permissions-branch">
          <h4>iOS → Apple 캘린더</h4>
          <strong className="extension-status">단방향 연동 구현</strong>
          <ol className="calendar-steps"><li>연동 켜기 · 접근 허용</li><li>UMC 전용 캘린더 생성</li><li>현재 달 · 홈에서 조회한 달 반영</li></ol>
          <p>조회한 기간의 추가·변경·삭제를 반영합니다. Apple 캘린더의 수정은 UMC App으로 가져오지 않습니다.</p>
          <p><strong>연동 끄기</strong> → UMC 전용 캘린더 삭제 처리</p>
        </section>
        <section className="permissions-branch">
          <h4>Android → Google 캘린더</h4>
          <strong className="extension-status">연결 방향 · 구현 확인 필요</strong>
          <ol className="calendar-steps"><li>Google 캘린더를 연결 대상으로 설정</li><li>연결 메뉴·계정 선택 확인 필요</li><li>추가·변경·삭제 반영 범위 확인 필요</li></ol>
          <p>현재 확인한 앱에서 연동 구현을 찾지 못했습니다. 자동 동기화가 제공되는 상태로 안내하지 않습니다.</p>
        </section>
      </div>
      <p className="permissions-separate">캘린더 연결은 일정 확인을 돕습니다. 외부 캘린더에 일정이 있다고 출석·참여가 완료된 것은 아닙니다.</p>
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
