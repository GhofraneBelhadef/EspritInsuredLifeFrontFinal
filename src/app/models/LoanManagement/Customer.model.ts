export interface Customer {
    idCustomer?: number;  // Make ID optional
    gender: string;
    maritalStatus: string;
    dependent: number;
    income: number;
    creditHistory: number;
    loans?: any[];  // Make loans optional
}