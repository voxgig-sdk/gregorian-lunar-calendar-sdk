import { LunarDateEntity } from './entity/LunarDateEntity';
export type * from './GregorianLunarCalendarTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { GregorianLunarCalendarEntityBase } from './GregorianLunarCalendarEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class GregorianLunarCalendarSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    LunarDate(entopts?: Record<string, any>): LunarDateEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): GregorianLunarCalendarSDK;
    tester(testopts?: any, sdkopts?: any): GregorianLunarCalendarSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof GregorianLunarCalendarSDK;
export { stdutil, config, BaseFeature, GregorianLunarCalendarEntityBase, GregorianLunarCalendarSDK, SDK, };
export type { DirectResult };
