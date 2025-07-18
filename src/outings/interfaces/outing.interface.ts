import { Partner } from './partner.interface';

export interface Outing {
  title: string;
  description: string;
  location: string;
  valoration: number;
  amountSpent: number;
  partners: Partner[];
}
