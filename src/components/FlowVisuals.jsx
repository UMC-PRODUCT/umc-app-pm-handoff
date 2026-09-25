function Step({ number, title, detail }) {
  return <li><small>{number}</small><strong>{title}</strong><span>{detail}</span></li>
}

export function NoticeFlow() {
  return <figure className="process-map" aria-labelledby="notice-flow-caption">
    <figcaption id="notice-flow-caption"><strong>공지는 어디까지 전달됐을까?</strong><span>발행, 열람, 서버 확인 기록, 재알림을 구분한 흐름</span></figcaption>
    <ol className="process-steps">
      <Step number="01" title="운영진 작성·발행" detail="대상과 본문·첨부를 확인" />
      <Step number="02" title="사용자 공지 열람" detail="화면을 연 사실과 읽음 기록은 별개" />
    </ol>
    <div className="process-branches" aria-label="플랫폼별 읽음 처리">
      <section><small>iOS</small><strong>상세 진입 → 서버 읽음 기록</strong><p>기록 요청이 실패해도 본문은 볼 수 있습니다.</p></section>
      <section><small>Android</small><strong>목록 선택 → 기기 내 읽은 표시</strong><p>현재 확인된 흐름에서 서버 읽음 기록은 연결되지 않았습니다.</p></section>
    </div>
    <ol className="process-steps">
      <Step number="03" title="서버의 확인·미확인 명단" detail="기기 표시나 푸시 수신과 구분" />
      <Step number="04" title="미확인자 재알림" detail="iOS는 모든 페이지 취합 · Android는 불러온 명단 대상" />
    </ol>
    <p className="process-note">재알림 요청 성공은 기기 수신이나 공지 열람을 보장하지 않습니다.</p>
  </figure>
}

export function AttendanceFlow() {
  return <figure className="process-map" aria-labelledby="attendance-flow-caption">
    <figcaption id="attendance-flow-caption"><strong>출석은 언제 완료될까?</strong><span>시간·장소 확인부터 최종 상태 확인까지</span></figcaption>
    <div className="attendance-phases" aria-label="출석 시간 구간"><span>시작 전</span><span>정시</span><span>지각</span><span>마감</span></div>
    <ol className="process-steps">
      <Step number="01" title="일정·대상·시간 준비" detail="운영진이 출석 정책과 장소를 등록" />
      <Step number="02" title="이용 조건 확인" detail="대면 출석은 위치 권한·50m 범위·인정 시간을 확인" />
      <Step number="03" title="출석 요청 또는 사유 제출" detail="위치 확인과 사유 제출만으로 승인되지는 않음" />
      <Step number="04" title="서버 상태 확인" detail="승인 대기 또는 최종 상태를 응답에 따라 구분" />
      <Step number="05" title="필요한 운영진 처리·재확인" detail="승인·반려가 필요한 경우 처리하고 최신 결과 확인" />
    </ol>
    <p className="process-note">모든 요청이 승인 대기를 거치는 것은 아닙니다. 완료 여부는 서버의 최종 상태로 확인합니다.</p>
  </figure>
}

export function IncidentFlow() {
  return <figure className="process-map incident-map" aria-labelledby="incident-flow-caption">
    <figcaption id="incident-flow-caption"><strong>서버 v2 사건과 원격 설정의 역할</strong><span>배포 병목과 사용자 안내를 구분한 운영 흐름</span></figcaption>
    <div className="incident-columns">
      <section><h5>당시의 병목</h5><ol>
        <Step number="01" title="서버 변경의 사전 공유 부족" detail="앱과 서버의 배포 순서 불일치" />
        <Step number="02" title="앱 수정본 배포 지연" detail="버그는 고쳤지만 내보내지 못함" />
        <Step number="03" title="사용자 불편·운영 부담 지속" detail="기존 앱의 문제를 바로 해소할 수 없음" />
      </ol></section>
      <section><h5>다음 대응 순서</h5><ol>
        <Step number="01" title="영향·앱 연동 확인" detail="배포 앱에서 원격 설정 적용 여부 확인" />
        <Step number="02" title="안내 또는 진입 차단" detail="닫을 수 있는 경고와 차단을 상황에 맞게 선택" />
        <Step number="03" title="호환성 확인 후 해제" detail="서버·양쪽 앱의 수정과 배포 결과 재확인" />
      </ol></section>
    </div>
    <p className="process-note">원격 설정은 앱·서버 불일치를 고치지 않습니다. 수정과 배포가 끝날 때까지 상황을 알리고 피해를 줄이는 수단입니다.</p>
    <p className="process-links"><a href="https://github.com/UMC-PRODUCT/umc-product-iOS-remote-config" target="_blank" rel="noopener noreferrer">iOS 원격 설정 도구 ↗</a><a href="https://github.com/UMC-PRODUCT/umc-product-android-config" target="_blank" rel="noopener noreferrer">Android 원격 설정 도구 ↗</a></p>
  </figure>
}

export function RoadmapMap() {
  return <figure className="process-map" aria-labelledby="roadmap-map-caption">
    <figcaption id="roadmap-map-caption"><strong>남은 일을 나누어 보기</strong><span>다음 기수에서 확인할 작업의 종류 · 확정된 우선순위나 기한은 아닙니다</span></figcaption>
    <div className="roadmap-lanes">
      <section><small>구현 보완</small><strong>기능을 끝까지 연결</strong><p>Android 공지의 서버 읽음 기록, watchOS의 실제 일정·공지 공급과 출석 요청</p></section>
      <section><small>실사용 검증</small><strong>기기와 현장에서 확인</strong><p>여러 사람 사이의 무선 명함 교환, 알림 보관함 동기화, 원격 설정의 배포 앱 연동</p></section>
      <section><small>운영 결정</small><strong>관련 팀과 범위를 합의</strong><p>스레드 열람 범위, 신고 접수 체계, 기수 종료 뒤 자료 접근</p></section>
    </div>
    <p className="process-note">각 과제의 실제 완료 여부는 해당 화면·서버 처리와 사용자 안내가 함께 맞는지 확인합니다.</p>
  </figure>
}
