export default {
  id: 'chapter-04',
  number: '04',
  label: '공통 기준',
  title: '공통 정책',
  summary: '여러 화면에 함께 적용되는 정책을 한 번만 정의합니다.',
  topics: [
    '계정·기수·소속·권한 정책',
    '로딩·빈 화면·오류·권한 거부 시 동작',
    '알림 및 개인정보 관련 정책',
    '기능 상태와 정책이 달라지는 조건',
  ],
  details: [
    {
      body: '계정 승인과 기수 배정이 메인 진입의 첫 기준입니다. 메인 진입 후에는 사용자의 보유 역할과 기수·소속 정보, 화면이 다루는 대상의 개별 권한이 함께 적용됩니다.',
      points: [
        '프로필의 소속 기수가 하나라도 있으면 승인된 챌린저로 판정하며, 없으면 승인 대기 경로로 보냅니다.',
        '프로필은 회원·학교·지부·기수·파트와 기수별 역할·소속 목록을 보관합니다.',
        '최고 권한 역할과 보유 역할 전체를 세션에 반영하며, 관리자 모드를 쓸 수 없는 역할로 바뀌면 관리자 모드를 끕니다.',
        '공지·일정·출석 기록 등 리소스별 읽기·쓰기·수정·삭제 권한은 별도 결과로 판단합니다.',
      ],
      questions: [
        '기수 배정만으로 승인을 간주하는 현재 기준이 모든 신규 회원·휴면 회원에게 맞나요?',
        '학교·지부·기수가 바뀔 때 이전 기수 자료의 읽기 권한은 어떻게 유지하거나 회수하나요?',
      ],
      sources: [
        'UMCApp/Core/Domain/Sources/Member/Profile.swift:93',
        'UMCApp/Core/Domain/Sources/Member/Profile.swift:19',
        'UMCApp/Core/Domain/Sources/Member/SyncProfileStorageUseCase.swift:31',
        'UMCApp/Core/Domain/Sources/Authorization/ResourcePermission.swift:23',
      ],
    },
    {
      body: '화면은 요청 전, 로딩, 성공, 실패를 구분하며 데이터가 없을 때와 조회에 실패했을 때를 다르게 안내합니다. 접근 권한을 거부당한 기능은 해당 권한을 요청하거나 설정으로 이동할 수 있는 경우에만 그 경로를 제시합니다.',
      points: [
        '홈의 기수·상벌점·최근 공지는 로딩 상태를 표시하고, 홈 정보나 최근 공지 조회 실패에는 재시도 안내를 제공합니다.',
        '조회는 성공했지만 기수 기록·선택 날짜 일정·최근 공지가 비었을 때는 각각 별도의 빈 화면 문구를 표시합니다.',
        '흐름을 중단해야 하는 오류는 전역 알림으로, 화면 안에서 해결 가능한 실패는 해당 화면에 표시하는 구조입니다.',
        '애플 캘린더 접근이 거부·제한되면 연동을 켜지 않고 설정 앱으로 이동할 수 있는 안내를 띄웁니다.',
      ],
      questions: [
        '기능별 빈 상태 문구와 재시도 횟수·오프라인 대체 화면의 최종 UX 기준이 있나요?',
        '위치·카메라·알림 등 OS 권한 거부 안내를 한 정책으로 통일할까요?',
      ],
      sources: [
        'UMCApp/Features/Home/Presentation/Sources/Views/HomeView.swift:133',
        'UMCApp/Features/Home/Presentation/Sources/Views/HomeView.swift:175',
        'UMCApp/Features/Home/Presentation/Sources/Views/HomeView.swift:239',
        'UMCApp/Features/MyPage/Presentation/Sources/ViewModels/CalendarSyncViewModel.swift:90',
        'UMCApp/Core/Foundation/Sources/Error/Loadable/Loadable.swift:60',
      ],
    },
    {
      body: '알림은 기기 권한 허용 여부와 로그인 회원에 대한 FCM 토큰 등록을 전제로 합니다. 개인정보 관련 확정 정책은 앱 화면과 코드만으로 완결할 수 없으므로 약관 원문과 운영·서버 보관 정책을 함께 확인해야 합니다.',
      points: [
        '알림 권한이 미결정이면 배너·배지·소리 권한을 요청하고, 허용된 상태에서만 원격 알림을 등록합니다.',
        '푸시 제목·본문은 기기 내 알림 보관함에 저장됩니다. 출석 상태 푸시는 화면 갱신에도 사용하고, 딥링크 이동은 사용자가 알림을 누른 경우에만 합니다.',
        '회원가입 화면은 서비스 이용 약관과 개인정보처리 방침을 구분해 보여주고 각 원문 링크를 엽니다. 필수 약관 동의가 가입 조건입니다.',
        'FCM 토큰은 로그인 회원 ID와 함께 서버에 동기화하며, 동일한 회원·토큰 조합은 중복 등록하지 않습니다.',
        '명함첩·알림 이력 등의 기기 저장소는 CloudKit, 기기 로컬, 임시 메모리 순으로 열기를 시도합니다. CloudKit은 UMC 계정이 아니라 Apple ID를 기준으로 동기화하므로 명함은 별도의 회원 소유자 구분을 사용합니다.',
      ],
      questions: [
        '푸시 수신 이력, FCM 토큰, 프로필·명함 데이터의 보관 기간과 탈퇴 시 삭제 범위는 무엇인가요?',
        '개인정보처리 방침의 최신 원문, 선택 동의 항목, 약관 변경 재동의 절차는 어디서 관리하나요?',
        '알림 유형별 수신 거부·야간 발송·운영진 대량 발송 기준이 확정됐나요?',
        '한 Apple ID에서 여러 UMC 계정을 쓰는 경우 기기·CloudKit 데이터의 분리와 삭제 정책은 법무·운영팀이 확인했나요?',
      ],
      sources: [
        'UMCApp/UMCApp/Sources/AppDelegate.swift:266',
        'UMCApp/UMCApp/Sources/AppDelegate.swift:100',
        'UMCApp/UMCApp/Sources/AppDelegate.swift:203',
        'UMCApp/Features/Auth/Presentation/Sources/Components/SignUpTermsSection.swift:128',
        'UMCApp/Features/Auth/Presentation/Sources/ViewModels/SignUpViewModel.swift:97',
        'UMCApp/UMCApp/Sources/UMCAppApp.swift:223',
      ],
    },
    {
      body: '접근 가능 여부는 계정 승인, 역할 변경, OS 권한, 현재 배포 버전과 원격 운영 설정에 따라 달라집니다. PM은 기능 상태와 일시적인 차단·안내 상태를 따로 기록해야 합니다.',
      points: [
        '원격 설정은 앱 전체 점검, 화면별 차단 안내, 최소 지원 버전에 따른 강제 업데이트, 닫을 수 있는 정보 안내를 지원합니다.',
        '안내는 사용 여부·대상 화면·종료일을 검사하며, 알 수 없는 양식이나 잘못된 종료일은 노출하지 않습니다.',
        '원격 설정 조회에 실패하면 캐시 또는 마지막 성공값을 사용하고, 모두 없으면 점검 해제·업데이트 불필요·안내 없음으로 진행합니다.',
        '계정 세션이 만료되면 역할 상태와 화면 흐름을 초기화하고 로그인 화면으로 전환합니다.',
      ],
      questions: [
        '원격 점검·강제 업데이트·화면별 안내를 변경할 수 있는 담당자와 승인 절차는 무엇인가요?',
        '원격 설정 조회 실패 시 차단하지 않고 앱을 열어 두는 정책을 운영·보안 측에서 승인했나요?',
        '배포 채널별 최소 지원 버전과 업데이트 유예 기간은 어떻게 결정하나요?',
      ],
      sources: [
        'UMCApp/Features/Maintenance/Presentation/Sources/ViewModels/MaintenanceViewModel.swift:67',
        'UMCApp/Features/Maintenance/Domain/Sources/Models/RemoteNotice.swift:50',
        'UMCApp/Features/Maintenance/Data/Sources/RemoteConfigService.swift:12',
        'UMCApp/UMCApp/Sources/AppRootView.swift:136',
      ],
    },
  ],
}
