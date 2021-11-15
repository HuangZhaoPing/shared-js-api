import { fillz, isFunction, isPromise } from './index'

test('fillz', () => {
  expect(fillz(1, 1)).toBe('01')
})

test('isFunction', () => {
  expect(isFunction(1)).toBe(false)
  expect(isFunction(() => {})).toBe(true)
})

test('isPromise', () => {
  expect(isFunction(1)).toBe(false)
  const p = new Promise((resolve, reject) => {})
  expect(isPromise(p)).toBe(true)
})
