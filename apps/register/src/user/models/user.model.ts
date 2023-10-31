import { Model } from 'objection';

export class User extends Model {
	static get tableName(): string {
		return 'users';
	}

	id!: number;
	firstName!: string;
	lastName!: string;
	email!: string;
	password!: string;
	phone?: string;
	nation?: string;
	role?: 'USER' | 'ADMIN';

	static get idColumn() {
		return 'id';
	}

	fullName() {
		return this.firstName + ' ' + this.lastName;
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['firstName', 'lastName', 'email', 'password'],

			properties: {
				id: { type: 'integer' },
				firstName: { type: 'string', minLength: 1, maxLength: 255 },
				lastName: { type: 'string', minLength: 1, maxLength: 255 },
				email: { type: 'string', minLength: 1, maxLength: 255 },
				password: { type: 'string', minLength: 1, maxLength: 255 },
				phone: { type: 'string', minLength: 1, maxLength: 255 },
				nation: { type: 'string', minLength: 1, maxLength: 255 },
				role: { type: 'string', minLength: 1, maxLength: 255 },
			}
		};
	}
}