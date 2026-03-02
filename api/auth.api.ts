import { http } from "@/client";
import { ApiRequests, ApiRes, ApiResponses, Headers } from "@/types";

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

	public static async requestOtpWithEmail(email: string) {
		const response = await http.post<
			ApiRes<ApiResponses.RequestOtp>,
			ApiRequests.RequestOtp
		>("/auth/otp/request", { email });
		return response.data;
	}

	public static async verifyOtpWithEmail(email: string, otp: string) {
		const response = await http.post<
			ApiRes<ApiResponses.VerifyOtp>,
			ApiRequests.VerifyOtp
		>("/auth/otp/verify", { email, otp });
		return response.data;
	}

	public static async verifyOAuthSignIn(code: string) {
		const res = await http.post<
			ApiRes<ApiResponses.VerifyGoogleOAuth>,
			ApiRequests.VerifyGoogleOAuth
		>("/oauth/google/verify", { code });
		return res.data;
	}

	public static async continueOAuthWithGoogle(token: string) {
		const res = await http.post<
			ApiRes<ApiResponses.ContinueGoogleOAuth>,
			ApiRequests.ContinueGoogleOAuth
		>("/oauth/google/continue", { token });
		return res.data;
	}
}
