export default interface ICreatePaymentDTO {
  name: string;
  description?: string;
  payment_type_id: number;
  bill_id?: number;
  value: number;
  paid_at: Date;
}
