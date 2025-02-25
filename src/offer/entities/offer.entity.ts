
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class offer {
  @PrimaryColumn({default: ''})
  id: string;

  @Column({default: ''})
  customer: string;

  @Column({default: ''})
  yachtName: string;

  @Column({default: ''})
  yachtModel: string;

  @Column({default: ''})
  comment: string;

  @Column({ nullable: false, default: '' })
  countryCode: string;  
}