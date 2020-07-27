export default interface ICreateBillDTO {
  name: string;
  description?: string;
  projected_cost?: number;
  due_at?: Date;
}
