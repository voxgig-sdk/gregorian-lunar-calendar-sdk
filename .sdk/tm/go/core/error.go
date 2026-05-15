package core

type GregorianLunarCalendarError struct {
	IsGregorianLunarCalendarError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewGregorianLunarCalendarError(code string, msg string, ctx *Context) *GregorianLunarCalendarError {
	return &GregorianLunarCalendarError{
		IsGregorianLunarCalendarError: true,
		Sdk:              "GregorianLunarCalendar",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *GregorianLunarCalendarError) Error() string {
	return e.Msg
}
