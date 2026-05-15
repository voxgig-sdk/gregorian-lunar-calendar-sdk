package utility

import "github.com/voxgig-sdk/gregorian-lunar-calendar-sdk/core"

func makeContextUtil(ctxmap map[string]any, basectx *core.Context) *core.Context {
	return core.NewContext(ctxmap, basectx)
}
