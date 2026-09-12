<?php
declare(strict_types=1);

// GregorianLunarCalendar SDK configuration

class GregorianLunarCalendarConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "GregorianLunarCalendar",
                "slug" => "gregorian-lunar-calendar",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://data.weather.gov.hk/weatherAPI",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "lunardate" => [],
                ],
            ],
            "entity" => [
        'lunardate' => [
          'fields' => [
            [
              'name' => 'day',
              'short' => 'Lunar day in Chinese',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'isLeapMonth',
              'short' => 'Indicates if the lunar month is a leap month',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'month',
              'short' => 'Lunar month in Chinese',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'year',
              'short' => 'Lunar year in Chinese Heavenly Stems and Earthly Branches',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'yearCycle',
              'short' => 'Year in the 60-year cycle',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'zodiac',
              'short' => 'Chinese zodiac animal',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'lunardate',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '20240101',
                        'kind' => 'query',
                        'name' => 'date',
                        'orig' => 'date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/opendata/lunardate.php',
                  'segments' => [
                    [
                      'lit' => 'opendata',
                    ],
                    [
                      'lit' => 'lunardate.php',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'date',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.lunarDate`',
                  ],
                  'parts' => [
                    'opendata',
                    'lunardate.php',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return GregorianLunarCalendarFeatures::make_feature($name);
    }
}
