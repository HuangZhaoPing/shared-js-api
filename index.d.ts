export interface DateConfig {
  offset?: number,
  fmt?: string
}
export declare type ValidateType = 'mobilePhone' | 'email' | 'identityCard'
export declare function getQueryString(name: string | string[], href?: string): string | string[]
export declare function fillz (val: string | number, count?: number): string
export declare function toRawType (val: any): string
export declare function isString (val: any): boolean
export declare function isObject (val: any): boolean
export declare function isArray (val: any): boolean
export declare function isDate (val: any): boolean
export declare function isNumber (val: any): boolean
export declare function isSymbol (val: any): boolean
export declare function isFunction (val: any): boolean
export declare function isPromise (val: any): boolean
export declare function formatDate (val: Date, fmt?: string): string
export declare function formatTime (val: number, fmt?: string): string
export declare function toNumber (val: any): any
export declare function getFirstDateOfMonth ({ offset, fmt }: DateConfig): string | Date
export declare function getLastDateOfMonth ({ offset, fmt }: DateConfig): string | Date
export declare function getRangeDateOfMonth ({ offset, fmt }: DateConfig): Array<string | Date>
export declare function getRangeDateOfWeek ({ offset, fmt }: DateConfig): Array<string | Date>
export declare function getSuffix (val: string, toUpperCase?: boolean): string
export declare function isEmpty (val: any): boolean
export declare function encodeHTML (val: string): string
export declare function decodeHTML (val: string): string
export declare function validate (type: ValidateType, val: string): boolean
