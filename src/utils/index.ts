const formatter = Intl.NumberFormat('en', { notation: 'compact' });

export function formatNumber(n: number | string): string {
    if (typeof n === 'string') {
        n = +n
        if (!Number.isNaN(n)) return formatter.format(+n)
    }
    return formatter.format(n)
}

export function formatDate(d: Date | string): string {
    if (!(d instanceof Date))
        d = new Date(d)
    const str = d.toLocaleString()
    console.log(str);


    const matched = Array.from(str.match(/(\d+\/\d+\/\d+), (\d+:\d+):\d+( [AP]M)?/) ?? [])
    console.log(matched);

    const date = matched[1]
    const time = matched[2]
    const ampm = matched[3] ?? ''
    return time + ' ' + date + ampm
}

export const numify = (val: unknown): number | undefined => {
    if (typeof val === 'number') return val;
    else if (typeof val === 'string') {
        const parsed = parseFloat(val)
        if (!isNaN(parsed)) return parsed
    }
    return undefined
}

export const boolify = (val: unknown): boolean | undefined => {
    if (typeof val === 'boolean') return val;
    else if (typeof val === 'string') {
        if (val === 'true') return true;
        else if (val === 'false') return false;
    }
    return undefined
}

export const asFormData = (object: { [key: string]: any; }) => Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
}, new FormData());