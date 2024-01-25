const formatter = Intl.NumberFormat('en', { notation: 'compact' });

export function formatNumber(n: number | string): string {
    if (typeof n === 'string') {
        n = +n
        if (!Number.isNaN(n)) return formatter.format(+n)
    }
    return formatter.format(n)
}
