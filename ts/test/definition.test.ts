import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "lunar_date",
    "accessor": "LunarDate",
    "op": "load",
    "method": "GET",
    "path": "/opendata/lunardate.php",
    "args": [],
    "select": {
      "date": "20240101"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "date"
    ],
    "queryArgs": [
      {
        "name": "date",
        "wire": "date"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "gregorianDate": "2024-01-01",
      "lunarDate": {
        "year": "癸卯",
        "month": "十一月",
        "day": "二十",
        "yearCycle": 40,
        "zodiac": "兔"
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
