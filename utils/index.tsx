let iv: any;
let cipherText;
export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export function camalize(str: string) {
    return str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

export function overFlowText(str: string, num: number) {
    const length = str.length
    if (num < length) {
        const partString = str.slice(0, num);
        return `${partString}....`
    }
    return str;

}

export const checkSubset = (parentArray: string[], subsetArray: []) => {
    if (parentArray.length == 0 && subsetArray.length == 0) {
        return false
    }
    return subsetArray.every((el) => {
        return parentArray.includes(el)
    })
    return false
}
export const booleanCheck = (check: any) => {
    if (typeof check == "string") {
        if (check == 'true')
            return true
        return false
    } else if (typeof check == "number") {
        return Boolean(check)
    } else {
        return check
    }
}
