import { PrimaryColumn } from 'typeorm';

export abstract class EntityBase {
  @PrimaryColumn()
  id: string;
}
