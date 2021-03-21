import { Schema, model } from 'mongoose';

const schema = new Schema(
	{
		username: String,
		email: { type: String, unique: true },
		password: String,
		createdAt: { type: Date, default: new Date().toISOString() },
	},
	{ versionKey: false }
);

export const User = model('User', schema);
