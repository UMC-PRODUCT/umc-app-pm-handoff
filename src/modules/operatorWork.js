export default {
  id: 'chapter-07',
  number: '07',
  label: '운영하기',
  title: '운영 정책과 관리자 업무',
  summary: '기수가 바뀌어도 반복되는 운영 판단과 업무를 남깁니다.',
  topics: [
    '기수 시작·진행·종료 시 해야 할 일',
    '공지·출석·스터디·회원 관리 기준',
    '문의·신고·오류 대응과 담당자',
  ],
  details: [
    {
      body: '기수별 운영 절차를 확정하려면 화면이 사용하는 기수 식별자, 회원 승인 상태, 운영진 권한을 함께 확인해야 합니다. 저장소에는 기수 시작과 종료를 자동으로 처리하는 PM 업무 일정표가 없으므로 아래는 현재 기능을 기준으로 한 점검 항목입니다.',
      points: [
        '시작 전에는 새 기수의 서버 식별자(gisuId)와 화면 표시값(gen)의 매핑을 확인합니다. 잘못 연결되면 공지·스터디 대상 기수가 다르게 보일 수 있습니다.',
        '신규 회원은 가입 후 승인 대기 상태를 거칠 수 있습니다. 승인 책임자, 승인 기준과 처리 시간을 운영 정책으로 별도 정해야 합니다.',
        '진행 중에는 운영진 모드의 출석 승인 대기, 스터디 그룹·제출 현황, 공지 확인·미확인 목록을 점검할 수 있습니다.',
        '종료 시에는 권한 회수, 미처리 출석·신고, 공지·워크북 보존, 다음 기수 자료 이관 순서를 PM과 서버 운영 담당자가 함께 확정해야 합니다. 코드만으로 자동 종료 정책은 확인되지 않습니다.',
      ],
      questions: [
        '기수 개설·회원 승인·권한 부여·종료 처리의 담당자와 완료 기준은 누구에게 있나요?',
        '기수 전환 날짜, 이전 기수 데이터 열람 기간, 미처리 건의 이관 규칙은 무엇인가요?',
      ],
      sources: [
        'UMCApp/Core/Domain/Sources/Member/ChallengerGenRepositoryProtocol.swift:29',
        'UMCApp/UMCApp/Sources/AppFlow/AppFlowState.swift:25',
        'UMCApp/Features/Activity/Presentation/Sources/Views/Operator/OperatorAttendanceView.swift:16',
        'UMCApp/Features/Activity/Presentation/Sources/Views/Operator/OperatorStudyManagementView.swift:15',
      ],
    },
    {
      body: '관리자 화면은 권한에 따라 행동이 달라집니다. 화면에 버튼이 있다는 사실을 운영 정책의 승인 기준으로 해석하지 말고, 업무별 판단 기준과 기록 위치를 별도로 정해야 합니다.',
      points: [
        '공지 작성 화면은 기수·조직·역할 맥락을 전달하고 카테고리와 대상을 선택해 저장합니다. 공지 상세에서는 확인·미확인 수와 비율을 조회하고 미확인 대상에게 재알림을 보낼 수 있습니다.',
        '출석 관리에서는 상태·기간 필터로 목록을 보고, 승인 대기 건을 개별 또는 일괄 승인·거절할 수 있습니다. 사유가 있으면 승인 전에 내용을 확인하는 동선이 있습니다.',
        '스터디 관리에서는 그룹 생성, 그룹·주차별 제출 현황 조회와 워크북 상세 진입을 제공합니다. 그룹 생성은 교내 회장·부회장 권한으로 제한됩니다.',
        '회원 관리에서는 검색과 상벌점 부여·삭제를 제공합니다. 상벌점 타입, CUSTOM 배점, 사유 입력은 폼의 검증 조건을 따릅니다.',
      ],
      questions: [
        '공지 대상 선정·재알림 횟수, 출석 이의신청·일괄 처리, 상벌점 증빙·정정 기준은 어떻게 정하나요?',
        '스터디 그룹/워크북 배포 책임자와 기수 종료 후 데이터 보존 기간은 누구에게 확인해야 하나요?',
      ],
      sources: [
        'UMCApp/Features/Notice/Presentation/Sources/Views/NoticeEditor/NoticeEditorView.swift:98',
        'UMCApp/Features/Notice/Presentation/Sources/Views/NoticeDetail/NoticeReadStatusSheet.swift:180',
        'UMCApp/Features/Activity/Presentation/Sources/Views/Operator/OperatorAttendanceDetailView.swift:103',
        'UMCApp/Features/Activity/Presentation/Sources/Views/Operator/OperatorStudyManagementView.swift:47',
        'UMCApp/Core/Foundation/Sources/Enums/ManagementTeam.swift:66',
        'UMCApp/Features/Activity/Presentation/Sources/Components/Member/PointGrantFormSheet.swift:13',
      ],
    },
    {
      body: '사용자 문의, 커뮤니티 신고, 앱 오류는 현재 서로 다른 경로로 들어옵니다. 앱은 접수와 오류 표시까지 담당하며, 실제 처리 담당자와 응답 기한은 코드에 정해져 있지 않습니다.',
      points: [
        '마이페이지의 문의하기는 UMC 카카오톡 채널을 엽니다. 카카오톡 채널 실행에 실패하면 웹 채팅 주소로 전환하고, 둘 다 실패하면 오류를 표시합니다.',
        '커뮤니티 메시지 신고는 사유 하나를 선택해 접수합니다. 클라이언트는 신고 누적만으로 메시지를 자동 숨김 처리하지 않으며 후속 검토는 운영진 수동 확인을 전제로 합니다.',
        '신고 성공은 화면 안에 안내하고, 실패는 사유 선택 시트에 남겨 재시도하게 합니다. 중복 신고는 같은 실행에서 안내로 막습니다.',
        '앱 전체 점검, 강제 업데이트, 화면별 차단 안내는 원격 설정으로 제어합니다. 원격 설정을 읽지 못하면 캐시·마지막 성공값을 사용하고 모두 없으면 차단하지 않습니다.',
      ],
      questions: [
        '카카오톡 채널의 실제 접수 담당자, 신고 검토자, 오류·장애 긴급 연락망과 응답 목표 시간은 무엇인가요?',
        '신고 후 콘텐츠 조치, 사용자 통지, 이의신청, 개인정보 보존·삭제 책임자는 누구인가요?',
        '원격 점검 설정 변경 권한과 차단·해제 승인 절차는 어디에 기록하나요?',
      ],
      sources: [
        'UMCApp/UMCApp/Sources/RootTab/RootTabAccessoryView.swift:218',
        'UMCApp/Core/Network/Sources/Auth/KakaoPlusManager.swift:35',
        'UMCApp/Features/Community/Presentation/Sources/ViewModels/CommunityThreadRoomViewModel+Report.swift:12',
        'UMCApp/Features/Community/Presentation/Sources/ViewModels/CommunityThreadRoomViewModel+Report.swift:49',
        'UMCApp/Features/Maintenance/Data/Sources/RemoteConfigService.swift:12',
      ],
    },
  ],
}
