import { http } from "@/client";
import { ApiRes, ApiResponses, Headers } from "@/types";

export class AuthApi {
	/**
	 * Verifies the user and returns the user's information if valid.
	 * @param headers Optional headers to pass to the request.
	 * @returns The user's information if the token is valid, else throws an error.
	 */
	public static async verify(headers?: Headers) {
		const res = await http.get<ApiRes<ApiResponses.VerifyUser>>(
			"/auth/verify",
			{ headers }
		);
		return res.data;
	}
	public static async logout(headers?: Headers) {
		const response = await http.get<ApiRes<ApiResponses.Logout>>(
			"/auth/logout",
			{ headers }
		);
		return response.data;
	}
}
