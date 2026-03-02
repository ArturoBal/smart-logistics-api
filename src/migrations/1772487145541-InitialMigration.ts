import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1772487145541 implements MigrationInterface {
    name = 'InitialMigration1772487145541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "network" ("id" SERIAL NOT NULL, "edges" json NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8f8264c2d37cbbd8282ee9a3c97" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "network"`);
    }

}
