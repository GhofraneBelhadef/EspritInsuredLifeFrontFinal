import { Customer } from "./Customer.model";

export interface Loan {
    idLoan?: number;
    interestRate?: number;
    loanAmount?: number;
    loanTerm?: number;
    status?: string;
    customer?: Customer;
    applicantIncome?: number;
    coapplicantIncome?: number;
    approvalProbability?: number;
    rejectionProbability?: number;
    confidenceScore?: number;
    createdAt?: Date;
    credit?: any;
    riskBreakdown?: any;
    predictionResult?: any;
}