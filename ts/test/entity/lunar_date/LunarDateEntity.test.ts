

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"gregorianDate":{"a":true,"fo":"date","h":"Gregorian Date","n":"gregorianDate","r":true,"sh":"The Gregorian date in YYYY-MM-DD format","t":"`$STRING`","key$":"gregorianDate","index$":0},"lunarDate":{"a":true,"h":"Lunar Date","n":"lunarDate","r":true,"sh":"Lunar calendar date information","t":"`$OBJECT`","key$":"lunarDate","index$":1}},"name":"lunar_date","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /opendata/lunardate.php","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"20240101","k":"query","n":"date","or":"date","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/opendata/lunardate.php","q":{"exist":["date"]},"r":{},"s":[{"lit":"opendata"},{"lit":"lunardate.php"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"lunar_date","name__orig":"lunar_date","Name":"LunarDate","name_":"lunar_date","name-":"lunar-date","NAME":"LUNAR_DATE","index$":0}, {"active":true,"entity":"lunar_date","key$":"BasicLunarDateFlow","kind":"basic","name":"BasicLunarDateFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"lunar_date_ref01","srcdatavar":"lunar_date_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-lunar_date_ref01"}}],"index$":0}]}, 'LunarDate', {"GET /opendata/lunardate.php":{"protocol":"http","parameters":[{"name":"date","in":"query","description":"Gregorian date in YYYYMMDD format","required":true,"schema":{"type":"string","pattern":"^[0-9]{8}$","example":"20240101"},"index$":0}]}})
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
  
