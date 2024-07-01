import {VariableAssert} from "./variable-assert";

export class ParseHelper {
    private static readonly booleanVal: Map<string, boolean> = new Map([["true", true], ["false", false]]);
    private static readonly notNullOrUndefinedMessage: string = "Value must not be null";

    public static parseBoolean(val: any): boolean {
        VariableAssert.notNullOrUndefined(val, this.notNullOrUndefinedMessage);

        const actVal: boolean | undefined = this.booleanVal.get(<string>val);

        VariableAssert.notNullOrUndefined(actVal, "Error occurred while parsing boolean");

        return Boolean(actVal);
    }

    public static parseString(val: any): string {
        VariableAssert.notNullOrUndefined(val, this.notNullOrUndefinedMessage);

        return String(val);
    }

    public static parseNumber(val: any): number {
        VariableAssert.notNullOrUndefined(val, this.notNullOrUndefinedMessage);
        VariableAssert.isNumber(val);

        return Number(val);
    }
}