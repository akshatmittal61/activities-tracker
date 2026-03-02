import { Otp } from "@/types";
import { BaseRepo } from "./base";
import { Models } from "@/models";

class OtpRepo extends BaseRepo<Otp> {
	protected model = Models.Otp;
}

export const otpRepo = OtpRepo.getInstance<OtpRepo>();
