interface ClientInfo {
    id: string;
    fullName: string;
    dni: string;
    phone: string;
    address: string;
    credits: string[];
}

export interface Client {
    client: ClientInfo;
    totalAmount: number;
    pendingAmount: number;
    monthlyPayment: number;
    nextPayment: string | null;
}
