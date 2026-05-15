<?php
declare(strict_types=1);

// GregorianLunarCalendar SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class GregorianLunarCalendarMakeContext
{
    public static function call(array $ctxmap, ?GregorianLunarCalendarContext $basectx): GregorianLunarCalendarContext
    {
        return new GregorianLunarCalendarContext($ctxmap, $basectx);
    }
}
