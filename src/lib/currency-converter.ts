export function currencyConverter(amount: number): string {
    return (amount / 100).toLocaleString("en-GB", {
            currency: "EUR",
            style: "currency",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
        }
    )
}

export function numberConverter(amount: number): string {
    return (amount).toLocaleString("en-GB", {})
}

export function dateConverter(date: Date): string {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString("en-GB", {})
}
