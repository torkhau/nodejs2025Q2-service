import { Column, Entity } from 'typeorm';
import { User as IUser } from '../../models/user/interfaces';
import { EntityBase } from '../abstract';

@Entity()
export class User extends EntityBase implements IUser {
  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  version: number;

  @Column()
  createdAt: number;

  @Column()
  updatedAt: number;
}
