<?php
declare(strict_types=1);

// GregorianLunarCalendar SDK utility: result_body

class GregorianLunarCalendarResultBody
{
    public static function call(GregorianLunarCalendarContext $ctx): ?GregorianLunarCalendarResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
