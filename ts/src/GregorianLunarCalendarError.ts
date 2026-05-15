
import { Context } from './Context'


class GregorianLunarCalendarError extends Error {

  isGregorianLunarCalendarError = true

  sdk = 'GregorianLunarCalendar'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  GregorianLunarCalendarError
}

