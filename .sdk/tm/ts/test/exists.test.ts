
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { GregorianLunarCalendarSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await GregorianLunarCalendarSDK.test()
    equal(null !== testsdk, true)
  })

})
