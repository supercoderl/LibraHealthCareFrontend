/**
 * Convert to RMB metastring
 *
 * @param digits When the number type is used, it is allowed to specify the number of digits after the decimal point. 
 * The default is 2 decimal places.
 */

export function yuan(value: number | string, currency: string = '$', digits: number = 2): string {
    if(typeof value === "number")
    {
        value = value.toFixed(digits);
    }

    return `${currency} ${value}`;
}