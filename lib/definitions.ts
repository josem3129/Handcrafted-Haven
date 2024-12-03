
export type listingTable = {
  id: string;
  user_id: string;
  name: string;
  title: string;
  amount: number;
  email: string;
  image_url: string;
  product_description: string;
  date: string;
};
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  tear: string;
};

export type SessionPayload ={
  
  name: string
  tear:string
  expiresAt: object
}