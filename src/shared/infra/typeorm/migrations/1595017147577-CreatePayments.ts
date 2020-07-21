import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePayments1595017147577 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payments',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'payment_type_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'bill_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'value',
            type: 'decimal',
            scale: 2,
            precision: 10,
            isNullable: false,
          },
          {
            name: 'paid_at',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('payments');
  }
}
