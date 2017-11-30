import test from 'ava'
import concat from '../src'

test('null or undefined', t => {
  t.throws(() => {
    concat(null, [])
  })

  t.throws(() => {
    concat(undefined, [])
  })
})

const map = arr => arr.map(x => ({a: x}))

;[
  [
    'non array, default equal',
    [
      1,
      [1, 2],
      3
    ],
    [1, 2, 3]
  ],
  [
    'non array, default equal, not strict matched items',
    [
      Object(1),
      [1, 2],
      3
    ],
    [Object(1), 1, 2, 3]
  ],
  [
    'non array, loose equal',
    [
      Object(1),
      [1, 2],
      3
    ],
    [1, 2, 3],
    (a, b) => a == b
  ],
  [
    'array concat non array, no exceed max',
    [
      [1, 2, 3],
      3,
      4
    ],
    [1, 2, 3, 4]
  ],
  [
    'array concat non array, exceed max',
    [
      [1, 2, 3],
      2,
      3
    ],
    [1, 2, 3, 2, 3]
  ],
  [
    'array concat array, no exceed max',
    [
      [1, 2, 3],
      [2, 3, 4]
    ],
    [1, 2, 3, 4]
  ],
  [
    'array concat array, exceed max',
    [
      [1, 2, 3],
      [1, 2]
    ],
    [1, 2, 3, 1, 2]
  ],
  [
    'complex',
    [
      map([1, 2, 3]),
      map([3, 5])
    ],
    map([1, 2, 3, 5]),
    (a, b) => a.a === b.a
  ],
  [
    'single item',
    [
      [1, 2, 3]
    ],
    [1, 2, 3]
  ]

].forEach(([d, args, expect, equal]) => {
  test(d, t => {
    const result = equal
      ? concat.factory({equal})(...args)
      : concat(...args)

    t.deepEqual(result, expect)
  })
})
