import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  if (!await knex.schema.hasTable('notifications'))
    return knex.schema
      .createTable('notifications', table => {
        table.increments('id').primary();
        table.integer('userId').notNullable();
        table.integer('parentId').notNullable();
        table.string('content').notNullable();
        table.string('thumbnail').nullable();
        table.string('NotifyType').nullable();
        table.string('notifyService').nullable();
        table.timestamps(true, true);
      });
}


export async function down(knex: Knex): Promise<void> {
}
