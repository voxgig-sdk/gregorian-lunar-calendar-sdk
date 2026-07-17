-- GregorianLunarCalendar SDK configuration

local function make_config()
  return {
    main = {
      name = "GregorianLunarCalendar",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["active"] = true,
            ["name"] = "gregorian_date",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "lunar_date",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
            ["index$"] = 1,
          },
        },
        ["name"] = "lunardate",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["example"] = "20240101",
                      ["kind"] = "query",
                      ["name"] = "date",
                      ["orig"] = "date",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
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
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
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
