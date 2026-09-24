import { androidMetrics, downloadSources, downloadTotal, downloadShare, pageViews, iosSnapshots, versionCrashes, crashTotal, updateSources, updateTotal, impressionSources, impressionTotal, conversionSources } from '../modules/performance'
import './PerformanceDashboard.css'

function BarChart({ items, maximum, unit, shares = false, decimals = 0 }) {
  return <ul className="metric-bars">{items.map((item) => <li key={item.label}>
    <div className="metric-bar-label"><span>{item.label}</span><strong>{item.value.toLocaleString('ko-KR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}<small>{unit}</small>{shares && <em>{(item.value / maximum * 100).toFixed(1)}%</em>}</strong></div>
    <div className="metric-bar-track" aria-hidden="true"><span style={{ width: `${item.value / maximum * 100}%` }} /></div>
  </li>)}</ul>
}

export default function PerformanceDashboard() {
  return <section className="performance" aria-labelledby="performance-title">
    <header className="performance-intro">
      <div><p className="metric-eyebrow">UMC APP / PERFORMANCE RECORD</p><h2 id="performance-title">숫자로 보는 이용 현황</h2></div>
      <p className="report-period"><span>인수인계 기록 기간</span><strong>2026.03.10 — 09.24</strong></p>
    </header>
    <p className="metric-note">Google Play Console과 App Store Connect의 표시 수치를 정리했습니다. 각 화면의 조회 기간이 달라, 플랫폼별 수치를 합산하거나 같은 기간의 성과로 비교하지 않습니다. 추가로 제공된 2025.03.10–2026.09.20 자료는 아래 ‘장기 조회 기록’에 구분했습니다.</p>

    <div className="performance-highlights">
      <div><span>iOS · 확인된 경로의 다운로드</span><strong>{downloadTotal.toLocaleString('ko-KR')}<small>건</small></strong><p>03.10–09.20 · 신규 사용자 수와 다름</p></div>
      <div><span>Android · 활성 기기 수 평균</span><strong>155<small>대</small></strong><p>08.27–09.23 · 최근 28일 · 증감 +13%</p></div>
      <div><span>iOS · 검색 경로 다운로드 비중</span><strong>{downloadShare(773)}<small>%</small></strong><p>수치가 표시된 4개 경로 합계 기준</p></div>
    </div>

    <section className="performance-block" aria-labelledby="android-title">
      <header className="metric-section-title"><div><p className="metric-eyebrow">01 / ANDROID</p><h3 id="android-title">최근 28일의 유입과 이용</h3></div><span className="metric-period">2026.08.27–09.23 · 최근 28일</span></header>
      <dl className="android-metrics">{androidMetrics.map((metric) => <div key={metric.label}><dt>{metric.label}{metric.average && <small>평균</small>}</dt><dd>{metric.value}<small>{metric.unit}</small></dd><span className={`metric-change${metric.change.startsWith('−') ? ' metric-decrease' : ''}`}>{metric.change} <small>화면 표시 증감</small></span></div>)}</dl>
      <p className="metric-note">총 설치 수 89건에는 평균 표시가 없으며, 증감 −115는 건수입니다. 성장률의 +16.7%p는 퍼센트포인트 변화이고, 스토어 획득의 &gt;+999%는 999% 초과를 뜻합니다. 평균값을 합산하거나 기간 누적으로 환산하지 않습니다. 증감 비교 기간과 평균의 집계 단위는 확인이 필요합니다.</p>
      <div className="quality-grid android-charts">
        <figure className="metric-figure"><figcaption><h4>스토어 등록정보 방문과 획득</h4><p>콘솔 표시 평균 · 막대 기준 0–4명</p></figcaption><BarChart items={androidMetrics.slice(5)} maximum={4} unit="명" decimals={2} /><p className="metric-note">방문자와 획득은 각각의 평균입니다. 두 값을 합산하거나 나누어 전환율을 계산하지 않습니다.</p></figure>
        <figure className="metric-figure"><figcaption><h4>사용자층 성장률</h4><p>콘솔 표시 평균 · 막대 기준 0–100%</p></figcaption><BarChart items={[androidMetrics[3]]} maximum={100} unit="%" decimals={1} /><p className="metric-insight">평균 성장률은 15.2%, 표시 증감은 +16.7%p입니다. 유입 지표 증가와 총 설치 수 감소가 함께 나타나므로, 다음 PM은 지표 정의와 비교 기간을 맞춰 원본을 확인합니다.</p></figure>
      </div>
      <div className="release-record">
        <div><span className="metric-eyebrow">별도 자료 · 버전별 배포 현황</span><h4>버전 3.4.0</h4><p>09.16 오전 8:10 출시 표시</p></div>
        <dl><div><dt>출시율</dt><dd>100<small>%</small></dd></div><div><dt>총 출시 버전 설치 수</dt><dd>122</dd></div><div><dt>앱 설치</dt><dd>199</dd></div></dl>
        <div className="release-adoption"><div><span>설치한 사용자 비율¹</span><strong>61.3%</strong></div><meter min="0" max="100" value="61.3" aria-label="설치한 사용자 비율 61.3%">61.3%</meter></div>
        <p className="metric-note">¹ 원 화면의 ‘설치한 사용자 수’에 표시된 비율입니다. 출시율 100%는 배포 범위이며 전체 사용자의 업데이트 완료를 뜻하지 않습니다. 이 화면의 집계 기간은 표시되지 않았습니다. 설치 199·122는 별도 배포 화면의 값이며, 위 최근 28일 총 설치 수 89건과 합산하거나 같은 기준으로 비교하지 않습니다.</p>
      </div>
    </section>

    <section className="performance-block" aria-labelledby="ios-sources-title">
      <header className="metric-section-title"><div><p className="metric-eyebrow">02 / iOS</p><h3 id="ios-sources-title">앱을 찾은 경로</h3></div><span className="metric-period">2026.03.10–09.20</span></header>
      <div className="acquisition-grid">
        <figure className="metric-figure"><figcaption><h4>다운로드 유입 경로</h4><p>수치 표시 경로 합계 <strong>1,070건</strong> · 비중은 이 합계 기준</p></figcaption><BarChart items={downloadSources} maximum={downloadTotal} unit="건" shares /><p className="metric-insight">검색 경로가 72.2%를 차지합니다. 다음 기수 안내에서 앱 이름과 스토어 검색어가 일치하는지 먼저 점검할 수 있습니다.</p></figure>
        <figure className="metric-figure pageview-figure"><figcaption><h4>제품 페이지 조회</h4><p>고유 기기 · 일 평균 표시값</p></figcaption><BarChart items={pageViews} maximum={4} unit="대/일" /><p className="metric-note">기간 누적 조회 수가 아닙니다. 일 평균을 기간 전체의 고유 기기 수로 환산하지 않습니다.</p></figure>
      </div>
      <p className="metric-note">두 표 모두 ‘기관 구입’과 ‘사용할 수 없음’은 ‘−’로 표시되어 합계에서 제외했습니다. 다운로드와 제품 페이지 조회는 서로 다른 지표입니다.</p>
      <div className="metric-observation"><strong>유입이 집중된 시점</strong><p>원 자료의 추이에서는 3월 중순과 9월 초·중순에 유입이 집중됩니다. 모집·OT·앱 안내 일정과 대조할 조사 단서이며, 특정 행사 효과로 확정한 결과는 아닙니다.</p></div>
    </section>

    <section className="performance-block" aria-labelledby="ios-overview-title">
      <header className="metric-section-title"><div><p className="metric-eyebrow">03 / iOS</p><h3 id="ios-overview-title">시점별 개요 기록</h3></div><span className="metric-period">화면에 표시된 날짜 기준</span></header>
      <p className="metric-note">3월 17일·9월 22일은 화면 상단의 날짜입니다. 집계 시작일과 기간 길이는 확인되지 않아 일별 실적이나 두 시점 사이의 성장률로 해석하지 않습니다.</p>
      <div className="snapshot-table-wrap"><table className="snapshot-table"><caption>App Store Connect 개요의 표시값</caption><thead><tr><th scope="col">지표</th><th scope="col">03.17 표시</th><th scope="col">09.22 표시</th></tr></thead><tbody>{iosSnapshots.map((metric) => <tr key={metric.label}><th scope="row">{metric.label}</th><td>{metric.march}</td><td><strong>{metric.september}</strong><small className={metric.change.startsWith('−') ? 'metric-decrease' : ''}>{metric.change}</small></td></tr>)}</tbody></table></div>
      <p className="metric-note">9월 열의 작은 백분율은 화면에 표시된 증감이며, 3월 열과 비교한 값이 아닙니다. 비교 기준 기간은 미확인입니다. 3월의 증감은 모두 ‘−’로 표시되었습니다. ‘천’ 단위는 원 화면의 반올림 표기를 유지했습니다.</p>
    </section>

    <section className="performance-block" aria-labelledby="quality-title">
      <header className="metric-section-title"><div><p className="metric-eyebrow">04 / iOS</p><h3 id="quality-title">다시 쓰는 경험과 안정성</h3></div><span className="metric-period">옵트인 사용자 데이터</span></header>
      <div className="quality-grid">
        <div className="retention-record"><h4>유지율 · 재방문 확인 필요</h4><p>두 개요 모두 1일 유지율이 가장 높고 이후 낮아집니다. 9월 표시 화면에서는 7·14·28일 막대가 특히 낮게 보입니다.</p><div className="retention-days" aria-label="유지율 관찰 시점"><span>1일</span><span>7일</span><span>14일</span><span>28일</span></div><p className="metric-note">막대에 정확한 수치가 없어 비율을 임의로 복원하지 않았습니다. 관찰 기간이 충분한 코호트인지, 참여 주기와 맞는지 확인한 뒤 판단해야 합니다.</p><strong className="metric-action">다음 확인 → 유지율 원본 수치·대상 규모·집계 기간</strong></div>
        <figure className="metric-figure crash-record"><figcaption><h4>버전별 충돌 기록</h4><p>추가 상세 화면: 03.10–09.20 · 연도 미표시<br />수치 표시 5개 버전 합계 <strong>{crashTotal}건</strong></p></figcaption><BarChart items={versionCrashes} maximum={146} unit="건" /><p className="metric-note">1.0·1.1·1.2·1.2.1·1.3.0은 ‘−’로 표시되어 합계에서 제외했습니다. 기존 09.22 개요의 146건·1건을 다시 더하지 않습니다. 03.17 개요는 ‘데이터 부족’입니다.</p><p className="metric-note">버전별 이용량이 없어 충돌률 또는 개선율로 비교할 수 없습니다. 충돌 건수는 영향을 받은 사용자 수와도 다릅니다.</p><strong className="metric-action">다음 확인 → 조회 연도·영향 사용자·발생 상황·버전별 이용량</strong></figure>
      </div>
    </section>

    <section className="performance-block" aria-labelledby="longterm-title">
      <header className="metric-section-title"><div><p className="metric-eyebrow">05 / iOS · 추가 자료</p><h3 id="longterm-title">장기 조회 기록</h3></div><span className="metric-period">2025.03.10–2026.09.20</span></header>
      <p className="metric-note">이번 세 화면은 시작 연도가 2025년으로 명시되어 있습니다. 위의 2026년 다운로드 기록과 조회 범위가 달라 전환율을 재계산하거나 합산하지 않습니다.</p>
      <dl className="longterm-totals"><div><dt>업데이트 · 수치 표시 경로 합계</dt><dd>{updateTotal.toLocaleString('ko-KR')}<small>건</small></dd></div><div><dt>노출 수 · 수치 표시 경로 합계</dt><dd>{impressionTotal.toLocaleString('ko-KR')}<small>회</small></dd></div></dl>
      <div className="quality-grid">
        <figure className="metric-figure"><figcaption><h4>경로별 업데이트</h4><p>업데이트 발생 건수 · 업데이트한 사람 수와 다름</p></figcaption><BarChart items={updateSources} maximum={updateTotal} unit="건" /><p className="metric-note">‘사용할 수 없음’ 1건은 포함하고, ‘기관 구입’의 ‘−’는 제외했습니다. 새 사용자 유입이나 최신 버전 보급률을 뜻하지 않습니다.</p></figure>
        <figure className="metric-figure pageview-figure"><figcaption><h4>경로별 노출 수</h4><p>노출 횟수 · 고유 사용자 수와 다름</p></figcaption><BarChart items={impressionSources} maximum={impressionTotal} unit="회" /><p className="metric-note">‘기관 구입’과 ‘사용할 수 없음’은 ‘−’로 표시되어 제외했습니다. 가장 많은 노출은 App Store 검색 경로의 3,927회입니다.</p></figure>
      </div>
      <div className="quality-grid conversion-record">
        <figure className="metric-figure"><figcaption><h4>경로별 전환율</h4><p>콘솔에 표시된 일 평균 · 막대 기준 0–100%</p></figcaption><BarChart items={conversionSources} maximum={100} unit="%" decimals={2} /><p className="metric-note">‘기관 구입’과 ‘사용할 수 없음’은 ‘−’입니다. 경로별 일 평균을 합하거나 단순 평균하여 전체 전환율로 사용하지 않습니다.</p></figure>
        <div className="retention-record"><h4>다음 PM이 확인할 점</h4><p>표시된 일 평균 전환율은 웹 추천 방문이 65.47%로 가장 높습니다. 유입 규모와 이용 맥락이 달라 이 값만으로 채널 효과의 우열을 확정할 수는 없습니다.</p><p>웹 안내 링크, 스토어 검색어, 앱 내 안내가 어떤 이용자를 데려오는지 확인하고, 동일 기간의 전환 대상과 다운로드 원본을 함께 확보합니다.</p><p className="metric-note">원 그래프에는 일부 일자의 전환율이 100%를 넘는 구간도 보입니다. 지표의 분자·분모와 소스 귀속 기준을 확인해야 하므로, 임의로 100%에 맞추거나 오류로 단정하지 않습니다.</p><strong className="metric-action">다음 확인 → 집계 기간 통일·전환율 정의·경로별 대상 규모</strong></div>
      </div>
    </section>

    <details className="metric-reading-guide"><summary>집계 기준과 아직 확인할 수 없는 것</summary><ul><li>문서 기록 기간은 2026.03.10–09.24이며, Android KPI 화면은 2026.08.27–09.23(최근 28일), 기존 iOS 경로별 화면은 03.10–09.20입니다. 추가 업데이트·노출·전환율 자료는 2025.03.10–2026.09.20, 추가 충돌 상세는 03.10–09.20(연도 미표시)입니다. 기간 차이를 임의 수치로 채우지 않았습니다.</li><li>기기 수·설치 수·다운로드 수는 고유 사용자 수와 다릅니다. 플랫폼을 합친 MAU나 전체 가입자 수는 이 자료만으로 산출할 수 없습니다.</li><li>원본의 일별 숫자와 범례가 없는 추이는 선그래프로 재구성하지 않았습니다. 정확히 표시된 값만 막대와 표로 옮겼습니다.</li><li>유지율과 충돌은 옵트인 데이터로 전체 사용자를 대표한다고 단정할 수 없습니다.</li><li>사용자 만족도, 리뷰 내용, 문의 건수, 운영 업무 절감 시간은 이번 자료에 없습니다. 아래 인수인계 항목에서 별도로 수집합니다.</li></ul></details>
  </section>
}
