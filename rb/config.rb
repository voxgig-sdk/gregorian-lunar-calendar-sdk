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
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://data.weather.gov.hk/weatherAPI",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "lunardate" => {},
        },
      },
      "entity" => {
        "lunardate" => {
          "fields" => [
            {
              "name" => "day",
              "type" => "`$STRING`",
            },
            {
              "name" => "isLeapMonth",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "month",
              "type" => "`$STRING`",
            },
            {
              "name" => "year",
              "type" => "`$STRING`",
            },
            {
              "name" => "yearCycle",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "zodiac",
              "type" => "`$STRING`",
            },
          ],
          "name" => "lunardate",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "20240101",
                        "kind" => "query",
                        "name" => "date",
                        "orig" => "date",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/opendata/lunardate.php",
                  "parts" => [
                    "opendata",
                    "lunardate.php",
                  ],
                  "select" => {
                    "exist" => [
                      "date",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.lunarDate`",
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
