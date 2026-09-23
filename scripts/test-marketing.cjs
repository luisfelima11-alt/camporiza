const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')
const source = fs.readFileSync(path.join(__dirname, '../app/admin/marketing-content.ts'), 'utf8')
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2018 } }).outputText
const compiled = { exports: {} }
new Function('module', 'exports', js)(compiled, compiled.exports)
const { CONTENT, CHECKS, defaultPlanner, statusFor, validatePlanner } = compiled.exports
const id = CONTENT[0].id
assert.equal(new Set(CONTENT.map(p => p.id)).size, CONTENT.length)
assert.deepEqual(validatePlanner(defaultPlanner()), defaultPlanner())
for (const invalid of [null, [], {}, { unrelated: {} }]) assert.equal(validatePlanner(invalid), null)
for (const [key, value] of [['status', 'invalid'], ['status', 'toString'], ['date', '2026-02-30'], ['date', 'not-a-date'], ['notes', 10], ['notes', 'x'.repeat(5001)], ['checks', ['unknown']], ['approved', 'yes']]) {
  const state = defaultPlanner(); state[id][key] = value
  assert.equal(validatePlanner(state), null, `Should reject invalid ${key}`)
}
const valid = defaultPlanner()
valid[id] = { status: 'publicado', date: '2026-09-03', notes: '<script>literal note</script>', checks: [CHECKS[0], CHECKS[0]], approved: true }
const restored = validatePlanner(JSON.parse(JSON.stringify(valid)))
assert.equal(restored[id].date, '2026-09-03')
assert.equal(restored[id].status, 'publicado')
assert.equal(restored[id].notes, '<script>literal note</script>')
assert.deepEqual(restored[id].checks, [CHECKS[0]])
assert.equal(restored[id].approved, true)
assert.notEqual(defaultPlanner(), defaultPlanner())
assert.equal(CONTENT.filter(p => p.publication).length, 3)
assert.equal(CONTENT.filter(p => p.scheduled).length, 1)
assert.equal(CONTENT.length, 12)
assert.equal(CONTENT.find(p => p.id === '2026-09-26-janela').assets.length, 1)
assert.equal(CONTENT.find(p => p.id === '2026-09-29-planejamento').assets.length, 3)
assert.equal(CONTENT.find(p => p.id === '2026-10-03-tecnologia').assets.length, 1)
assert.equal(CONTENT.find(p => p.id === 'reels-preparo-ao-voo').assetUrl.includes('1oi9kpxQjooUGnj3cawB4oTYjjFFmDNQP'), true)
assert.equal(CONTENT.some(p => p.caption.includes('(67) 9633-0973')), false)
const legacy = defaultPlanner()
legacy['institucional-5mil'].status = 'revisao'
legacy['institucional-5mil'].notes = 'Manter nota existente'
delete legacy['carrossel-o-que-muda']
const migrated = validatePlanner(legacy)
assert.equal(migrated['institucional-5mil'].notes, 'Manter nota existente')
assert.equal(migrated['institucional-5mil'].status, 'revisao')
assert.equal(statusFor(CONTENT.find(p => p.id === 'institucional-5mil'), migrated['institucional-5mil']), 'publicado')
assert.equal(migrated['carrossel-o-que-muda'].status, 'publicado')
assert.equal(typeof migrated['carrossel-o-que-muda'].approved, 'boolean')
const scheduled = CONTENT.find(p => p.id === 'carrossel-solo')
assert.equal(statusFor(scheduled, { ...migrated[scheduled.id], status: 'ideia' }), 'agendado')
assert.equal(statusFor(scheduled, { ...migrated[scheduled.id], status: 'publicado', approved: true }), 'publicado')
assert.equal(scheduled.scheduled.feedDate, '02/09/2026')
assert.equal(scheduled.scheduled.storiesDate, '03/09/2026')
assert.equal(scheduled.scheduled.assets.length, 7)
console.log('Marketing: schema, roundtrip, dates, notes, statuses and checklists passed.')
