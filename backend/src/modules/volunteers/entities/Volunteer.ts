import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from '../../users/entities/User';
import { Workshop } from '../../workshops/entities/Workshop';

@Entity('volunteers')
class Volunteer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  workshop_id: string;

  @ManyToOne(() => User, (user) => user.volunteerWorkshops)
  user: User;

  @ManyToOne(() => Workshop, (workshop) => workshop.volunteers)
  workshop: Workshop;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Volunteer };
