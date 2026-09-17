import { GregorianLunarCalendarEntityBase } from '../GregorianLunarCalendarEntityBase';
import type { GregorianLunarCalendarSDK } from '../GregorianLunarCalendarSDK';
import type { Control } from '../types';
import type { LunarDate, LunarDateLoadMatch } from '../GregorianLunarCalendarTypes';
declare class LunarDateEntity extends GregorianLunarCalendarEntityBase<LunarDate> {
    constructor(client: GregorianLunarCalendarSDK, entopts: any);
    make(this: LunarDateEntity): LunarDateEntity;
    load(this: any, reqmatch?: LunarDateLoadMatch, ctrl?: Control): Promise<LunarDateEntity>;
}
export { LunarDateEntity };
