"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GregorianLunarCalendarError = void 0;
class GregorianLunarCalendarError extends Error {
    isGregorianLunarCalendarError = true;
    sdk = 'GregorianLunarCalendar';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.GregorianLunarCalendarError = GregorianLunarCalendarError;
//# sourceMappingURL=GregorianLunarCalendarError.js.map