"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'GregorianLunarCalendar',
        slug: "gregorian-lunar-calendar",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://data.weather.gov.hk/weatherAPI",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            lunar_date: {},
        }
    };
    entity = {
        "lunar_date": {
            "fields": [
                {
                    "name": "day",
                    "title": "Day",
                    "type": "`$STRING`",
                    "short": "Lunar day in Chinese"
                },
                {
                    "name": "isLeapMonth",
                    "title": "Is Leap Month",
                    "type": "`$BOOLEAN`",
                    "short": "Indicates if the lunar month is a leap month"
                },
                {
                    "name": "month",
                    "title": "Month",
                    "type": "`$STRING`",
                    "short": "Lunar month in Chinese"
                },
                {
                    "name": "year",
                    "title": "Year",
                    "type": "`$STRING`",
                    "short": "Lunar year in Chinese Heavenly Stems and Earthly Branches"
                },
                {
                    "name": "yearCycle",
                    "title": "Year Cycle",
                    "type": "`$INTEGER`",
                    "short": "Year in the 60-year cycle"
                },
                {
                    "name": "zodiac",
                    "title": "Zodiac",
                    "type": "`$STRING`",
                    "short": "Chinese zodiac animal"
                }
            ],
            "name": "lunar_date",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/opendata/lunardate.php",
                            "segments": [
                                {
                                    "lit": "opendata"
                                },
                                {
                                    "lit": "lunardate.php"
                                }
                            ],
                            "parts": [
                                "opendata",
                                "lunardate.php"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.lunarDate`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "date",
                                        "orig": "date",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "20240101"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "date"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map