# frozen_string_literal: true

# Typed models for the GregorianLunarCalendar SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# LunarDate entity data model.
#
# @!attribute [rw] gregorianDate
#   @return [String]
#
# @!attribute [rw] lunarDate
#   @return [Hash]
LunarDate = Struct.new(
  :gregorianDate,
  :lunarDate,
  keyword_init: true
)

# Request payload for LunarDate#load.
#
# @!attribute [rw] date
#   @return [String]
LunarDateLoadMatch = Struct.new(
  :date,
  keyword_init: true
)

