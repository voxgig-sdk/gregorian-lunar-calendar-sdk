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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "name": "day",
            "short": "Lunar day in Chinese",
            "type": "`$STRING`",
          },
          {
            "name": "isLeapMonth",
            "short": "Indicates if the lunar month is a leap month",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "month",
            "short": "Lunar month in Chinese",
            "type": "`$STRING`",
          },
          {
            "name": "year",
            "short": "Lunar year in Chinese Heavenly Stems and Earthly Branches",
            "type": "`$STRING`",
          },
          {
            "name": "yearCycle",
            "short": "Year in the 60-year cycle",
            "type": "`$INTEGER`",
          },
          {
            "name": "zodiac",
            "short": "Chinese zodiac animal",
            "type": "`$STRING`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "date",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.lunarDate`",
                },
                "parts": [
                  "opendata",
                  "lunardate.php",
                ],
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
