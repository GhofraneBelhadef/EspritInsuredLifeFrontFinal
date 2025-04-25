export interface Contract {
  contract_id?: number;
  insurrance_type: 'Life_Insurance' | 'Non_lifeinsurance';
  insuredAge: number;
  category_contract: 'Employee' | 'Worker' | 'Business';
  Policy_inception_date: string; // format ISO
  expiration_date: string; // format ISO
  monthly_price: number;
  status: 'Active' | 'Expired' | 'Resillied';
}