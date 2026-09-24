export default {
  id: 'chapter-01',
  number: '01',
  label: '시작하기',
  title: '문서 안내',
  summary: '이 문서의 기준과 읽는 방법을 먼저 맞춥니다.',
  topics: [
    '문서의 목적과 대상',
    '기준 버전·작성일·업데이트 방법',
    '기능 상태 표기: 출시됨 / 개발 중 / 기획 중 / 중단됨',
  ],
  details: [
    {
      body: '다음 기수 PM과 운영진이 서비스의 의도, 실제 사용자 경로, 화면별 동작과 미결정 정책을 이어받기 위한 문서입니다. 현재 구현에서 확인된 사실과 PM의 의사결정이 필요한 사항을 구분해 읽어 주세요.',
      points: [
        '조사 대상은 활성 개발 축인 UMCApp입니다. 과거 AppProduct 화면과 현재 동작을 혼합하지 않습니다.',
        '앱은 시작 확인, 로그인, 가입, 승인 대기, 메인의 상태를 거치며 메인에서 홈·공지·활동·커뮤니티·마이페이지 5개 탭을 제공합니다.',
        '각 항목의 근거는 관련 구현 파일과 행 번호로 남깁니다. 코드로 확인할 수 없는 운영 판단은 확인 질문으로 분리합니다.',
      ],
      questions: [
        '이 문서의 최종 승인자와 기능별 정책 결정 담당 PM은 누구인가요?',
        '서버·Android·운영 매뉴얼과 정책이 충돌할 때 정본으로 삼을 문서는 무엇인가요?',
      ],
      sources: [
        'UMCApp/UMCApp/Sources/AppRootView.swift:28',
        'UMCApp/UMCApp/Sources/RootTab/RootTabView.swift:28',
      ],
    },
    {
      body: '이 초안은 2026-09-24의 iOS 저장소 커밋 43a051fa5828d3cbca24facad1c58f3c9ee737be를 조사 기준으로 작성했습니다. 코드에 있는 기능과 App Store에 출시된 기능은 같은 뜻으로 취급하지 않습니다.',
      points: [
        '현재 앱 개발은 UMCApp의 Tuist 프로젝트를 중심으로 진행되며, 코드에 정의된 화면과 진입 경로를 우선 확인했습니다.',
        '갱신 시 해당 화면의 진입 조건, 사용자 행동, 성공·실패·빈 상태, 역할 차이, 근거 파일과 확인 질문을 함께 수정해야 합니다.',
        '원격 점검·강제 업데이트·화면별 안내는 배포 없이 바뀔 수 있으므로 문서 수정 시 현재 원격 설정도 별도 대조가 필요합니다.',
      ],
      questions: [
        '현재 App Store 배포 빌드·TestFlight 빌드와 이 커밋의 기능 차이를 누가 확인할까요?',
        '인수인계 문서의 정기 갱신 주기와 변경 승인 절차는 어떻게 정할까요?',
      ],
      sources: [
        'UMCApp/Project.swift:1',
        'UMCApp/Features/Maintenance/Data/Sources/RemoteConfigService.swift:12',
      ],
    },
    {
      body: '기능 상태는 PM 확인을 거쳐 출시됨, 개발 중, 기획 중, 중단됨으로 기록합니다. 소스에 구현이 있다는 사실만으로 출시됨이라고 표시하지 않습니다.',
      points: [
        '출시됨은 실제 배포 빌드에서 사용자 경로까지 확인한 경우로, 개발 중은 UMCApp에 구현되었으나 배포·운영 검증이 끝나지 않은 경우로 사용합니다.',
        '기획 중은 화면·행동·정책 결정이 남아 구현 근거가 없는 경우, 중단됨은 담당 PM이 중단을 결정하고 사유를 남긴 경우로 기록합니다.',
        '동일 기능도 원격 설정의 화면별 BLOCKING 안내나 앱 전체 점검 상태에 따라 일시적으로 접근할 수 없습니다. 이는 기능의 중단 여부와 따로 기록합니다.',
      ],
      questions: [
        '기능 상태를 확정할 배포 목록과 PM 승인 기록은 어디에 있나요?',
        '운영 중 일시 차단과 영구 중단을 누가, 어떤 기준으로 구분하나요?',
      ],
      sources: [
        'UMCApp/Features/Maintenance/Presentation/Sources/ViewModels/MaintenanceViewModel.swift:67',
        'UMCApp/Features/Maintenance/Domain/Sources/Models/RemoteNotice.swift:80',
      ],
    },
  ],
}
