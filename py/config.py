# GregorianLunarCalendar SDK configuration


def make_config():
    return {
        "main": {
            "name": "GregorianLunarCalendar",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://data.weather.gov.hk/weatherAPI",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "lunardate": {},
            },
        },
        "entity": {
      "lunardate": {
        "fields": [
          {
            "active": True,
            "name": "gregorian_date",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "lunar_date",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 1,
          },
        ],
        "name": "lunardate",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "20240101",
                      "kind": "query",
                      "name": "date",
                      "orig": "date",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/opendata/lunardate.php",
                "parts": [
                  "opendata",
                  "lunardate.php",
                ],
                "select": {
                  "exist": [
                    "date",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
