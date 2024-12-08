export interface Client {
    name: string;
    monthlyQuota: number;
    totalDebt: number;
    nextPayment: string;
    rate: number;
}
