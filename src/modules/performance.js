// Console figures transcribed from the images supplied on 2026-09-24.
// Each source keeps its own reporting window; missing values are not zeroes.
export const androidMetrics = [
  { label: '사용자 획득', value: 3.43, unit: '명', average: true, change: '+540%' },
  { label: '총 설치 수', value: 89, unit: '건', average: false, change: '−115건' },
  { label: '활성 기기 수', value: 155, unit: '대', average: true, change: '+13%' },
  { label: '사용자층 성장률', value: 15.2, unit: '%', average: true, change: '+16.7%p' },
  { label: '총 사용자층 규모', value: 148, unit: '명', average: true, change: '+15%' },
  { label: '스토어 등록정보 방문자', value: 3.75, unit: '명', average: true, change: '+950%' },
  { label: '스토어 등록정보 획득', value: 3, unit: '명', average: true, change: '>+999%' },
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
  { label: '1.4.0', value: 3 },
  { label: '1.5.0', value: 2 },
  { label: '1.7.0', value: 1 },
  { label: '3.0.1', value: 1 },
]
export const crashTotal = versionCrashes.reduce((sum, item) => sum + item.value, 0)

// Additional source screens explicitly span 2025-03-10 through 2026-09-20.
export const updateSources = [
  { label: 'App Store 검색', value: 4407 },
  { label: '웹 추천 방문', value: 2109 },
  { label: '앱 추천 방문', value: 687 },
  { label: 'App Store 탐색', value: 123 },
  { label: '사용할 수 없음', value: 1 },
]
export const updateTotal = updateSources.reduce((sum, item) => sum + item.value, 0)
export const impressionSources = [
  { label: 'App Store 검색', value: 3927 },
  { label: 'App Store 탐색', value: 1549 },
  { label: '앱 추천 방문', value: 709 },
  { label: '웹 추천 방문', value: 293 },
]
export const impressionTotal = impressionSources.reduce((sum, item) => sum + item.value, 0)
export const conversionSources = [
  { label: '웹 추천 방문', value: 65.47 },
  { label: 'App Store 검색', value: 41.07 },
  { label: '앱 추천 방문', value: 15.80 },
  { label: 'App Store 탐색', value: 2.25 },
]
