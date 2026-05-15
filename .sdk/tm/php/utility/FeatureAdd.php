<?php
declare(strict_types=1);

// GregorianLunarCalendar SDK utility: feature_add

class GregorianLunarCalendarFeatureAdd
{
    public static function call(GregorianLunarCalendarContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
