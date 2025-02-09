import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from '../../users/entities/User';

@Entity('workshops')
class Workshop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  duration: string;

  @ManyToMany(() => User, (user) => user.volunteerWorkshops)
  @JoinTable({
    name: 'volunteers', // Nome da tabela intermediária
    joinColumn: { name: 'workshop_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  volunteers: User[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Workshop };
