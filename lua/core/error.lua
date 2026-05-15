-- GregorianLunarCalendar SDK error

local GregorianLunarCalendarError = {}
GregorianLunarCalendarError.__index = GregorianLunarCalendarError


function GregorianLunarCalendarError.new(code, msg, ctx)
  local self = setmetatable({}, GregorianLunarCalendarError)
  self.is_sdk_error = true
  self.sdk = "GregorianLunarCalendar"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function GregorianLunarCalendarError:error()
  return self.msg
end


function GregorianLunarCalendarError:__tostring()
  return self.msg
end


return GregorianLunarCalendarError
