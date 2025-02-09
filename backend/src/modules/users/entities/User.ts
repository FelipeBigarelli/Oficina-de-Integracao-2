import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Workshop } from '../../workshops/entities/Workshop';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  RA: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  is_admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Workshop, (workshop) => workshop.volunteers)
  volunteerWorkshops: Workshop[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
