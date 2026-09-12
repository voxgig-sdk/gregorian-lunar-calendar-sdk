
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
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
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://data.weather.gov.hk/weatherAPI",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      lunardate: {
      },

    }
  }


  entity = {
    "lunardate": {
      "fields": [
        {
          "name": "day",
          "short": "Lunar day in Chinese",
          "type": "`$STRING`"
        },
        {
          "name": "isLeapMonth",
          "short": "Indicates if the lunar month is a leap month",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "month",
          "short": "Lunar month in Chinese",
          "type": "`$STRING`"
        },
        {
          "name": "year",
          "short": "Lunar year in Chinese Heavenly Stems and Earthly Branches",
          "type": "`$STRING`"
        },
        {
          "name": "yearCycle",
          "short": "Year in the 60-year cycle",
          "type": "`$INTEGER`"
        },
        {
          "name": "zodiac",
          "short": "Chinese zodiac animal",
          "type": "`$STRING`"
        }
      ],
      "name": "lunardate",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "20240101",
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              "select": {
                "exist": [
                  "date"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.lunarDate`"
              },
              "parts": [
                "opendata",
                "lunardate.php"
              ]
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

