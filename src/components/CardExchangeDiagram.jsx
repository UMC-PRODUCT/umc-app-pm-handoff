export default function CardExchangeDiagram() {
  return (
    <figure className="markdown-guide" aria-labelledby="exchange-caption">
      <figcaption id="exchange-caption">
        <strong>각자의 손 위에서, 명함으로 이어지는 관계</strong>
        <p>Wi-Fi Aware·BLE 기반 근거리 무선 교환의 사용 흐름을 설명하는 그림입니다. 실제 앱 화면이나 통신 순서를 재현한 것은 아닙니다.</p>
      </figcaption>
      <div className="markdown-diagram-scroll" tabIndex={0} role="region" aria-label="무선 명함 교환 그림. 좁은 화면에서는 좌우로 스크롤할 수 있습니다.">
        <svg className="markdown-diagram" viewBox="0 0 1000 710" role="img" aria-labelledby="exchange-title exchange-desc">
          <title id="exchange-title">핵심 기능: Wi-Fi Aware·BLE 무선 명함 교환</title>
          <desc id="exchange-desc">내 휴대전화와 상대 휴대전화 사이에서 명함을 주고받습니다. 빈 명함첩에서 교환에 진입하고, 주변 기기를 탐색한 뒤 상대를 선택해 전송합니다. 내 명함 전송과 상대 명함 수신·저장은 별도 상태입니다. 여러 명 동시 교환과 Android 호환은 검증이 필요합니다.</desc>
          <defs>
            <marker id="exchange-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#366348" /></marker>
          </defs>
          <rect width="1000" height="710" rx="20" fill="#f3f6ef" />
          <rect x="48" y="32" width="64" height="30" rx="5" fill="#28543d" />
          <text x="80" y="53" textAnchor="middle" fill="white" fontSize="14" fontWeight="700">핵심</text>
          <text x="126" y="53" fill="#355840" fontSize="15">UMC APP · 명함 중심의 연결</text>
          <text x="48" y="100" fill="#223e2c" fontSize="27" fontWeight="750">휴대전화를 건네지 않아도, 서로를 알아갈 수 있도록.</text>

          <rect x="100" y="138" width="226" height="292" rx="28" fill="#1c3024" />
          <rect x="110" y="148" width="206" height="272" rx="21" fill="white" />
          <rect x="180" y="156" width="66" height="8" rx="4" fill="#1c3024" />
          <text x="213" y="202" textAnchor="middle" fill="#355840" fontSize="16" fontWeight="700">내 휴대전화</text>
          <rect x="132" y="225" width="162" height="116" rx="12" fill="#28543d" />
          <text x="150" y="251" fill="#c9ee9f" fontSize="12">UMC</text>
          <text x="150" y="281" fill="white" fontSize="22" fontWeight="700">내 명함</text>
          <text x="150" y="315" fill="#d6e5d7" fontSize="12">프로필 · 활동 이력 · 링크</text>
          <rect x="132" y="360" width="162" height="35" rx="7" fill="#e5efd9" />
          <text x="213" y="383" textAnchor="middle" fill="#355840" fontSize="14">주변 상대 선택</text>

          <rect x="674" y="138" width="226" height="292" rx="28" fill="#1c3024" />
          <rect x="684" y="148" width="206" height="272" rx="21" fill="white" />
          <rect x="754" y="156" width="66" height="8" rx="4" fill="#1c3024" />
          <text x="787" y="202" textAnchor="middle" fill="#355840" fontSize="16" fontWeight="700">상대 휴대전화</text>
          <rect x="706" y="225" width="162" height="116" rx="12" fill="#e5efd9" stroke="#b4c9a8" />
          <text x="724" y="251" fill="#55704b" fontSize="12">UMC</text>
          <text x="724" y="281" fill="#28543d" fontSize="22" fontWeight="700">상대 명함</text>
          <text x="724" y="315" fill="#55704b" fontSize="12">프로필 · 활동 이력 · 링크</text>
          <rect x="706" y="360" width="162" height="35" rx="7" fill="#f0f3ed" />
          <text x="787" y="383" textAnchor="middle" fill="#355840" fontSize="14">각자의 기기로 교환</text>

          <rect x="381" y="160" width="238" height="37" rx="18" fill="white" stroke="#bdcfb9" />
          <text x="500" y="184" textAnchor="middle" fill="#28543d" fontSize="16" fontWeight="700">Wi-Fi Aware · BLE</text>
          <path d="M350 265 C420 227 580 227 650 265" stroke="#366348" strokeWidth="2" fill="none" markerEnd="url(#exchange-arrow)" />
          <text x="500" y="233" textAnchor="middle" fill="#355840" fontSize="14">내 명함 보내기 →</text>
          <path d="M650 320 C580 358 420 358 350 320" stroke="#366348" strokeWidth="2" fill="none" strokeDasharray="6 5" markerEnd="url(#exchange-arrow)" />
          <text x="500" y="382" textAnchor="middle" fill="#355840" fontSize="14">← 상대 명함 받기 · 저장</text>
          <text x="500" y="464" textAnchor="middle" fill="#526a59" fontSize="14">전송 성공과 상대 명함 수신·저장 완료는 별도로 확인합니다.</text>

          <path d="M48 495 H952" stroke="#c7d5c6" />
          <text x="48" y="534" fill="#28543d" fontSize="17" fontWeight="700">01  교환 진입</text>
          <text x="48" y="561" fill="#526a59" fontSize="14">빈 명함첩에서도 계속 공개</text>
          <text x="282" y="534" fill="#28543d" fontSize="17" fontWeight="700">02  주변 탐색</text>
          <text x="282" y="561" fill="#526a59" fontSize="14">내 명함을 불러온 뒤 찾기</text>
          <text x="516" y="534" fill="#28543d" fontSize="17" fontWeight="700">03  선택 · 전송</text>
          <text x="516" y="561" fill="#526a59" fontSize="14">상대 선택 후 내 명함 보내기</text>
          <text x="750" y="534" fill="#28543d" fontSize="17" fontWeight="700">04  수신 · 저장</text>
          <text x="750" y="561" fill="#526a59" fontSize="14">받은 명함을 명함첩에 보관</text>
          <text x="249" y="535" fill="#789780" fontSize="22">→</text>
          <text x="483" y="535" fill="#789780" fontSize="22">→</text>
          <text x="717" y="535" fill="#789780" fontSize="22">→</text>
          <rect x="48" y="596" width="904" height="79" rx="10" fill="#e5ecdf" />
          <text x="68" y="626" fill="#355840" fontSize="15" fontWeight="700">핵심 경험은 유지하고, 실제 교환 범위는 검증합니다.</text>
          <text x="68" y="652" fill="#526a59" fontSize="14">여러 명 동시 교환과 iOS·Android 간 호환 교환은 아직 검증이 필요합니다.</text>
        </svg>
      </div>
    </figure>
  )
}
