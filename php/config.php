<?php
declare(strict_types=1);

// GregorianLunarCalendar SDK configuration

class GregorianLunarCalendarConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "GregorianLunarCalendar",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://data.weather.gov.hk/weatherAPI",
                "auth" => [
                    "prefix" => "Bearer",
                ],
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
              'name' => 'gregorian_date',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'lunar_date',
              'req' => true,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 1,
            ],
          ],
          'name' => 'lunardate',
          'op' => [
            'load' => [
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
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/opendata/lunardate.php',
                  'parts' => [
                    'opendata',
                    'lunardate.php',
                  ],
                  'select' => [
                    'exist' => [
                      'date',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
