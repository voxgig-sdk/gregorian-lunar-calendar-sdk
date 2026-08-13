-- Typed models for the GregorianLunarCalendar SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Lunardate
---@field day? string
---@field isLeapMonth? boolean
---@field month? string
---@field year? string
---@field yearCycle? number
---@field zodiac? string

---@class LunardateLoadMatch
---@field day? string
---@field isLeapMonth? boolean
---@field month? string
---@field year? string
---@field yearCycle? number
---@field zodiac? string

local M = {}

return M
