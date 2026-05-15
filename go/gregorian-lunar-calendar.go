package voxgiggregorianlunarcalendarsdk

import (
	"github.com/voxgig-sdk/gregorian-lunar-calendar-sdk/core"
	"github.com/voxgig-sdk/gregorian-lunar-calendar-sdk/entity"
	"github.com/voxgig-sdk/gregorian-lunar-calendar-sdk/feature"
	_ "github.com/voxgig-sdk/gregorian-lunar-calendar-sdk/utility"
)

// Type aliases preserve external API.
type GregorianLunarCalendarSDK = core.GregorianLunarCalendarSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type GregorianLunarCalendarEntity = core.GregorianLunarCalendarEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type GregorianLunarCalendarError = core.GregorianLunarCalendarError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewLunardateEntityFunc = func(client *core.GregorianLunarCalendarSDK, entopts map[string]any) core.GregorianLunarCalendarEntity {
		return entity.NewLunardateEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewGregorianLunarCalendarSDK = core.NewGregorianLunarCalendarSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
