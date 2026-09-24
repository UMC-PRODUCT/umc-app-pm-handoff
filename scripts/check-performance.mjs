import assert from 'node:assert/strict'
import { androidMetrics, downloadSources, downloadTotal, downloadShare, pageViews, iosSnapshots, versionCrashes, crashTotal, updateSources, updateTotal, impressionSources, impressionTotal, conversionSources } from '../src/modules/performance.js'

assert.deepEqual(androidMetrics.map(({ label, value, unit, average, change }) => [label, value, unit, average, change]), [
  ['사용자 획득', 3.43, '명', true, '+540%'],
  ['총 설치 수', 89, '건', false, '−115건'],
  ['활성 기기 수', 155, '대', true, '+13%'],
  ['사용자층 성장률', 15.2, '%', true, '+16.7%p'],
  ['총 사용자층 규모', 148, '명', true, '+15%'],
  ['스토어 등록정보 방문자', 3.75, '명', true, '+950%'],
  ['스토어 등록정보 획득', 3, '명', true, '>+999%'],
], 'Android replacement screenshot: preserve averages, absolute changes, percentage points and the lower bound')
assert.equal(downloadTotal, 1070, 'Download sum must match the four numeric source rows')
assert.equal(downloadShare(773), '72.2')
assert.equal(downloadShare(0), '0.0')
assert.equal(downloadSources.reduce((sum, row) => sum + Number(downloadShare(row.value)), 0), 100)
assert.equal(updateTotal, 7327, 'Include the unavailable-source row with a numeric value of 1')
assert.equal(impressionTotal, 6478)
assert.equal(crashTotal, 153, 'Count numeric detail rows once, without adding overview snapshots')
assert.equal(conversionSources.find(row => row.label === '앱 추천 방문').value.toFixed(2), '15.80')
for (const rows of [androidMetrics, downloadSources, pageViews, versionCrashes, updateSources, impressionSources, conversionSources]) {
  assert.equal(new Set(rows.map(row => row.label)).size, rows.length)
  assert(rows.every(row => Number.isFinite(row.value) && row.value >= 0))
}
assert.equal(iosSnapshots.length, 6)
assert(iosSnapshots.every(row => row.march && row.september && row.change))
console.log('Performance data: Android KPI values/units/averages/change bounds and existing iOS totals/shares verified.')
