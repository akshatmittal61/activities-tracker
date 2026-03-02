import { fallbackAssets, USER_ROLE } from "@/constants";
import { Schema, User } from "@/types";

export const UserSchema: Schema<User> = {
	name: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		index: {
			unique: true,
			sparse: true,
		},
	},
	avatar: {
		type: String,
		required: false,
		default: fallbackAssets.avatar,
	},
	role: {
		type: String,
		enum: Object.values(USER_ROLE),
		default: USER_ROLE.MEMBER,
	},
};
