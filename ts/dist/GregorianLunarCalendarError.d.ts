import { Context } from './Context';
declare class GregorianLunarCalendarError extends Error {
    isGregorianLunarCalendarError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { GregorianLunarCalendarError };
