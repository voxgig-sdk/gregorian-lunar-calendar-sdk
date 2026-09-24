
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { GregorianLunarCalendarSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = GregorianLunarCalendarSDK.test()
    equal(testsdk instanceof GregorianLunarCalendarSDK, true,
      'GregorianLunarCalendarSDK.test() must return a client synchronously')
  })

})
