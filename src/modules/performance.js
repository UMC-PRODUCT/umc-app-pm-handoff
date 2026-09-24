// Console figures transcribed from the seven images supplied on 2026-09-24.
// Each source keeps its own reporting window; missing values are not zeroes.
export const androidMetrics = [
  { label: '기기 노출수', value: 172, change: 132 },
  { label: '기기 획득 수', value: 96, change: 405 },
  { label: '처음 실행한 기기 수', value: 94, change: 31 },
  { label: '월간 활성 기기', value: 207, change: 218 },
]

export const downloadSources = [
  { label: 'App Store 검색', value: 773 },
  { label: '웹 추천 방문', value: 182 },
  { label: '앱 추천 방문', value: 98 },
  { label: 'App Store 탐색', value: 17 },
]
export const downloadTotal = downloadSources.reduce((sum, item) => sum + item.value, 0)
export const downloadShare = (value) => (value / downloadTotal * 100).toFixed(1)

export const pageViews = [
  { label: 'App Store 검색', value: 4 },
  { label: '앱 추천 방문', value: 3 },
  { label: 'App Store 탐색', value: 1 },
  { label: '웹 추천 방문', value: 1 },
]

export const iosSnapshots = [
  { label: '최초 다운로드 수', march: '510', september: '271', change: '+674%' },
  { label: '재다운로드 수', march: '38', september: '107', change: '+98.2%' },
  { label: '전환율 · 일 평균', march: '48.9%', september: '32.1%', change: '+179%' },
  { label: '노출 수', march: '2.45천', september: '2.25천', change: '+79.7%' },
  { label: '제품 페이지 조회 수', march: '1.16천', september: '685', change: '+48.6%' },
  { label: '업데이트', march: '1.26천', september: '2.44천', change: '−25%' },
]

export const versionCrashes = [
  { label: '3.0.0', value: 146 },
  { label: '3.0.1', value: 1 },
]
