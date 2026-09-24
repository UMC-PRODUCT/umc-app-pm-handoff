export default {
  id: 'chapter-08',
  number: '08',
  label: '돌아보기',
  title: '성과와 사용자 피드백',
  summary: '무엇이 효과가 있었고 무엇이 불편했는지 확인합니다.',
  topics: [
    '추적할 지표',
    '지금까지 확인된 사용성 문제',
    '사용자·운영진 피드백과 반영 결과',
  ],
  details: [
    {
      body: '코드에는 운영 화면에 필요한 건수와 상태 조회가 있지만, 서비스 성과 목표나 분석 대시보드는 확인되지 않습니다. 아래 지표는 현재 기능에서 수집 가능성을 검토할 후보이며 실제 수치나 목표값이 아닙니다.',
      points: [
        '공지별 전체·확인·미확인 인원과 확인 비율을 조회합니다. 목록은 확인·미확인으로 나눠 운영진이 대상자를 살펴볼 수 있습니다.',
        '출석 관리 목록은 승인 대기 건수를 합산하고, 상세에서 참여자의 출석 상태와 사유를 보여줍니다. 처리 시간이나 지각률을 보려면 서버 데이터와 집계 기준을 확인해야 합니다.',
        '스터디 제출 현황은 그룹·주차 조건으로 조회합니다. 제출률을 만들려면 대상 인원, 배포 여부, 제출 완료 판정과 집계 기간을 정해야 합니다.',
        '에러를 Firebase Analytics 또는 Sentry에 보내는 함수는 TODO 상태입니다. 앱 행동 분석이나 오류율이 이미 수집된다고 가정하지 않습니다.',
      ],
      questions: [
        '핵심 지표의 정의, 분모·분자, 집계 주기, 비교 기준, 목표값과 조회 권한은 누가 승인하나요?',
        '실제 분석 도구와 서버 로그 접근 권한이 있나요? 없다면 어떤 최소 이벤트부터 수집할까요?',
      ],
      sources: [
        'UMCApp/Features/Notice/Presentation/Sources/ViewModels/NoticeDetail/NoticeDetailViewModel+ReadStatus.swift:26',
        'UMCApp/Features/Activity/Presentation/Sources/ViewModels/OperatorAttendanceViewModel.swift:114',
        'UMCApp/Features/Activity/Presentation/Sources/Components/Operator/Study/OperatorStudySubmissionSection.swift:79',
        'UMCApp/Core/Foundation/Sources/Error/Handler/ErrorHandler.swift:287',
      ],
    },
    {
      body: '사용자 조사 결과가 아니라 현재 코드에 명시된 제약과 보류 항목입니다. 발생 빈도나 실제 불편의 크기는 문의 기록, 운영진 인터뷰, 실기기 검증으로 확인해야 합니다.',
      points: [
        '공지의 운영진 서브필터는 enum에서 주석 처리되어 숨겨져 있습니다. 운영진 공지 자체의 접근 권한과 목록 필터의 노출 상태를 구별해야 합니다.',
        '스터디 제출 현황에서 개인 워크북이 배포되지 않은 행은 상세로 들어갈 수 없고 미배포 안내를 보여줍니다. 미배포 사유와 배포 책임자는 앱에 나타나지 않습니다.',
        '출석 기록의 종료 시각이 시작 시각보다 이르면 하루를 더하는 임시 계산이 남아 있습니다. 서버가 ISO 8601 일시를 주면 제거할 FIXME로 표시돼 있습니다.',
        '공지 확인 통계 조회 실패는 상세 진입을 막지 않고, 시트에서 다시 시도할 수 있게 처리합니다. 실패가 얼마나 자주 일어나는지는 별도 로그가 필요합니다.',
      ],
      questions: [
        '각 항목의 실제 재현 사례, 영향을 받은 사용자 수, 문의 내용과 해결 여부를 어디에서 확인할 수 있나요?',
        '운영진 공지 필터 재노출, 워크북 미배포 안내, 자정 넘김 출석 처리 중 어느 항목을 우선 검증할까요?',
      ],
      sources: [
        'UMCApp/Features/Notice/Domain/Sources/Enums/NoticeFilters.swift:15',
        'UMCApp/Features/Activity/Presentation/Sources/Views/Operator/OperatorStudyManagementView.swift:73',
        'UMCApp/Features/Activity/Domain/Sources/Models/Attendance/MyAttendanceItemModel.swift:148',
        'UMCApp/Features/Notice/Presentation/Sources/ViewModels/NoticeDetail/NoticeDetailViewModel+ReadStatus.swift:50',
      ],
    },
    {
      body: '저장소에서 확인한 것은 피드백을 받을 수 있는 문의 채널과 일부 기능 수정의 구현 결과입니다. 어떤 제안이 누구에게서 들어왔는지, 어떤 기준으로 채택했는지는 코드만으로 알 수 없습니다.',
      points: [
        '마이페이지의 문의하기는 카카오톡 채널로 연결됩니다. 접수 내역과 분류·처리 결과는 이 저장소에 포함되지 않습니다.',
        '커뮤니티 신고는 서버에 사유를 접수하고 운영진 수동 검토를 전제로 합니다. 신고 처리 결과나 사용자 통지 기록은 클라이언트 코드에서 확인할 수 없습니다.',
        '워크북 상세에서는 담당 멘토, 같은 학교·기수 회장단, 시스템 관리자만 피드백을 작성할 수 있게 설명합니다. 워크북에 남긴 학습 피드백과 서비스 개선 의견은 다른 자료로 관리해야 합니다.',
        '현재 그룹 생성은 유효한 회원 ID와 멘토·스터디원 각 1명 이상을 확인합니다. 제출 현황은 그룹별 주차 옵션을 다시 조회하고, 상벌점 부여·삭제 후에는 화면의 내역과 합계를 갱신합니다. 이 동작만으로 사용자 만족도를 판단할 수는 없습니다.',
      ],
      questions: [
        '사용자 인터뷰·설문·카카오톡 문의·운영진 회고의 원본 위치와 열람 권한은 어디에 있나요?',
        '피드백마다 문제 정의, 재현, 우선순위, 결정자, 반영 버전, 결과 확인을 누가 기록하나요?',
      ],
      sources: [
        'UMCApp/UMCApp/Sources/RootTab/RootTabAccessoryView.swift:218',
        'UMCApp/Features/Community/Presentation/Sources/ViewModels/CommunityThreadRoomViewModel+Report.swift:12',
        'UMCApp/Features/Activity/Presentation/Sources/Views/WorkbookView.swift:143',
        'UMCApp/Features/Activity/Presentation/Sources/ViewModels/OperatorStudyManagementViewModel.swift:691',
        'UMCApp/Features/Activity/Presentation/Sources/ViewModels/OperatorStudyManagementViewModel.swift:1092',
        'UMCApp/Features/Activity/Presentation/Sources/ViewModels/OperatorMemberDetailSheetViewModel.swift:72',
      ],
    },
  ],
}
