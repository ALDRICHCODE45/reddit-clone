export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  imageUrl?: string | null | undefined;
  userName?: string | null | undefined;
}
