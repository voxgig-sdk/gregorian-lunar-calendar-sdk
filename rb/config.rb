# GregorianLunarCalendar SDK configuration

module GregorianLunarCalendarConfig
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
        "auth" => {
          "prefix" => "Bearer",
        },
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
              "active" => true,
              "name" => "gregorian_date",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "lunar_date",
              "req" => true,
              "type" => "`$OBJECT`",
              "index$" => 1,
            },
          ],
          "name" => "lunardate",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "20240101",
                        "kind" => "query",
                        "name" => "date",
                        "orig" => "date",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
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
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
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
