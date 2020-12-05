import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602981409726 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
            columns: [
                {
                    name: 'id',
                    type: 'integer',    
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },

                {
                    name: 'path',
                    type: 'varchar',
                },

                {
                    name: 'orphanage_id',
                    type: 'integer',
                }
            ],

            foreignKeys: [
                {
                    name: 'ImageOrphanages',
                    columnNames: ['orphanage_id'],
                    referencedTableName: 'orphanages',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE', // altera o id das imagens automaticamente em caso de alteração no ID da tabela orfanatos
                    onDelete: 'CASCADE', // deletar imagens caso o orfanato seja deletado
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
    }

}
 