import { EntityBase } from 'src/db/abstract';
import { Track } from 'src/db/track';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class FavTrack extends EntityBase {
  @Column('uuid')
  trackId: string;

  @ManyToOne(() => Track, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trackId' })
  track: Track;
}
