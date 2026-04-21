import { Logger } from "@/log";
import { AuthMappingSchema, OtpSchema, UserSchema } from "@/schema";
import { AuthMapping, Otp, User } from "@/types";
import { SafetyUtils } from "@/utils";
import mongoose from "mongoose";

export interface Model<T> extends mongoose.Model<T> {
	isInitialized: boolean;
}

type SupportedModels = "AuthMapping" | "User" | "Otp";

declare global {
	// eslint-disable-next-line no-unused-vars
	var models: Record<SupportedModels, Model<any>>;
}

class ModelFactory<T = any> {
	private readonly schema: mongoose.Schema<T>;
	public model: Model<T>;

	public constructor(name: SupportedModels, schema: any) {
		this.schema = this.getSchema(schema);
		this.model = this.getModel(name);
	}

	private getSchema(input: any): mongoose.Schema<T> {
		return new mongoose.Schema<T>(input, {
			timestamps: true,
			versionKey: false,
		});
	}

	private getModel(name: SupportedModels): Model<T> {
		const model: mongoose.Model<T> =
			mongoose.models[name] || mongoose.model<T>(name, this.schema);
		const typedModel = this.getTypedModel(model);
		Logger.debug(
			`Model ${typedModel.modelName} prepped, adding to global models`
		);
		if (SafetyUtils.isNonNull(global.models)) {
			global.models[name] = typedModel;
		} else {
			global.models = Object.create(null);
			global.models[name] = typedModel;
		}
		Logger.debug(`Model ${typedModel.modelName} added to global models`);
		return typedModel;
	}

	private getTypedModel(model: mongoose.Model<T>): Model<T> {
		Logger.debug(`Model ${model.modelName} prepped, adding custom methods`);
		const typedModel = model as Model<T>;
		typedModel.isInitialized = true;
		Logger.debug(
			`Model ${model.modelName} custom methods added`,
			typedModel.isInitialized
		);
		return typedModel;
	}
}

export class Models {
	private static AuthMappingModel: Model<AuthMapping>;
	private static UserModel: Model<User>;
	private static OtpModel: Model<Otp>;

	public static get AuthMapping(): Model<AuthMapping> {
		return this.AuthMappingModel;
	}

	public static get User(): Model<User> {
		return this.UserModel;
	}

	public static get Otp(): Model<Otp> {
		return this.OtpModel;
	}

	public static init() {
		Logger.debug("Models init called");
		if (Models.areInitialized()) {
			Logger.debug(
				"Models already initialized",
				this.getAllModels().map((model) => model.isInitialized)
			);
			return;
		}

		Logger.debug("DB models not initialized, initializing...");

		Models.AuthMappingModel = new ModelFactory<AuthMapping>(
			"AuthMapping",
			AuthMappingSchema
		).model;
		Models.UserModel = new ModelFactory<User>("User", UserSchema).model;
		Models.OtpModel = new ModelFactory<Otp>("Otp", OtpSchema).model;

		Logger.debug(
			"DB models initialized in class",
			this.getAllModels().map((model) => model.toString())
		);

		global.models = {
			AuthMapping: Models.AuthMapping,
			User: Models.User,
			Otp: Models.Otp,
		};

		Logger.debug(
			"DB models initialized",
			this.getAllModels().map((model) => model.toString())
		);
	}

	private static areInitialized(): boolean {
		return this.getAllModels().every(SafetyUtils.isNonNull);
	}

	private static getAllModels(): Array<Model<any>> {
		return [this.AuthMapping, this.Otp, this.User];
	}
}
