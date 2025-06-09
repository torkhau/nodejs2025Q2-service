import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User as IUser } from '../../models/user/interfaces';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
