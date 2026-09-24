export default {
  id: 'chapter-02',
  number: '02',
  label: '왜 만들었나',
  title: '서비스 개요',
  summary: '서비스가 해결하려는 문제와 기획 판단의 출발점을 남깁니다.',
  topics: [
    'UMC App 한 줄 소개와 기획 의도',
    '해결하려는 운영 문제',
    '주요 사용자와 역할: 챌린저·운영진 등',
    '서비스의 핵심 가치와 성공 기준',
  ],
  details: [
    {
      body: 'UMC App은 챌린저의 활동 확인과 운영진의 운영 업무를 한 계정에서 연결하는 모바일 서비스입니다. 홈의 일정·최근 공지부터 출석, 스터디, 커뮤니티, 프로젝트와 마이페이지까지 한 앱에서 이어집니다.',
      points: [
        '메인 화면은 홈·공지·활동·커뮤니티·마이페이지 5개 탭으로 구성됩니다.',
        '홈은 기수 활동, 상벌점, 월간 일정, 최근 공지를 함께 보여주고 일정·공지 상세로 이동합니다.',
        '마이페이지에서 스터디는 활동 탭으로, 프로젝트는 프로젝트 목록으로, 명함은 명함 화면으로 연결됩니다.',
      ],
      questions: [
        '공식 서비스 소개 문구와 이번 기수에서 가장 우선할 사용자 문제를 PM이 확정했나요?',
        '새 기수에 추가·제외할 핵심 기능의 우선순위는 무엇인가요?',
      ],
      sources: [
        'UMCApp/UMCApp/Sources/RootTab/RootTabView.swift:28',
        'UMCApp/Features/Home/Presentation/Sources/Views/HomeView.swift:82',
        'UMCApp/UMCApp/Sources/RootTab/RootTabView.swift:234',
      ],
    },
    {
      body: '앱 구조에서 확인되는 문제는 공지 확인, 일정 파악, 출석과 스터디 참여, 운영진 관리가 화면과 도구 사이에 흩어지면 사용자가 활동 맥락을 잃기 쉽다는 점입니다. 현재 구현은 이 흐름을 탭과 연결 진입으로 묶고 있습니다.',
      points: [
        '홈에서 최근 공지와 선택 날짜의 일정을 바로 확인하고 각각 상세 화면으로 이동할 수 있습니다.',
        '출석 관련 푸시를 누르면 활동 탭의 해당 세션을 펼치고, 앱이 켜져 있을 때 도착한 상태 변경은 화면에 전달합니다.',
        '마이페이지의 나의 스터디 선택은 활동 탭의 적절한 스터디 섹션으로 연결합니다.',
      ],
      questions: [
        '기존 운영 도구에서 발생한 누락·중복·응답 지연의 실제 사례와 수치가 있나요?',
        '앱 도입 후에도 외부 도구에 남겨 둘 운영 절차는 무엇인가요?',
      ],
      sources: [
        'UMCApp/Features/Home/Presentation/Sources/Views/HomeView.swift:193',
        'UMCApp/UMCApp/Sources/RootTab/RootTabView.swift:286',
        'UMCApp/UMCApp/Sources/AppDelegate.swift:171',
      ],
    },
    {
      body: '서비스의 기본 이용자는 챌린저이며, 운영 권한을 가진 사용자는 역할에 따라 관리자 모드와 일부 관리 화면에 접근합니다. 동일인이 여러 역할을 가질 수 있으므로 단순한 이분법보다 역할·소속·대상 리소스를 함께 봐야 합니다.',
      points: [
        '역할은 챌린저부터 학교·지부·중앙 운영진과 시스템 관리자까지 서버 역할값에 대응합니다.',
        '학교 기타 운영진 이상은 관리자 모드에 접근할 수 있고, 학교 파트장 이상은 운영진 공지 탭에 접근할 수 있습니다.',
        '현재 세션에는 최고 권한 역할과 전체 역할 목록이 함께 보관되며 관리자 모드는 사용자가 전환합니다.',
        '가입만 끝나고 승인되지 않은 사용자는 메인 대신 승인 대기 화면에서 인증·문의·로그아웃·탈퇴 등의 제한된 행동만 할 수 있습니다.',
      ],
      questions: [
        '각 운영진 역할의 실제 담당 업무와 승인 주체를 기수별로 누가 관리하나요?',
        '역할 변경·기수 종료·소속 이동 시 권한 회수의 서버 처리 시점은 언제인가요?',
      ],
      sources: [
        'UMCApp/Core/Foundation/Sources/Enums/ManagementTeam.swift:23',
        'UMCApp/Core/Foundation/Sources/Enums/ManagementTeam.swift:61',
        'UMCApp/Core/Domain/Sources/Member/UserSessionManager.swift:27',
        'UMCApp/Features/Auth/Presentation/Sources/Views/FailedVerificationUMC.swift:15',
      ],
    },
    {
      body: '기능 설계 관점의 핵심 가치는 필요한 운영 정보를 놓치지 않고, 역할에 맞는 행동을 같은 앱에서 마칠 수 있게 하는 것입니다. 성공 여부는 실제 운영 데이터와 사용자 조사를 통해 별도로 확정해야 합니다.',
      points: [
        '홈은 공지·일정·활동 정보를 한 화면에 모으고, 공지는 상세로 연결합니다.',
        '푸시 수신 이력을 앱 안의 알림 보관함에 저장하며, FCM 토큰은 회원 식별자가 확보된 뒤 서버에 등록합니다.',
        '활동·프로젝트 같은 관리 행동은 역할 또는 개별 리소스 권한에 따라 노출·제한됩니다.',
      ],
      questions: [
        '성공 지표를 공지 확인률, 출석 처리 시간, 운영진 업무 시간, 주간 활성 사용자 중 무엇으로 잡을까요?',
        '현재 지표의 측정 도구·기준값·목표값·담당자는 누구인가요?',
      ],
      sources: [
        'UMCApp/Features/Home/Presentation/Sources/Views/HomeView.swift:82',
        'UMCApp/UMCApp/Sources/AppDelegate.swift:17',
        'UMCApp/Core/Domain/Sources/Authorization/ResourcePermission.swift:36',
      ],
    },
  ],
}
