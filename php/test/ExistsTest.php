<?php
declare(strict_types=1);

// GregorianLunarCalendar SDK exists test

require_once __DIR__ . '/../gregorianlunarcalendar_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = GregorianLunarCalendarSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
