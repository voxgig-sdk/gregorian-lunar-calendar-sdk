# frozen_string_literal: true

# Typed models for the GregorianLunarCalendar SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Lunardate entity data model.
#
# @!attribute [rw] gregorian_date
#   @return [String]
#
# @!attribute [rw] lunar_date
#   @return [Hash]
Lunardate = Struct.new(
  :gregorian_date,
  :lunar_date,
  keyword_init: true
)

# Request payload for Lunardate#load.
#
# @!attribute [rw] gregorian_date
#   @return [String, nil]
#
# @!attribute [rw] lunar_date
#   @return [Hash, nil]
LunardateLoadMatch = Struct.new(
  :gregorian_date,
  :lunar_date,
  keyword_init: true
)

