# GregorianLunarCalendar SDK

Convert any Gregorian date to its Chinese lunar equivalent using Hong Kong Observatory open data

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Gregorian Lunar Calendar

This SDK wraps the Gregorian-Lunar Calendar Conversion service operated by the [Hong Kong Observatory (HKO)](https://www.hko.gov.hk/), Hong Kong's official meteorological and timekeeping authority. The service returns the Chinese lunar date that corresponds to a given Gregorian calendar date.

What you get from the API:

- Look up the Chinese lunar date for a specified Gregorian date via `GET /opendata/lunardate.php?date=YYYY-MM-DD`.
- A single conversion endpoint backed by HKO's published Gregorian-Lunar conversion table.
- Yearly-updated reference data maintained by HKO.

Operational notes: the endpoint is served from `https://data.weather.gov.hk/weatherAPI` and is CORS-enabled, so it can be called directly from browsers. No API key or authentication is required. The conversion table is published in Chinese by HKO and updated on a yearly cadence.

## Try it

**TypeScript**
```bash
npm install gregorian-lunar-calendar
```

**Python**
```bash
pip install gregorian-lunar-calendar-sdk
```

**PHP**
```bash
composer require voxgig/gregorian-lunar-calendar-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/gregorian-lunar-calendar-sdk/go
```

**Ruby**
```bash
gem install gregorian-lunar-calendar-sdk
```

**Lua**
```bash
luarocks install gregorian-lunar-calendar-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { GregorianLunarCalendarSDK } from 'gregorian-lunar-calendar'

const client = new GregorianLunarCalendarSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o gregorian-lunar-calendar-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "gregorian-lunar-calendar": {
      "command": "/abs/path/to/gregorian-lunar-calendar-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Lunardate** | Chinese lunar date corresponding to a supplied Gregorian date, returned by `GET /opendata/lunardate.php?date=YYYY-MM-DD`. | `/opendata/lunardate.php` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from gregorianlunarcalendar_sdk import GregorianLunarCalendarSDK

client = GregorianLunarCalendarSDK({})


# Load a specific lunardate
lunardate, err = client.Lunardate(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'gregorianlunarcalendar_sdk.php';

$client = new GregorianLunarCalendarSDK([]);


// Load a specific lunardate
[$lunardate, $err] = $client->Lunardate(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/gregorian-lunar-calendar-sdk/go"

client := sdk.NewGregorianLunarCalendarSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "GregorianLunarCalendar_sdk"

client = GregorianLunarCalendarSDK.new({})


# Load a specific lunardate
lunardate, err = client.Lunardate(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("gregorian-lunar-calendar_sdk")

local client = sdk.new({})


-- Load a specific lunardate
local lunardate, err = client:Lunardate(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = GregorianLunarCalendarSDK.test()
const result = await client.Lunardate().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = GregorianLunarCalendarSDK.test(None, None)
result, err = client.Lunardate(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = GregorianLunarCalendarSDK::test(null, null);
[$result, $err] = $client->Lunardate(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Lunardate(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = GregorianLunarCalendarSDK.test(nil, nil)
result, err = client.Lunardate(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Lunardate(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Gregorian Lunar Calendar

- Upstream: [https://data.weather.gov.hk/weatherAPI/](https://data.weather.gov.hk/weatherAPI/)
- API docs: [https://www.hko.gov.hk/en/abouthko/opendata_intro.htm](https://www.hko.gov.hk/en/abouthko/opendata_intro.htm)

- Data is published under the Hong Kong Government's Open Data licence terms.
- Attribution to the [Hong Kong Observatory (HKO)](https://www.hko.gov.hk/) is expected when reusing or redistributing the data.
- Refer to the HKO website for the full terms of use covering HKO data and materials.
- The conversion table is updated yearly by HKO.

---

Generated from the Gregorian Lunar Calendar OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
