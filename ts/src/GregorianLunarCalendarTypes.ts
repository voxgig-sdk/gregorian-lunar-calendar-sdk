// Typed models for the GregorianLunarCalendar SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Lunardate {
  day?: string
  isLeapMonth?: boolean
  month?: string
  year?: string
  yearCycle?: number
  zodiac?: string
}

export interface LunardateLoadMatch {
  date: string
}

