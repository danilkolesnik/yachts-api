
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class warehouse {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  quantity: string;

  @Column()
  inventory: string;

  @Column()
  comment: string;
}