
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'GregorianLunarCalendar',
        slug: "gregorian-lunar-calendar",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://data.weather.gov.hk/weatherAPI",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        lunar_date: {
        },
  
    }
  }


  entity = {
    "lunar_date": {
      "fields": [
        {
          "name": "day",
          "title": "Day",
          "type": "`$STRING`",
          "short": "Lunar day in Chinese"
        },
        {
          "name": "isLeapMonth",
          "title": "Is Leap Month",
          "type": "`$BOOLEAN`",
          "short": "Indicates if the lunar month is a leap month"
        },
        {
          "name": "month",
          "title": "Month",
          "type": "`$STRING`",
          "short": "Lunar month in Chinese"
        },
        {
          "name": "year",
          "title": "Year",
          "type": "`$STRING`",
          "short": "Lunar year in Chinese Heavenly Stems and Earthly Branches"
        },
        {
          "name": "yearCycle",
          "title": "Year Cycle",
          "type": "`$INTEGER`",
          "short": "Year in the 60-year cycle"
        },
        {
          "name": "zodiac",
          "title": "Zodiac",
          "type": "`$STRING`",
          "short": "Chinese zodiac animal"
        }
      ],
      "name": "lunar_date",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/opendata/lunardate.php",
              "segments": [
                {
                  "lit": "opendata"
                },
                {
                  "lit": "lunardate.php"
                }
              ],
              "parts": [
                "opendata",
                "lunardate.php"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.lunarDate`"
              },
              "args": {
                "query": [
                  {
                    "name": "date",
                    "orig": "date",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "20240101"
                  }
                ]
              },
              "select": {
                "exist": [
                  "date"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

