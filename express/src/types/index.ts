interface Common {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Result {
  status: 'success' | 'error';
  message?: string;
  data?: any;
}

export interface User extends Common {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

export interface Claim extends Common {
  status: ClaimStatus;
  type: string;
  userId: number;
  user: User;
  description: string;
  incidentDate: Date;
  incidentLocation?: string;
  reportedDate: Date;
}

export enum ClaimStatus {
  PENDING = 'PENDING',
  OPEN = 'OPEN',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CLOSED = 'CLOSED',
  PAID = 'PAID'
}