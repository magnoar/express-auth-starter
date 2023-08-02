import { Item } from 'dynamoose/dist/Item';

export const USERS_PK = "users"; 

export interface EntityModel extends Item {
  pk: string;
  sk: string;
  name?: string;
  passwd?: string; 
}

export interface UserModel extends EntityModel {
  pk: string;
  sk: string;
  name: string;
  passwd: string; 
}