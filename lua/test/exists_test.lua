-- ProjectName SDK exists test

local sdk = require("gregorian-lunar-calendar_sdk")

describe("GregorianLunarCalendarSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
