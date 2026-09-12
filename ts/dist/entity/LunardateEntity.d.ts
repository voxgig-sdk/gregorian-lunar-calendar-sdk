import { GregorianLunarCalendarEntityBase } from '../GregorianLunarCalendarEntityBase';
import type { GregorianLunarCalendarSDK } from '../GregorianLunarCalendarSDK';
import type { Control } from '../types';
import type { Lunardate, LunardateLoadMatch } from '../GregorianLunarCalendarTypes';
declare class LunardateEntity extends GregorianLunarCalendarEntityBase<Lunardate> {
    constructor(client: GregorianLunarCalendarSDK, entopts: any);
    make(this: LunardateEntity): LunardateEntity;
    load(this: any, reqmatch?: LunardateLoadMatch, ctrl?: Control): Promise<LunardateEntity>;
}
export { LunardateEntity };
