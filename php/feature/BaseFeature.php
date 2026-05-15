<?php
declare(strict_types=1);

// GregorianLunarCalendar SDK base feature

class GregorianLunarCalendarBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(GregorianLunarCalendarContext $ctx, array $options): void {}
    public function PostConstruct(GregorianLunarCalendarContext $ctx): void {}
    public function PostConstructEntity(GregorianLunarCalendarContext $ctx): void {}
    public function SetData(GregorianLunarCalendarContext $ctx): void {}
    public function GetData(GregorianLunarCalendarContext $ctx): void {}
    public function GetMatch(GregorianLunarCalendarContext $ctx): void {}
    public function SetMatch(GregorianLunarCalendarContext $ctx): void {}
    public function PrePoint(GregorianLunarCalendarContext $ctx): void {}
    public function PreSpec(GregorianLunarCalendarContext $ctx): void {}
    public function PreRequest(GregorianLunarCalendarContext $ctx): void {}
    public function PreResponse(GregorianLunarCalendarContext $ctx): void {}
    public function PreResult(GregorianLunarCalendarContext $ctx): void {}
    public function PreDone(GregorianLunarCalendarContext $ctx): void {}
    public function PreUnexpected(GregorianLunarCalendarContext $ctx): void {}
}
