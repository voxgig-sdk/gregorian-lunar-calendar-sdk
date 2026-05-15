<?php
declare(strict_types=1);

// GregorianLunarCalendar SDK utility: prepare_body

class GregorianLunarCalendarPrepareBody
{
    public static function call(GregorianLunarCalendarContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
