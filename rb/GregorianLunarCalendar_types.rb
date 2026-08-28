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
# @!attribute [rw] day
#   @return [String, nil]
#
# @!attribute [rw] isLeapMonth
#   @return [Boolean, nil]
#
# @!attribute [rw] month
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [String, nil]
#
# @!attribute [rw] yearCycle
#   @return [Integer, nil]
#
# @!attribute [rw] zodiac
#   @return [String, nil]
Lunardate = Struct.new(
  :day,
  :isLeapMonth,
  :month,
  :year,
  :yearCycle,
  :zodiac,
  keyword_init: true
)

# Request payload for Lunardate#load.
#
# @!attribute [rw] date
#   @return [String]
LunardateLoadMatch = Struct.new(
  :date,
  keyword_init: true
)

