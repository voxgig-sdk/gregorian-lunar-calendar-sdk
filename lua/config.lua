-- GregorianLunarCalendar SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "GregorianLunarCalendar",
      slug = "gregorian-lunar-calendar",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://data.weather.gov.hk/weatherAPI",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["lunardate"] = {},
      },
    },
    entity = {
      ["lunardate"] = {
        ["fields"] = {
          {
            ["name"] = "day",
            ["short"] = "Lunar day in Chinese",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "isLeapMonth",
            ["short"] = "Indicates if the lunar month is a leap month",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "month",
            ["short"] = "Lunar month in Chinese",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "year",
            ["short"] = "Lunar year in Chinese Heavenly Stems and Earthly Branches",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "yearCycle",
            ["short"] = "Year in the 60-year cycle",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "zodiac",
            ["short"] = "Chinese zodiac animal",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "lunardate",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "20240101",
                      ["kind"] = "query",
                      ["name"] = "date",
                      ["orig"] = "date",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/opendata/lunardate.php",
                ["parts"] = {
                  "opendata",
                  "lunardate.php",
                },
                ["select"] = {
                  ["exist"] = {
                    "date",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.lunarDate`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
