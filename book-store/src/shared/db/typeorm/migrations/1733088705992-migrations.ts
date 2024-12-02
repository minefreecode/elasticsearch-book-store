import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1733088705992 implements MigrationInterface {
  name = 'Migrations1733088705992';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "books" (
        "bookId" TEXT PRIMARY KEY,
        "title" TEXT NOT NULL,
        "series" TEXT,
        "author" TEXT NOT NULL,
        "rating" TEXT,
        "description" TEXT,
        "language" TEXT,
        "isbn" TEXT,
        "genres" TEXT[] DEFAULT '{}',
        "characters" TEXT[] DEFAULT '{}',
        "pages" TEXT,
        "publisher" TEXT,
        "publishDate" TEXT,
        "awards" TEXT[] DEFAULT '{}',
        "numRatings" TEXT,
        "ratingsByStars" TEXT[] DEFAULT '{}',
        "likedPercent" TEXT,
        "storySetting" TEXT[] DEFAULT '{}',
        "coverImg" TEXT,
        "createdAt" TIMESTAMP DEFAULT now(),
        "updatedAt" TIMESTAMP DEFAULT now(),
        "deletedAt" TIMESTAMP
      );
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_books_author" ON "books" ("author");
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_books_title" ON "books" ("title");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_books_author"`);
    await queryRunner.query(`DROP INDEX "IDX_books_title"`);
    await queryRunner.query(`DROP TABLE "books"`);
  }
}
