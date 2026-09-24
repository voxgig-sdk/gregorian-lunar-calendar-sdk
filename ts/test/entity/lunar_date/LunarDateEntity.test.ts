

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { GregorianLunarCalendarSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('LunarDateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GREGORIAN_LUNAR_CALENDAR_TEST_LIVE=TRUE.
  afterEach(liveDelay('GREGORIAN_LUNAR_CALENDAR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GregorianLunarCalendarSDK.test()
    const ent = testsdk.LunarDate()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GREGORIAN_LUNAR_CALENDAR_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'lunar_date.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"day":{"a":true,"h":"Day","n":"day","r":false,"sh":"Lunar day in Chinese","t":"`$STRING`","key$":"day","index$":0},"isLeapMonth":{"a":true,"h":"Is Leap Month","n":"isLeapMonth","r":false,"sh":"Indicates if the lunar month is a leap month","t":"`$BOOLEAN`","key$":"isLeapMonth","index$":1},"month":{"a":true,"h":"Month","n":"month","r":false,"sh":"Lunar month in Chinese","t":"`$STRING`","key$":"month","index$":2},"year":{"a":true,"h":"Year","n":"year","r":false,"sh":"Lunar year in Chinese Heavenly Stems and Earthly Branches","t":"`$STRING`","key$":"year","index$":3},"yearCycle":{"a":true,"h":"Year Cycle","n":"yearCycle","r":false,"sh":"Year in the 60-year cycle","t":"`$INTEGER`","key$":"yearCycle","index$":4},"zodiac":{"a":true,"h":"Zodiac","n":"zodiac","r":false,"sh":"Chinese zodiac animal","t":"`$STRING`","key$":"zodiac","index$":5}},"name":"lunar_date","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /opendata/lunardate.php","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"20240101","k":"query","n":"date","or":"date","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/opendata/lunardate.php","q":{"exist":["date"]},"r":{},"s":[{"lit":"opendata"},{"lit":"lunardate.php"}],"t":{"req":"`reqdata`","res":"`body.lunarDate`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"lunar_date","name__orig":"lunar_date","Name":"LunarDate","name_":"lunar_date","name-":"lunar-date","NAME":"LUNAR_DATE","index$":0}, {"active":true,"entity":"lunar_date","key$":"BasicLunarDateFlow","kind":"basic","name":"BasicLunarDateFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"lunar_date_ref01","srcdatavar":"lunar_date_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-lunar_date_ref01"}}],"index$":0}]}, 'LunarDate', {"GET /opendata/lunardate.php":{"protocol":"http","operationId":"getLunarDate","responses":{"200":{"description":"Successful response with Lunar date information","content":{"application/json":{"schema":{"type":"object","description":"Response containing Gregorian to Lunar date conversion","properties":{"gregorianDate":{"description":"The Gregorian date in YYYY-MM-DD format","example":"2024-01-01","format":"date","key$":"gregorianDate","type":"string"},"lunarDate":{"description":"Lunar calendar date information","key$":"lunarDate","properties":{"day":{"description":"Lunar day in Chinese","example":"二十","type":"string","key$":"day"},"isLeapMonth":{"description":"Indicates if the lunar month is a leap month","example":false,"type":"boolean","key$":"isLeapMonth"},"month":{"description":"Lunar month in Chinese","example":"十一月","type":"string","key$":"month"},"year":{"description":"Lunar year in Chinese Heavenly Stems and Earthly Branches","example":"癸卯","type":"string","key$":"year"},"yearCycle":{"description":"Year in the 60-year cycle","example":40,"type":"integer","key$":"yearCycle"},"zodiac":{"description":"Chinese zodiac animal","example":"兔","type":"string","key$":"zodiac"}},"type":"object","index$":0}},"required":["gregorianDate","lunarDate"],"x-ref":"#/components/schemas/LunarDateResponse"},"example":{"gregorianDate":"2024-01-01","lunarDate":{"year":"癸卯","month":"十一月","day":"二十","yearCycle":40,"zodiac":"兔"}}}}},"400":{"description":"Bad Request - Invalid date format","content":{"application/json":{"schema":{"type":"object","description":"Error response","properties":{"error":{"type":"string","description":"Error code or type","example":"Invalid request"},"message":{"type":"string","description":"Detailed error message","example":"The requested parameter is invalid"}},"required":["error","message"],"x-ref":"#/components/schemas/Error"},"example":{"error":"Invalid date format","message":"Date must be in YYYYMMDD format"}}}},"404":{"description":"Not Found - Date not available in conversion table","content":{"application/json":{"schema":{"type":"object","description":"Error response","properties":{"error":{"type":"string","description":"Error code or type","example":"Invalid request"},"message":{"type":"string","description":"Detailed error message","example":"The requested parameter is invalid"}},"required":["error","message"],"x-ref":"#/components/schemas/Error"},"example":{"error":"Date not found","message":"The requested date is not available in the conversion table"}}}},"500":{"description":"Internal Server Error","content":{"application/json":{"schema":{"type":"object","description":"Error response","properties":{"error":{"type":"string","description":"Error code or type","example":"Invalid request"},"message":{"type":"string","description":"Detailed error message","example":"The requested parameter is invalid"}},"required":["error","message"],"x-ref":"#/components/schemas/Error"},"example":{"error":"Internal server error","message":"An unexpected error occurred"}}}}},"parameters":[{"name":"date","in":"query","description":"Gregorian date in YYYYMMDD format","required":true,"schema":{"type":"string","pattern":"^[0-9]{8}$","example":"20240101"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let lunar_date_ref01_data = Object.values(setup.data.existing.lunar_date)[0] as any

    // LOAD
    const lunar_date_ref01_ent = client.LunarDate()
    const lunar_date_ref01_match_dt0: any = {}
    const lunar_date_ref01_data_dt0 = (await lunar_date_ref01_ent.load(lunar_date_ref01_match_dt0)).data()
    assert(null != lunar_date_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/lunar_date/LunarDateTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = GregorianLunarCalendarSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['lunar_date01','lunar_date02','lunar_date03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GREGORIAN_LUNAR_CALENDAR_TEST_LUNAR_DATE_ENTID': idmap,
    'GREGORIAN_LUNAR_CALENDAR_TEST_LIVE': 'FALSE',
    'GREGORIAN_LUNAR_CALENDAR_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['GREGORIAN_LUNAR_CALENDAR_TEST_LUNAR_DATE_ENTID']

  const live = 'TRUE' === env.GREGORIAN_LUNAR_CALENDAR_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GREGORIAN_LUNAR_CALENDAR_TEST_LUNAR_DATE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new GregorianLunarCalendarSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.GREGORIAN_LUNAR_CALENDAR_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
