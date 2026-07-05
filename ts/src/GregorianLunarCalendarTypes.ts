// Typed models for the GregorianLunarCalendar SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Lunardate {
  gregorian_date: string
  lunar_date: Record<string, any>
}

export interface LunardateLoadMatch {
  gregorian_date?: string
  lunar_date?: Record<string, any>
}

