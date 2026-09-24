const tools = [
  { x: 64, y: 140, icon: 'H', label: '제목 단계', example: '큰 제목 · 작은 제목' },
  { x: 64, y: 225, icon: 'B', label: '글자 강조', example: '굵게 · 기울임 · 밑줄 · 취소선' },
  { x: 64, y: 310, icon: '▰', label: '형광펜', example: '중요한 내용에 색상 강조' },
  { x: 64, y: 395, icon: '≡', label: '목록', example: '준비물 · 순서 정리' },
  { x: 64, y: 480, icon: '❝', label: '인용', example: '전달받은 문장 구분' },
]

export default function NoticeMarkdownGuide() {
  return (
    <figure className="markdown-guide" aria-labelledby="markdown-guide-caption">
      <figcaption id="markdown-guide-caption">
        <strong>도구를 고르면, 공지가 이렇게 달라집니다.</strong>
        <p>iOS·Android의 마크다운 기능을 설명하는 그림입니다. 실제 앱 화면을 재현한 것은 아닙니다.</p>
      </figcaption>
      <div className="markdown-diagram-scroll" tabIndex={0} role="region" aria-label="마크다운 기능 그림. 좁은 화면에서는 좌우로 스크롤할 수 있습니다.">
        <svg className="markdown-diagram" viewBox="0 0 1000 830" role="img" aria-labelledby="markdown-diagram-title markdown-diagram-desc">
          <title id="markdown-diagram-title">마크다운 도구와 공지 본문의 연결</title>
          <desc id="markdown-diagram-desc">왼쪽의 제목, 글자 강조, 형광펜, 목록, 인용 도구가 오른쪽 공지의 해당 영역으로 연결됩니다. 공통 글자 서식은 굵게, 기울임, 밑줄, 취소선입니다. 아래에는 iOS 포맷 패널과 Android 하단 도구의 차이를 표시합니다.</desc>
          <defs>
            <marker id="markdown-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#789780" /></marker>
          </defs>
          <rect width="1000" height="830" rx="20" fill="#f3f6ef" />
          <text x="64" y="57" fill="#52715a" fontSize="13" letterSpacing="2">UMC APP · NOTICE</text>
          <text x="64" y="100" fill="#223e2c" fontSize="23" fontWeight="750">01  서식 도구 선택</text>
          <text x="510" y="100" fill="#223e2c" fontSize="23" fontWeight="750">02  본문에 적용</text>

          <rect x="510" y="132" width="426" height="440" rx="16" fill="white" stroke="#bacbbd" />
          <path d="M510 178 H936" stroke="#e1e8df" />
          <text x="535" y="160" fontSize="12" fill="#617268">공지 본문 · 서식 적용 예시</text>
          <circle cx="903" cy="155" r="4" fill="#779781" />
          <text x="550" y="220" fontSize="29" fontWeight="750" fill="#223e2c">함께 만드는 스터디</text>
          <text x="550" y="253" fontSize="16" fill="#5d6d62" fontStyle="italic">서로의 배움을 나누는 시간</text>
          <text x="550" y="298" fontSize="17" fontWeight="750" fill="#223e2c">신청 마감일을 확인해 주세요</text>
          <rect x="548" y="318" width="216" height="32" rx="3" fill="#d5eeb0" />
          <text x="558" y="341" fontSize="18" fontWeight="650" fill="#2e4926">9월 27일 오후 6시까지</text>
          <text x="550" y="393" fontSize="17" fontWeight="700" fill="#223e2c">준비물</text>
          <text x="554" y="426" fontSize="16" fill="#42564a">•  노트북과 충전기</text>
          <text x="554" y="455" fontSize="16" fill="#42564a">•  함께 나누고 싶은 질문 한 가지</text>
          <rect x="548" y="485" width="348" height="59" rx="3" fill="#f1f5ed" />
          <path d="M549 485 V544" stroke="#769c80" strokeWidth="4" />
          <text x="567" y="511" fontSize="15" fill="#47604d">학교와 지부를 넘어</text>
          <text x="567" y="534" fontSize="15" fill="#47604d">서로의 경험을 나눠 주세요.</text>

          {tools.map((tool, index) => <g key={tool.label}>
            <rect x={tool.x} y={tool.y} width="310" height="69" rx="10" fill="white" stroke="#c7d5c6" />
            <rect x={tool.x + 14} y={tool.y + 14} width="40" height="40" rx="8" fill="#e7efdf" />
            <text x={tool.x + 34} y={tool.y + 42} textAnchor="middle" fontSize="23" fontFamily="Georgia, serif" fontWeight="700" fill="#365a3f">{tool.icon}</text>
            <text x={tool.x + 68} y={tool.y + 28} fontSize="17" fontWeight="700" fill="#2d4835">{tool.label}</text>
            <text x={tool.x + 68} y={tool.y + 51} fontSize="12" fill="#617268">{tool.example}</text>
            <path d={`M374 ${tool.y + 34} C438 ${tool.y + 34}, 443 ${[211, 291, 335, 424, 513][index]}, 529 ${[211, 291, 335, 424, 513][index]}`} fill="none" stroke="#789780" strokeWidth="1.6" markerEnd="url(#markdown-arrow)" />
          </g>)}

          <text x="64" y="603" fontSize="12" fill="#617268">글자 서식 예시</text>
          <text x="174" y="603" fontSize="15" fontWeight="750" fill="#294632">굵게</text>
          <text x="242" y="603" fontSize="15" fontStyle="italic" fill="#294632">기울임</text>
          <text x="326" y="603" fontSize="15" textDecoration="underline" fill="#294632">밑줄</text>
          <text x="394" y="603" fontSize="15" textDecoration="line-through" fill="#294632">취소선</text>
          <path d="M64 630 H936" stroke="#c7d5c6" />
          <text x="64" y="665" fontSize="18" fontWeight="750" fill="#294632">iOS</text>
          <text x="64" y="694" fontSize="14" fill="#42564a">포맷 패널 · 선택한 글자에 서식 적용</text>
          <text x="64" y="721" fontSize="12" fill="#617268">제목 / 머리말 / 부머리말 / 본문 / 모노</text>
          <text x="64" y="744" fontSize="12" fill="#617268">구분점·대시선·숫자 목록 · 들여쓰기 · 본문 링크</text>
          <path d="M480 652 V750" stroke="#d2dece" />
          <text x="510" y="665" fontSize="18" fontWeight="750" fill="#294632">Android</text>
          <text x="510" y="694" fontSize="14" fill="#42564a">하단 가로 도구 · 커서 위치의 서식 표시</text>
          <text x="510" y="721" fontSize="12" fill="#617268">제목 1~3 / 본문 · 글머리 목록 · 인용</text>
          <text x="510" y="744" fontSize="12" fill="#617268">형광펜 색상 · 본문 링크 표기 편집</text>
          <rect x="64" y="774" width="872" height="34" rx="6" fill="#264a34" />
          <text x="500" y="796" textAnchor="middle" fontSize="13" fill="white">작성 중 서식 확인  →  저장  →  공지 상세에 반영</text>
        </svg>
      </div>
      <p className="markdown-guide-note">이미지·링크 카드·투표는 본문 서식과 별도로 첨부합니다. 플랫폼별 글자 크기와 배치는 다를 수 있습니다.</p>
    </figure>
  )
}
