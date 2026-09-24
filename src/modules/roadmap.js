export default {
  id: 'chapter-09',
  number: '09',
  label: '이어받기',
  title: '미완료 과제와 향후 계획',
  summary: '다음 PM이 바로 검토해야 할 일과 판단 근거를 모읍니다.',
  topics: [
    '개발 중·미연결·보류 기능',
    '우선순위와 그 판단 근거',
    '다음 PM이 결정해야 할 사항',
  ],
  details: [
    {
      body: '아래는 2026-09-24 기준 UMCApp 코드에 남은 TODO, 비활성 분기와 명시적인 미구현 응답입니다. README의 기능 소개를 완료 판정으로 사용하지 않았으며, 실제 작업 일정과 배포 범위는 별도 확인이 필요합니다.',
      points: [
        '워치에서 iPhone으로 보내는 GPS 출석 위임 요청은 현재 지원하지 않는다고 응답합니다. 워치 화면에도 일부 경로에서 준비 중 플레이스홀더가 남아 있습니다.',
        '앱 오류를 외부 분석 서비스로 보내는 ErrorHandler.trackError는 TODO 상태입니다. 오류 지표가 자동 수집된다고 볼 수 없습니다.',
        '공지 목록의 운영진 서브필터는 추후 재노출 주석과 함께 비활성화되어 있습니다.',
        '출석 기록의 자정 넘김 처리는 종료 시각에 하루를 더하는 임시 방식입니다. 서버 일시 포맷 변경 시 정리할 FIXME가 남아 있습니다.',
        '워크북 미배포 시 상세 진입을 대신하는 안내가 있습니다. 이는 배포되지 않은 데이터의 상태 표시이며 전체 워크북 기능이 미구현이라는 뜻은 아닙니다.',
      ],
      questions: [
        '각 항목의 이슈 상태, 담당자, 서버·워치 의존성, QA 기준, 목표 배포 버전은 어디서 확인할까요?',
        'README에 소개된 기능 중 현재 배포 빌드에서 실제 접근 가능한 범위를 누가 검증하나요?',
      ],
      sources: [
        'UMCApp/UMCApp/Sources/DIContainer+WatchConnectivity.swift:70',
        'UMCApp/UMCWatchApp/Sources/Routing/WatchRoutePlaceholderView.swift:24',
        'UMCApp/Core/Foundation/Sources/Error/Handler/ErrorHandler.swift:287',
        'UMCApp/Features/Notice/Domain/Sources/Enums/NoticeFilters.swift:15',
        'UMCApp/Features/Activity/Domain/Sources/Models/Attendance/MyAttendanceItemModel.swift:148',
        'UMCApp/Features/Activity/Presentation/Sources/Views/Operator/OperatorStudyManagementView.swift:73',
      ],
    },
    {
      body: '저장소에는 PM이 승인한 통합 제품 우선순위표가 없습니다. 우선순위는 영향·빈도·안전성·의존성·배포 상태를 확인한 뒤 확정해야 하며, 코드의 TODO 순서나 최근 커밋 순서를 그대로 따를 수 없습니다.',
      points: [
        '워치 출석 위임은 미지원 응답을 명시해 잘못된 성공 표시를 막습니다. 사용자에게 출석 완료로 오인될 가능성과 실제 워치 배포 범위를 함께 확인해야 합니다.',
        '공지 확인·출석 승인 대기·스터디 제출 현황은 운영 화면에서 상태를 조회할 수 있습니다. 작업 우선순위를 정하기 전에 실패 빈도와 처리 지연을 측정할 기준이 필요합니다.',
        '원격 점검·화면 차단·강제 업데이트는 서비스 접근에 직접 영향을 줍니다. 설정 변경 권한, 테스트 경로, 실패 시 캐시 동작을 배포 의사결정에 포함해야 합니다.',
        '운영진 필터 및 자정 넘김 계산은 코드에 보류·임시 구현으로 표시돼 있지만 심각도와 발생 규모는 코드만으로 판단할 수 없습니다.',
      ],
      questions: [
        '다음 기수의 목표와 실제 사용자 피해 자료를 바탕으로 P0~P2를 누가 결정하나요?',
        '각 우선순위 항목의 서버 API, 디자인, QA, 운영 준비 완료 조건은 무엇인가요?',
      ],
      sources: [
        'UMCApp/UMCApp/Sources/DIContainer+WatchConnectivity.swift:70',
        'UMCApp/Features/Activity/Presentation/Sources/ViewModels/OperatorAttendanceViewModel.swift:114',
        'UMCApp/Features/Maintenance/Presentation/Sources/ViewModels/MaintenanceViewModel.swift:67',
        'UMCApp/Features/Notice/Domain/Sources/Enums/NoticeFilters.swift:15',
        'UMCApp/Features/Activity/Domain/Sources/Models/Attendance/MyAttendanceItemModel.swift:148',
      ],
    },
    {
      body: '다음 PM은 구현된 화면의 존재 여부보다 운영 소유권과 배포 판정을 먼저 확정해야 합니다. 아래 항목은 코드에서 정책이 결정되지 않았거나 별도 조직 판단이 필요한 연결 지점입니다.',
      points: [
        '기수 시작·종료, 회원 승인과 역할 회수, 공지 재알림과 출석 일괄 결정의 기준을 업무 매뉴얼로 확정합니다.',
        '커뮤니티 신고의 접수 후 수동 검토 책임자, 조치 기준, 사용자 통지와 이의신청 경로를 정합니다.',
        '운영 지표의 정의와 계측 위치를 정하고, 앱 내 숫자와 실제 성과 지표를 구별합니다.',
        'App Store 배포 버전, TestFlight 검증 빌드, 현재 UMCApp 소스의 차이를 기능별로 확인합니다. 현재 개발 설정의 MARKETING_VERSION 값이 곧 배포 완료를 뜻하지 않습니다.',
      ],
      questions: [
        '정책별 최종 결정자, 이견 조정 절차, 변경 기록 저장 위치는 어디인가요?',
        '기수 교체 전 반드시 통과해야 하는 배포·권한·운영 리허설은 무엇인가요?',
      ],
      sources: [
        'UMCApp/UMCApp/Sources/AppFlow/AppFlowState.swift:25',
        'UMCApp/Features/Community/Presentation/Sources/ViewModels/CommunityThreadRoomViewModel+Report.swift:12',
        'UMCApp/Features/Notice/Presentation/Sources/ViewModels/NoticeDetail/NoticeDetailViewModel+ReadStatus.swift:26',
        'UMCApp/Tuist/ProjectDescriptionHelpers/Settings+Recommended.swift:50',
      ],
    },
  ],
}
