export default {
  id: 'chapter-10',
  number: '10',
  label: '참고 자료',
  title: '인수인계 자료',
  summary: '원본 자료와 사람을 찾을 수 있는 마지막 연결점입니다.',
  topics: [
    '디자인·기획·이슈·배포 자료 링크',
    '협업 담당자와 의사결정 경로',
    '용어집',
    '변경 이력',
  ],
  details: [
    {
      body: '확인 가능한 자료부터 연결합니다. App Store, iOS 저장소의 이슈·릴리스·팀 위키, 원격 설정 주소는 2026-09-24에 응답을 확인했습니다. Figma 정본과 별도 기획 원본은 이 저장소에서 확인되지 않아 임의의 링크를 추가하지 않습니다.',
      points: [
        '실제 배포 확인: App Store의 UMC 앱 페이지. 기능 검증에는 해당 페이지의 현재 버전과 테스트한 기기·계정을 함께 기록합니다.',
        '개발 경과: Big-Dipper-iOS의 이슈, 릴리스 목록, Team 위키와 Release History 위키. 최신 구현 기준은 UMCApp 소스와 대조합니다.',
        '운영 설정: 앱이 조회하는 GitHub Pages app-config.json. 점검·최소 지원 버전·화면별 안내의 현재 값과 변경 권한을 별도로 확인합니다.',
        '디자인 토큰과 빌드 절차는 로컬 docs/claude/design-system.md, UMCApp/MAKEFILE_GUIDE.md 및 README가 안내하는 위키를 참고합니다.',
      ],
      questions: [
        'Figma 파일, 확정 PRD·정책 문서, 운영 대시보드와 접근 권한을 가진 담당자는 누구인가요?',
        '이슈·위키·원격 설정 중 정책의 최종 정본과 링크 변경 시 갱신 책임자는 누구인가요?',
      ],
      sources: [
        'UMCApp/Features/Maintenance/Data/Sources/RemoteConfigService.swift:30',
        'UMCApp/Features/Maintenance/Presentation/Sources/Views/MaintenanceView.swift:33',
        'README.md:68',
        'https://apps.apple.com/kr/app/umc/id6759412446',
        'https://github.com/UMC-PRODUCT/Big-Dipper-iOS/issues',
        'https://github.com/UMC-PRODUCT/Big-Dipper-iOS/releases',
        'https://github.com/UMC-PRODUCT/Big-Dipper-iOS/wiki/Team',
        'https://github.com/UMC-PRODUCT/Big-Dipper-iOS/wiki/Release-History',
        'https://umc-product.github.io/umc-product-iOS-remote-config/app-config.json',
      ],
    },
    {
      body: '코드와 저장소 규칙에서 확인되는 것은 기술 승인 경로와 역할 체계입니다. 실제 PM, 서버 운영자, CS 담당자 이름은 이 저장소만으로 확정할 수 없습니다.',
      points: [
        'README는 기수별 iOS 팀 구성을 Team 위키에 누적한다고 안내합니다. 인수인계 시 현 기수 명단과 연락 가능한 채널을 다시 확인해야 합니다.',
        'CODEOWNERS는 공용 코어, 빌드 설정, 보안 설정 등의 변경에 @JEONG-J 코드 소유자 승인을 요구하도록 구성돼 있습니다. 이는 제품 정책 승인자와 동일하다는 뜻은 아닙니다.',
        'Git 워크플로우는 이슈를 먼저 만들고 develop 대상으로 PR을 진행하며 최소 1인 Approve를 요구합니다. 배포는 별도 브랜치와 PR 경로를 사용합니다.',
        '앱 역할은 시스템 관리자, 중앙·지부·학교 운영진, 챌린저로 나뉩니다. 앱 권한과 조직의 업무 책임을 일대일로 가정하지 않습니다.',
      ],
      questions: [
        'PM·디자인·iOS·서버·운영·CS의 현 담당자, 대체 담당자, 긴급 연락 방법을 누가 관리하나요?',
        '정책 변경, 기능 범위 변경, 릴리스 승인, 장애 공지의 최종 의사결정자는 각각 누구인가요?',
      ],
      sources: [
        'UMCApp/Core/Foundation/Sources/Enums/ManagementTeam.swift:13',
        'README.md:55',
        '.github/CODEOWNERS:12',
        'docs/claude/git-workflow.md:12',
        'docs/claude/git-workflow.md:22',
      ],
    },
    {
      body: '같은 용어가 기획 문서, 서버 식별자, 앱 화면에서 다르게 쓰일 수 있습니다. 아래는 현재 코드에서 의미를 확인한 최소 용어이며 PM이 공식 표현을 승인해야 합니다.',
      points: [
        '챌린저: 일반 활동 사용자 역할. 운영진 권한을 가진 사용자는 관리자 모드로 전환할 수 있으며 서버 역할 목록에 따라 접근이 달라집니다.',
        '기수(gen)와 기수 ID(gisuId): gen은 사람에게 보여주는 기수 값, gisuId는 서버에 전달하는 식별자입니다. 서로 바꿔 표시하면 잘못된 기수가 노출될 수 있습니다.',
        'The Ping: 공지의 수신 확인·미확인 현황과 재알림 흐름을 가리키는 기능명입니다. 화면에서는 공지 열람 통계와 상태 목록으로 구현돼 있습니다.',
        '워크북: 스터디의 원본 자료와 개인 제출·피드백을 연결하는 단위입니다. 원본 열람이나 피드백 작성은 역할·소속에 따라 제한됩니다.',
        '원격 안내: GitHub Pages 설정에서 읽어 앱 전체 점검, 화면 차단, 정보 안내, 최소 지원 버전을 판정하는 운영 수단입니다.',
      ],
      questions: [
        '앱·서버·운영진이 다르게 쓰는 명칭을 최종 통일할 담당자는 누구인가요?',
        '기수, 지부, 학교, 파트, 역할의 공식 정의와 권한 표는 어디에 있나요?',
      ],
      sources: [
        'UMCApp/Core/Foundation/Sources/Enums/ManagementTeam.swift:23',
        'UMCApp/Core/Domain/Sources/Member/ChallengerGenRepositoryProtocol.swift:29',
        'UMCApp/Features/Notice/Presentation/Sources/ViewModels/NoticeDetail/NoticeDetailViewModel+ReadStatus.swift:26',
        'UMCApp/Features/Activity/Presentation/Sources/Views/WorkbookView.swift:123',
        'UMCApp/Features/Maintenance/Presentation/Sources/ViewModels/MaintenanceViewModel.swift:67',
      ],
    },
    {
      body: '이 문서의 최초 코드 조사 기준은 2026-09-24의 43a051fa5828d3cbca24facad1c58f3c9ee737be입니다. 변경 이력에는 문서 수정일뿐 아니라 조사한 코드 커밋, 확인한 배포 빌드, 정책 승인자를 함께 남겨야 합니다.',
      points: [
        'AppProduct는 v2.2.0 기준으로 동결된 레거시 축이고, 신규·유지보수 작업은 UMCApp에서 진행합니다. 두 코드베이스의 기능 상태를 혼합하지 않습니다.',
        '현재 UMCApp 빌드 설정의 MARKETING_VERSION은 3.3.0입니다. 이 값만으로 App Store의 공개 버전이나 특정 기능의 출시를 증명할 수 없습니다.',
        '릴리스·기수별 작업 기록은 저장소 Releases와 Release History 위키에서 확인하고, 실제 배포 여부는 App Store·TestFlight 기록과 대조합니다.',
        '이후 수정에서는 항목별 근거 파일·행 번호가 조사 커밋과 맞는지 갱신하고, 확인 질문의 답과 결정 날짜를 함께 적습니다.',
      ],
      questions: [
        '현재 App Store 버전, TestFlight 최신 빌드, 해당 소스 커밋의 대응표는 누가 보관하나요?',
        '문서 변경 승인자, 검토 주기, 오래된 근거 링크를 정리하는 기준은 무엇인가요?',
      ],
      sources: [
        'UMCApp/Tuist/ProjectDescriptionHelpers/Settings+Recommended.swift:50',
        'UMCApp/Project.swift:23',
        'CLAUDE.md:17',
        'README.md:63',
        'https://github.com/UMC-PRODUCT/Big-Dipper-iOS/releases',
        'https://github.com/UMC-PRODUCT/Big-Dipper-iOS/wiki/Release-History',
      ],
    },
  ],
}
