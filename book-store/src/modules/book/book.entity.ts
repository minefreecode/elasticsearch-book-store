import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryColumn()
  bookId: string;

  @Index()
  @Column()
  title: string;

  @Column({ nullable: true })
  series: string;

  @Index()
  @Column()
  author: string;

  @Column({ nullable: true })
  rating: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  language: string;

  @Column()
  isbn: string;

  @Column('text', { array: true, nullable: true })
  genres: string[];

  @Column('text', { array: true, nullable: true })
  characters: string[];

  @Column({ nullable: true })
  pages: string;

  @Column({ nullable: true })
  publisher: string;

  @Column({ nullable: true })
  publishDate: string;

  @Column('text', { array: true, nullable: true })
  awards: string[];

  @Column({ nullable: true })
  numRatings: string;

  @Column('text', { array: true, nullable: true })
  ratingsByStars: string[];

  @Column({ nullable: true })
  likedPercent: string;

  @Column('text', { array: true })
  storySetting: string[];

  @Column({ nullable: true })
  coverImg: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
