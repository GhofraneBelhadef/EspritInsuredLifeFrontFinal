export interface LoanRequest {
    customerId?: number;
    gender?: string;
    married?: number;
    dependents?: number;
    education?: number;
    selfEmployed?: number;
    applicantIncome?: number;
    coapplicantIncome?: number;
    loanAmount?: number;
    loanAmountTerm?: number;
    creditHistory?: number;
    propertyArea?: number;
    loanTerm?: number;
}

export interface LoanPredictionResponse {
    status?: string;
    prediction_result?: 'approved' | 'rejected';
    approval_probability?: number;
    rejection_probability?: number;
    confidence_score?: number;
    applicant_income?: number;
    coapplicant_income?: number;
    message?: string;
}