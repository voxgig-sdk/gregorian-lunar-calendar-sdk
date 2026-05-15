<?php
declare(strict_types=1);

// GregorianLunarCalendar SDK utility: result_headers

class GregorianLunarCalendarResultHeaders
{
    public static function call(GregorianLunarCalendarContext $ctx): ?GregorianLunarCalendarResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
