export default {
  id: 'chapter-03',
  number: '03',
  label: '어떻게 쓰나',
  title: '서비스 전체 구조',
  summary: '사용자가 앱에 들어와 활동을 마칠 때까지의 경로를 연결합니다.',
  topics: [
    '사용자 여정: 가입부터 활동 종료까지',
    '화면 구조도와 주요 진입 경로',
    '역할별 접근 권한',
    '알림·딥링크 등 화면 밖에서 시작되는 흐름',
  ],
  details: [
    {
      body: '앱은 실행 시 기존 세션과 프로필 승인 상태를 확인한 뒤 로그인, 신규 가입, 승인 대기, 메인 중 다음 화면을 정합니다. 메인에 들어온 뒤에는 홈에서 일정과 공지를 확인하고 각 활동 화면으로 이동합니다.',
      points: [
        '앱 시작 시 토큰·세션·프로필 승인 여부를 확인하며, 전송 실패로 판정할 수 없을 때는 토큰을 보존하고 재시도를 허용하는 상태가 있습니다.',
        '신규 소셜 회원은 이름·닉네임·인증된 이메일·학교·필수 약관 동의를 채워 가입합니다.',
        '가입 후 미승인 사용자는 메인에 들어가지 못하고 기존 챌린저 코드 인증 등의 제한된 경로를 이용합니다.',
        '메인에서 홈은 일정·최근 공지를, 활동은 출석·스터디를, 마이페이지는 개인 기록과 명함·프로젝트 진입을 제공합니다.',
      ],
      questions: [
        '기수 활동 종료 후 사용자에게 보여줄 완료 상태·보관 기간·다음 기수 전환 안내가 정해져 있나요?',
        '승인 대기 평균 처리 시간과 재신청·문의 운영 절차는 어떻게 되나요?',
      ],
      sources: [
        'UMCApp/Features/Auth/Presentation/Sources/ViewModels/BootstrapViewModel.swift:30',
        'UMCApp/Features/Auth/Presentation/Sources/ViewModels/SignUpViewModel.swift:97',
        'UMCApp/UMCApp/Sources/AppRootView.swift:48',
      ],
    },
    {
      body: '메인의 최상위 메뉴는 홈, 공지, 활동, 커뮤니티, 마이페이지입니다. 각 탭은 별도 화면 경로를 보존하며, 다른 기능으로 이동할 때는 앱 셸이 해당 탭과 상세 화면을 연결합니다.',
      points: [
        '홈의 최근 공지 카드는 공지 상세로, 일정 카드는 일정 상세로, 알림 버튼은 알림 보관함으로 이동합니다.',
        '공지 탭은 공지 상세와 운영진 공지 화면에 진입하고, 커뮤니티의 공지 링크도 공지 상세로 연결됩니다.',
        '마이페이지의 나의 스터디는 활동 탭으로, 나의 프로젝트는 프로젝트 목록으로, 명함 기능은 명함 화면으로 이동합니다.',
        '탭마다 독립된 화면 스택을 가지므로 탭 전환만으로 기존 상세 화면이 자동으로 닫히지 않습니다. 다만 나의 스터디 진입은 활동 탭 경로를 초기화합니다.',
      ],
      questions: [
        '화면 구조도의 최종 사용자 노출 명칭과 화면별 소유 PM은 누구인가요?',
        '탭 간 이동 시 이전 상세 화면 보존·초기화 정책을 통일할 필요가 있나요?',
      ],
      sources: [
        'UMCApp/UMCApp/Sources/RootTab/RootTabView.swift:155',
        'UMCApp/UMCApp/Sources/RootTab/RootTabView.swift:188',
        'UMCApp/UMCApp/Sources/RootTab/RootTabView.swift:249',
      ],
    },
    {
      body: '접근 권한은 계정 승인 여부, 전체 역할, 관리자 모드 선택, 개별 리소스 권한을 차례로 확인해야 합니다. 운영진이라는 한 단어만으로 모든 관리 기능을 허용한다고 해석하면 안 됩니다.',
      points: [
        '미승인 사용자는 메인 탭 대신 승인 대기 화면에 머뭅니다.',
        '관리자 모드는 학교 기타 운영진 이상에게 열리며, 사용자가 끄면 활동 화면은 챌린저 모드가 됩니다.',
        '운영진 공지 탭은 학교 파트장 이상부터 접근 가능하고, 스터디 그룹 생성은 학교 회장·부회장에게 한정됩니다.',
        '일정·공지·출석 기록 등 개별 대상은 읽기·쓰기·수정·삭제 등의 리소스 권한 결과로 추가 판정합니다.',
      ],
      questions: [
        '다중 역할 보유자가 기수와 소속이 다른 리소스에 접근하는 최종 서버 정책을 확인했나요?',
        '권한 없음 화면의 안내 문구와 담당 운영진에게 문의하는 경로는 기능별로 확정됐나요?',
      ],
      sources: [
        'UMCApp/Features/Auth/Presentation/Sources/Views/FailedVerificationUMC.swift:15',
        'UMCApp/Core/Domain/Sources/Member/UserSessionManager.swift:38',
        'UMCApp/Core/Foundation/Sources/Enums/ManagementTeam.swift:61',
        'UMCApp/Core/Domain/Sources/Authorization/ResourcePermission.swift:23',
      ],
    },
    {
      body: '앱 밖에서 들어오는 경로는 푸시와 공유 링크입니다. 앱이 아직 메인 탭을 띄우지 않았다면 링크를 보관했다가 메인 진입 후 처리하며, 링크 종류에 따라 착지 화면이 다릅니다.',
      points: [
        '외부 링크 파서는 커뮤니티 스레드·공지, 명함, 출석 일정 링크를 구분합니다.',
        '스레드 링크는 커뮤니티 채팅방, 명함 링크는 마이페이지 맥락의 명함 수신 흐름, 출석 링크는 활동 탭의 해당 출석 세션으로 연결됩니다.',
        '공지 링크는 앱 외부 딥링크 착지로 처리하지 않고 커뮤니티 메시지 안의 링크 카드에서만 엽니다.',
        '푸시는 앱이 열린 상태에서 수신해도 배너·소리·배지를 표시하고 알림 보관함에 저장합니다. 화면 이동은 알림을 탭했을 때에만 시도합니다.',
      ],
      questions: [
        '푸시 유형별 발송 조건·수신 대상·발송 시간대의 서버 정책 문서는 어디에 있나요?',
        '로그인 전 링크 수신, 권한 없는 스레드, 삭제된 대상에 대한 사용자 문구를 통합할까요?',
      ],
      sources: [
        'UMCApp/UMCApp/Sources/Navigation/AppDeepLink.swift:18',
        'UMCApp/UMCApp/Sources/RootTab/RootTabView.swift:280',
        'UMCApp/UMCApp/Sources/AppDelegate.swift:100',
        'UMCApp/UMCApp/Sources/AppDelegate.swift:171',
      ],
    },
  ],
}
