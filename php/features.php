<?php
declare(strict_types=1);

// GregorianLunarCalendar SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class GregorianLunarCalendarFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new GregorianLunarCalendarBaseFeature();
            case "test":
                return new GregorianLunarCalendarTestFeature();
            default:
                return new GregorianLunarCalendarBaseFeature();
        }
    }
}
