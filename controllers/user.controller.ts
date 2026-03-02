import { ApiSuccess } from "@/server";
import { UserService } from "@/services";
import {
	ApiRequest,
	ApiRequests,
	ApiResponse,
	ApiResponses,
	IUpdateUser,
} from "@/types";
import { SafetyUtils, StringUtils } from "@/utils";

export class UserController {
	public static async hello(_: ApiRequest, res: ApiResponse) {
		const data = { name: "Name is Bond! James Bond!" };
		return new ApiSuccess<typeof data>(res).send(data);
	}

	public static async getUserByEmail(req: ApiRequest, res: ApiResponse) {
		const email = StringUtils.getNonEmptyString(req.query.email);
		const user = await UserService.getUserByEmail(email);
		return new ApiSuccess(res).send(user);
	}

	public static async updateUserProfile(
		req: ApiRequest<ApiRequests.UpdateUser>,
		res: ApiResponse
	) {
		const userId = StringUtils.getNonEmptyString(req.user?.id);
		const name = SafetyUtils.safeParse(StringUtils.valueOf, req.body.name);
		const avatar = SafetyUtils.safeParse(
			StringUtils.valueOf,
			req.body.avatar
		);
		const body: IUpdateUser = {};
		if (StringUtils.isNotEmpty(name)) body["name"] = name;
		if (StringUtils.isNotEmpty(avatar)) body["avatar"] = avatar;
		const user = await UserService.updateUserDetails(userId, body);
		return new ApiSuccess<ApiResponses.UpdateUser>(res).send(user);
	}
}
