export type StudentStatus = 'available' | 'occupied' | 'full';

export interface StudentRoom {
  id: number;
  name: string;
  status: StudentStatus;
  capacity: number;
  capacityIcon: string;
  capacityText: string;
  features: string[];
  primaryAction: string;
  primaryDisabled: boolean;
}

export type ResourceType = 'lectures' | 'books' | 'papers';

export interface StudentResource {
  id: number;
  title: string;
  type: ResourceType;
  course: string;
  metaIcon: string;
  metaText: string;
  description: string;
  actionLabel: string;
  updatedAt?: string;
}

export interface SessionMaterial {
  name: string;
  type: string;
  action: string;
}

export type SessionStatus = 'Upcoming' | 'Ongoing' | 'Completed';

export interface SessionFeedback {
  rating: number;
  comments: string;
  recommend: string | null;
}

export interface StudentSession {
  id: number;
  title: string;
  datetime: string;
  startAt: string;
  type: string;
  host: string;
  status: SessionStatus;
  description: string;
  participants: string[];
  materials: SessionMaterial[];
  duration?: string;
  feedback?: SessionFeedback;
}

export interface EvaluationRatings {
  overall?: number;
  content?: number;
  instructor?: number;
  [key: string]: number | undefined;
}

export interface StudentEvaluation {
  id: number;
  title: string;
  courseCode: string;
  instructor: string;
  status: 'pending' | 'completed';
  statusLabel: string;
  metaIcon: string;
  metaText: string;
  description: string;
  progress: number;
  primaryAction: string;
  secondaryAction: string;
  submissionDate: string | null;
  ratings: EvaluationRatings;
  comments: string;
  recommend: boolean | null;
}
