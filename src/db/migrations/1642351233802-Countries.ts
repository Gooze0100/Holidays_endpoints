import {MigrationInterface, QueryRunner} from "typeorm";

export class Countries1642351233802 implements MigrationInterface {
    name = 'Countries1642351233802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "countries" ("id" SERIAL NOT NULL, "countries" character varying NOT NULL, CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "countries"`);
    }

}
