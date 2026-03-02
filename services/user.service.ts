import { HTTP } from "@/constants";
import { ApiError } from "@/errors";
import { userRepo } from "@/repo";
import { CreateModel, IUpdateUser, IUser, User } from "@/types";
import { SafetyUtils, StringUtils } from "@/utils";
import { CacheService } from "./cache.service";

export class UserService {
	public static async getUserById(id: string): Promise<IUser | null> {
		return await CacheService.fetchUser({ id }, () =>
			userRepo.findById(id)
		);
	}

	public static async getUserByEmail(email: string) {
		return await userRepo.findByEmail(email);
	}

	public static async findOrCreateUser(
		body: CreateModel<User>
	): Promise<{ user: IUser; isNew: boolean }> {
		const email = StringUtils.getNonEmptyString(body.email);
		const foundUser = await userRepo.findByEmail(email);
		if (foundUser) {
			return { user: foundUser, isNew: false };
		}
		const createdUser = await userRepo.create(body);
		return { user: createdUser, isNew: true };
	}

	public static async updateUserDetails(
		id: string,
		update: IUpdateUser
	): Promise<IUser> {
		const foundUser = await UserService.getUserById(id);
		if (!SafetyUtils.isNonNull(foundUser)) {
			throw new ApiError(HTTP.status.NOT_FOUND, "User not found");
		}
		const keysToUpdate = ["name", "avatar"];
		if (Object.keys(update).length == 0) {
			throw new ApiError(
				HTTP.status.BAD_REQUEST,
				"There is nothing to update"
			);
		}
		const updatedBody: any = {};
		Object.keys(update).forEach((key) => {
			if (keysToUpdate.includes(key)) {
				if (
					((update as any)[key] === null ||
						(update as any)[key] === undefined ||
						(update as any)[key] === "") &&
					((foundUser as any)[key] === null ||
						(foundUser as any)[key] === undefined ||
						(foundUser as any)[key] === "")
				) {
					return;
				} else if ((update as any)[key] !== (foundUser as any)[key]) {
					updatedBody[key] = (update as any)[key];
				} else if (!(foundUser as any)[key]) {
					updatedBody[key] = (update as any)[key];
				}
			}
		});
		const updatedUser = await userRepo.update({ id }, updatedBody);
		if (!SafetyUtils.isNonNull(updatedUser)) {
			throw new ApiError(HTTP.status.NOT_FOUND, "User not found");
		}
		CacheService.invalidateUser({ id });
		CacheService.invalidateUser({ email: foundUser.email });
		return updatedUser;
	}
}
