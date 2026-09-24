# GregorianLunarCalendar SDK configuration

module GregorianLunarCalendarConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "GregorianLunarCalendar",
        "slug" => "gregorian-lunar-calendar",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://data.weather.gov.hk/weatherAPI",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "lunar_date" => {},
        },
      },
      "entity" => {
        "lunar_date" => {
          "fields" => [
            {
              "name" => "day",
              "title" => "Day",
              "type" => "`$STRING`",
              "short" => "Lunar day in Chinese",
            },
            {
              "name" => "isLeapMonth",
              "title" => "Is Leap Month",
              "type" => "`$BOOLEAN`",
              "short" => "Indicates if the lunar month is a leap month",
            },
            {
              "name" => "month",
              "title" => "Month",
              "type" => "`$STRING`",
              "short" => "Lunar month in Chinese",
            },
            {
              "name" => "year",
              "title" => "Year",
              "type" => "`$STRING`",
              "short" => "Lunar year in Chinese Heavenly Stems and Earthly Branches",
            },
            {
              "name" => "yearCycle",
              "title" => "Year Cycle",
              "type" => "`$INTEGER`",
              "short" => "Year in the 60-year cycle",
            },
            {
              "name" => "zodiac",
              "title" => "Zodiac",
              "type" => "`$STRING`",
              "short" => "Chinese zodiac animal",
            },
          ],
          "name" => "lunar_date",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/opendata/lunardate.php",
                  "segments" => [
                    {
                      "lit" => "opendata",
                    },
                    {
                      "lit" => "lunardate.php",
                    },
                  ],
                  "parts" => [
                    "opendata",
                    "lunardate.php",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.lunarDate`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "20240101",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "date",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    GregorianLunarCalendarFeatures.make_feature(name)
  end
end
