import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class offer {
  @PrimaryColumn()
  id: string;

  @Column({default: ''})
  customer: string;

  @Column({default: ''})
  customerFullName: string;

  @Column({default: ''})
  yachtName: string;

  @Column({default: ''})
  yachtModel: string;

  @Column({ default: '' })
  comment: string;

  @Column({default: ''})
  countryCode: string;

  @Column('json', { default: [] })
  services: { serviceName: string; priceInEuroWithoutVAT: number }[];

  @Column('json', { default: [] })
  parts: { partName: string; quantity: number }[];

  @Column({ default: 'created' })
  status: string;

  @Column('json', { default: [] })
  versions: any[];

  @CreateDateColumn()
  createdAt: Date;
}