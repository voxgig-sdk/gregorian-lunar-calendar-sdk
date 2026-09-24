<?php
declare(strict_types=1);

// Typed models for the GregorianLunarCalendar SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** LunarDate entity data model. */
class LunarDate
{
    public ?string $day = null;
    public ?bool $isLeapMonth = null;
    public ?string $month = null;
    public ?string $year = null;
    public ?int $yearCycle = null;
    public ?string $zodiac = null;
}

/** Request payload for LunarDate#load. */
class LunarDateLoadMatch
{
    public string $date;
}

