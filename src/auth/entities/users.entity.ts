import { Role } from 'src/constants/roles';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class users {
  @PrimaryColumn()
  id: string;

  @Column({ default: Role.ADMIN })
  role: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
