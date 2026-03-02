import { AuthMappingSchema, UserSchema } from "@/schema";
import { AuthMapping, User } from "@/types";
import mongoose from "mongoose";

class ModelFactory<T = any> {
	private readonly schema: mongoose.Schema<T>;
	public model: mongoose.Model<T>;
	public constructor(name: string, schema: any) {
		this.schema = this.getSchema(schema);
		this.model = this.getModel(name);
	}
	private getSchema(input: any): mongoose.Schema<T> {
		return new mongoose.Schema<T>(input, {
			timestamps: true,
			versionKey: false,
		});
	}
	private getModel(name: string): mongoose.Model<T> {
		return mongoose.models[name] || mongoose.model<T>(name, this.schema);
	}
}

declare global {
	// eslint-disable-next-line no-unused-vars
	var models: {
		AuthMapping: mongoose.Model<AuthMapping>;
		User: mongoose.Model<User>;
	};
}

export class Models {
	public static AuthMapping: mongoose.Model<AuthMapping>;
	public static User: mongoose.Model<User>;

	public static init() {
		if (global.models) {
			Models.AuthMapping = global.models.AuthMapping;
			Models.User = global.models.User;
			return;
		}
		Models.AuthMapping = new ModelFactory<AuthMapping>(
			"AuthMapping",
			AuthMappingSchema
		).model;
		Models.User = new ModelFactory<User>("User", UserSchema).model;
		global.models = {
			AuthMapping: Models.AuthMapping,
			User: Models.User,
		};
	}
}
