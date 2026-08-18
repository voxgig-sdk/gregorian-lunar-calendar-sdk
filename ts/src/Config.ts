
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'GregorianLunarCalendar',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$STRING`"
        },
        {
          "name": "isLeapMonth",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "month",
          "type": "`$STRING`"
        },
        {
          "name": "year",
          "type": "`$STRING`"
        },
        {
          "name": "yearCycle",
          "type": "`$INTEGER`"
        },
        {
          "name": "zodiac",
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
              "parts": [
                "opendata",
                "lunardate.php"
              ],
              "select": {
                "exist": [
                  "date"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.lunarDate`"
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
  config
}

