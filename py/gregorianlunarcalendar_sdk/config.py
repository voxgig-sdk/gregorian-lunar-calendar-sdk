# GregorianLunarCalendar SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "GregorianLunarCalendar",
            "slug": "gregorian-lunar-calendar",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://data.weather.gov.hk/weatherAPI",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "lunar_date": {},
            },
        },
        "entity": {
      "lunar_date": {
        "fields": [
          {
            "name": "day",
            "title": "Day",
            "type": "`$STRING`",
            "short": "Lunar day in Chinese",
          },
          {
            "name": "isLeapMonth",
            "title": "Is Leap Month",
            "type": "`$BOOLEAN`",
            "short": "Indicates if the lunar month is a leap month",
          },
          {
            "name": "month",
            "title": "Month",
            "type": "`$STRING`",
            "short": "Lunar month in Chinese",
          },
          {
            "name": "year",
            "title": "Year",
            "type": "`$STRING`",
            "short": "Lunar year in Chinese Heavenly Stems and Earthly Branches",
          },
          {
            "name": "yearCycle",
            "title": "Year Cycle",
            "type": "`$INTEGER`",
            "short": "Year in the 60-year cycle",
          },
          {
            "name": "zodiac",
            "title": "Zodiac",
            "type": "`$STRING`",
            "short": "Chinese zodiac animal",
          },
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
                    "lit": "opendata",
                  },
                  {
                    "lit": "lunardate.php",
                  },
                ],
                "parts": [
                  "opendata",
                  "lunardate.php",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.lunarDate`",
                },
                "args": {
                  "query": [
                    {
                      "name": "date",
                      "orig": "date",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "20240101",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "date",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
