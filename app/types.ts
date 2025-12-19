export interface ILineItem {
  id?: string | number;
  title: string;
  quantity: string;
  rate: string;
}

export interface ICurrentUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
