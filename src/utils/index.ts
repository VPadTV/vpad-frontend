const formatter = Intl.NumberFormat('en', { notation: 'compact' });

export function formatNumber(n: number | string): string {
    if (typeof n === 'string') {
        n = +n
        if (!Number.isNaN(n)) return formatter.format(+n)
    }
    return formatter.format(n)
}

export const numify = (val: unknown): number | undefined => {
    if (typeof val === 'number') return val;
    else if (typeof val === 'string') {
        const parsed = parseFloat(val)
        if (!isNaN(parsed)) return parsed
    }
    return undefined
}