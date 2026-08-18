# GregorianLunarCalendar SDK configuration


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
            "name": "day",
            "type": "`$STRING`",
          },
          {
            "name": "isLeapMonth",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "month",
            "type": "`$STRING`",
          },
          {
            "name": "year",
            "type": "`$STRING`",
          },
          {
            "name": "yearCycle",
            "type": "`$INTEGER`",
          },
          {
            "name": "zodiac",
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
                  "res": "`body.lunarDate`",
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
