package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/gregorian-lunar-calendar-sdk"
	"github.com/voxgig-sdk/gregorian-lunar-calendar-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestLunardateEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Lunardate(nil)
		if ent == nil {
			t.Fatal("expected non-nil LunardateEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := lunardateBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "lunardate." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set GREGORIANLUNARCALENDAR_TEST_LUNARDATE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		lunardateRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.lunardate", setup.data)))
		var lunardateRef01Data map[string]any
		if len(lunardateRef01DataRaw) > 0 {
			lunardateRef01Data = core.ToMapAny(lunardateRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = lunardateRef01Data

		// LOAD
		lunardateRef01Ent := client.Lunardate(nil)
		lunardateRef01MatchDt0 := map[string]any{}
		lunardateRef01DataDt0Loaded, err := lunardateRef01Ent.Load(lunardateRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if lunardateRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func lunardateBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "lunardate", "LunardateTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read lunardate test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse lunardate test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"lunardate01", "lunardate02", "lunardate03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("GREGORIANLUNARCALENDAR_TEST_LUNARDATE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GREGORIANLUNARCALENDAR_TEST_LUNARDATE_ENTID": idmap,
		"GREGORIANLUNARCALENDAR_TEST_LIVE":      "FALSE",
		"GREGORIANLUNARCALENDAR_TEST_EXPLAIN":   "FALSE",
		"GREGORIANLUNARCALENDAR_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["GREGORIANLUNARCALENDAR_TEST_LUNARDATE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["GREGORIANLUNARCALENDAR_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["GREGORIANLUNARCALENDAR_APIKEY"],
			},
			extra,
		})
		client = sdk.NewGregorianLunarCalendarSDK(core.ToMapAny(mergedOpts))
	}

	live := env["GREGORIANLUNARCALENDAR_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["GREGORIANLUNARCALENDAR_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
