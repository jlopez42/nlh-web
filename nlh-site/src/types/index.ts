export type UserRole = 'administrator' | 'customer' | 'provider';

export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  quantity: number;
  floor: string;
  materiality: string;
  surface: number;
  enclosure: string;
  principal1: string;
  principal2: string;
  professionals: string[];
  specialists: string[];
  contact: string;
  additionalInfo: string;
  userId: string;
  licenseId: string;
  status: 'active' | 'completed' | 'pending';
  createdAt: Date;
  updatedAt: Date;
  publicationDate: Date;
  startDate: Date;
  finishDate: Date;
  offersLimit: number;
  asksLimit: number;
  responseLimit: number;
}

export interface ProjectFile {
  id: string;
  projectId: string;
  filename: string;
  originalName: string;
  size: number;
  type: string;
  uploadDate: Date;
  uploadedBy: string;
}

export interface Question {
  id: string;
  projectId: string;
  subject: string;
  question: string;
  questionType: string;
  askedBy: string;
  askedAt: Date;
  response?: string;
  respondedBy?: string;
  respondedAt?: Date;
}

export interface License {
  id: string;
  name: string;
  type: string;
  issuingAuthority: string;
  issueDate: Date;
  expiryDate: Date;
  status: 'active' | 'expired' | 'expiring';
  userId: string;
}

export interface ContactMessage {
  id: string;
  subject: string;
  message: string;
  senderEmail?: string;
  sentAt: Date;
}