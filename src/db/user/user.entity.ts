import { Column, Entity } from 'typeorm';
import { User as IUser } from '../../models/user/interfaces';
import { EntityBase } from '../abstract';

@Entity()
export class User extends EntityBase implements IUser {
  @Column('text')
  login: string;

  @Column('text')
  password: string;

  @Column('int')
  version: number;

  @Column('bigint')
  createdAt: number;

  @Column('bigint')
  updatedAt: number;
}
