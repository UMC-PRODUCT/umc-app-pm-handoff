import assert from 'node:assert/strict'
import { androidMetrics, downloadSources, downloadTotal, downloadShare, pageViews, iosSnapshots, versionCrashes } from '../src/modules/performance.js'

assert.equal(downloadTotal, 1070, 'Download sum must match the four numeric source rows')
assert.equal(downloadShare(773), '72.2')
assert.equal(downloadShare(0), '0.0')
assert.equal(downloadSources.reduce((sum, row) => sum + Number(downloadShare(row.value)), 0), 100)
for (const rows of [androidMetrics, downloadSources, pageViews, versionCrashes]) {
  assert.equal(new Set(rows.map(row => row.label)).size, rows.length)
  assert(rows.every(row => Number.isFinite(row.value) && row.value >= 0))
}
assert.equal(iosSnapshots.length, 6)
assert(iosSnapshots.every(row => row.march && row.september && row.change))
console.log('Performance data: totals, shares, chart values and snapshot fields verified.')
