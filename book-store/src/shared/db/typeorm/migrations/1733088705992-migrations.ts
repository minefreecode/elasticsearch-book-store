import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1733088705992 implements MigrationInterface {
    name = 'Migrations1733088705992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "author" character varying NOT NULL, "synopsis" character varying NOT NULL, "publicationDate" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f8b6ad5ace149133556e233355" ON "books" ("deletedAt") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_f8b6ad5ace149133556e233355"`);
        await queryRunner.query(`DROP TABLE "books"`);
    }

}
