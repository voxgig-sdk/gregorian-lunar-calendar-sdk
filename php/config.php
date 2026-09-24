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
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://data.weather.gov.hk/weatherAPI",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "lunar_date" => [],
                ],
            ],
            "entity" => [
        'lunar_date' => [
          'fields' => [
            [
              'name' => 'day',
              'title' => 'Day',
              'type' => '`$STRING`',
              'short' => 'Lunar day in Chinese',
            ],
            [
              'name' => 'isLeapMonth',
              'title' => 'Is Leap Month',
              'type' => '`$BOOLEAN`',
              'short' => 'Indicates if the lunar month is a leap month',
            ],
            [
              'name' => 'month',
              'title' => 'Month',
              'type' => '`$STRING`',
              'short' => 'Lunar month in Chinese',
            ],
            [
              'name' => 'year',
              'title' => 'Year',
              'type' => '`$STRING`',
              'short' => 'Lunar year in Chinese Heavenly Stems and Earthly Branches',
            ],
            [
              'name' => 'yearCycle',
              'title' => 'Year Cycle',
              'type' => '`$INTEGER`',
              'short' => 'Year in the 60-year cycle',
            ],
            [
              'name' => 'zodiac',
              'title' => 'Zodiac',
              'type' => '`$STRING`',
              'short' => 'Chinese zodiac animal',
            ],
          ],
          'name' => 'lunar_date',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
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
                  'parts' => [
                    'opendata',
                    'lunardate.php',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.lunarDate`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'date',
                        'orig' => 'date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => '20240101',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'date',
                    ],
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
