

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"day","req":false,"short":"Lunar day in Chinese","type":"`$STRING`","index$":0},{"active":true,"name":"isLeapMonth","req":false,"short":"Indicates if the lunar month is a leap month","type":"`$BOOLEAN`","index$":1},{"active":true,"name":"month","req":false,"short":"Lunar month in Chinese","type":"`$STRING`","index$":2},{"active":true,"name":"year","req":false,"short":"Lunar year in Chinese Heavenly Stems and Earthly Branches","type":"`$STRING`","index$":3},{"active":true,"name":"yearCycle","req":false,"short":"Year in the 60-year cycle","type":"`$INTEGER`","index$":4},{"active":true,"name":"zodiac","req":false,"short":"Chinese zodiac animal","type":"`$STRING`","index$":5}],"name":"lunar_date","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"20240101","kind":"query","name":"date","orig":"date","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /opendata/lunardate.php","json":"{\"operationId\":\"getLunarDate\",\"parameters\":[{\"description\":\"Gregorian date in YYYYMMDD format\",\"in\":\"query\",\"name\":\"date\",\"required\":true,\"schema\":{\"example\":\"20240101\",\"pattern\":\"^[0-9]{8}$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"gregorianDate\":\"2024-01-01\",\"lunarDate\":{\"day\":\"二十\",\"month\":\"十一月\",\"year\":\"癸卯\",\"yearCycle\":40,\"zodiac\":\"兔\"}},\"schema\":{\"description\":\"Response containing Gregorian to Lunar date conversion\",\"properties\":{\"gregorianDate\":{\"description\":\"The Gregorian date in YYYY-MM-DD format\",\"example\":\"2024-01-01\",\"format\":\"date\",\"type\":\"string\"},\"lunarDate\":{\"description\":\"Lunar calendar date information\",\"properties\":{\"day\":{\"description\":\"Lunar day in Chinese\",\"example\":\"二十\",\"type\":\"string\"},\"isLeapMonth\":{\"description\":\"Indicates if the lunar month is a leap month\",\"example\":false,\"type\":\"boolean\"},\"month\":{\"description\":\"Lunar month in Chinese\",\"example\":\"十一月\",\"type\":\"string\"},\"year\":{\"description\":\"Lunar year in Chinese Heavenly Stems and Earthly Branches\",\"example\":\"癸卯\",\"type\":\"string\"},\"yearCycle\":{\"description\":\"Year in the 60-year cycle\",\"example\":40,\"type\":\"integer\"},\"zodiac\":{\"description\":\"Chinese zodiac animal\",\"example\":\"兔\",\"type\":\"string\"}},\"type\":\"object\"}},\"required\":[\"gregorianDate\",\"lunarDate\"],\"type\":\"object\"}}},\"description\":\"Successful response with Lunar date information\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Invalid date format\",\"message\":\"Date must be in YYYYMMDD format\"},\"schema\":{\"description\":\"Error response\",\"properties\":{\"error\":{\"description\":\"Error code or type\",\"example\":\"Invalid request\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error message\",\"example\":\"The requested parameter is invalid\",\"type\":\"string\"}},\"required\":[\"error\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request - Invalid date format\"},\"404\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Date not found\",\"message\":\"The requested date is not available in the conversion table\"},\"schema\":{\"description\":\"Error response\",\"properties\":{\"error\":{\"description\":\"Error code or type\",\"example\":\"Invalid request\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error message\",\"example\":\"The requested parameter is invalid\",\"type\":\"string\"}},\"required\":[\"error\",\"message\"],\"type\":\"object\"}}},\"description\":\"Not Found - Date not available in conversion table\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Internal server error\",\"message\":\"An unexpected error occurred\"},\"schema\":{\"description\":\"Error response\",\"properties\":{\"error\":{\"description\":\"Error code or type\",\"example\":\"Invalid request\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error message\",\"example\":\"The requested parameter is invalid\",\"type\":\"string\"}},\"required\":[\"error\",\"message\"],\"type\":\"object\"}}},\"description\":\"Internal Server Error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/opendata/lunardate.php","segments":[{"lit":"opendata"},{"lit":"lunardate.php"}],"select":{"exist":["date"]},"transform":{"req":"`reqdata`","res":"`body.lunarDate`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"lunar_date","name__orig":"lunar_date","Name":"LunarDate","name_":"lunar_date","name-":"lunar-date","NAME":"LUNAR_DATE","index$":0}, {"active":true,"entity":"lunar_date","key$":"BasicLunarDateFlow","kind":"basic","name":"BasicLunarDateFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"lunar_date_ref01","srcdatavar":"lunar_date_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-lunar_date_ref01"}}],"index$":0}]}, 'LunarDate')
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
  
