import { AuthConstants, HTTP } from "@/constants";
import { Logger } from "@/log";
import { AuthService } from "@/services";
import { ApiController, ApiRequest, ApiResponse } from "@/types";
import { SafetyUtils, StringUtils } from "@/utils";
import { ApiFailure, ApiSuccess } from "./payload";

export class ServerMiddleware {
	public static authenticatedRoute(next: ApiController): ApiController {
		return async (req: ApiRequest, res: ApiResponse) => {
			try {
				const accessToken = StringUtils.getNonEmptyString(
					req.cookies[AuthConstants.ACCESS_TOKEN]
				);
				const refreshToken = StringUtils.getNonEmptyString(
					req.cookies[AuthConstants.REFRESH_TOKEN]
				);
				const authResponse = await AuthService.getAuthenticatedUser({
					accessToken,
					refreshToken,
				});
				if (!SafetyUtils.isNonNull(authResponse)) {
					const cookies = AuthService.getCookies({
						accessToken: null,
						refreshToken: null,
						logout: true,
					});
					return new ApiFailure(res)
						.status(HTTP.status.UNAUTHORIZED)
						.message(HTTP.message.UNAUTHORIZED)
						.cookies(cookies)
						.send();
				}
				const {
					user,
					accessToken: newAccessToken,
					refreshToken: newRefreshToken,
				} = authResponse;
				const cookies = AuthService.getUpdatedCookies(
					{ accessToken, refreshToken },
					{
						accessToken: newAccessToken,
						refreshToken: newRefreshToken,
					}
				);
				if (cookies.length > 0) {
					new ApiSuccess(res).cookies(cookies);
				}
				req.user = user;
			} catch (error) {
				Logger.error(error);
				const cookies = AuthService.getCookies({
					accessToken: null,
					refreshToken: null,
					logout: true,
				});
				return new ApiFailure(res)
					.status(HTTP.status.UNAUTHORIZED)
					.message(HTTP.message.UNAUTHORIZED)
					.cookies(cookies)
					.send();
			}
			return next(req, res);
		};
	}
}
