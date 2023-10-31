import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	if (!await knex.schema.hasTable('users'))
		return knex.schema
			.createTable('users', table => {
				table.increments('id').primary();
				table.string('firstName').notNullable();
				table.string('lastName').notNullable();
				table.string('email').notNullable().unique();
				table.string('password').notNullable();
				table.string('phone').nullable();
				table.string('nation').nullable();
				table.enum('role', ['USER', 'ADMIN']).nullable();
				table.timestamps(true, true);
			});
}


export async function down(knex: Knex): Promise<void> {
}
