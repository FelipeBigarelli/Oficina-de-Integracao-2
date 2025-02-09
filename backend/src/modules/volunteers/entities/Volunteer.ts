import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from '../../users/entities/User';
import { Workshop } from '../../workshops/entities/Workshop';

@Entity('volunteers')
class Volunteer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.volunteerWorkshops)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Workshop, (workshop) => workshop.volunteers)
  @JoinColumn({ name: 'workshop_id' })
  workshop: Workshop;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Volunteer };
