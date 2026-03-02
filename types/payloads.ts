import { ContactMessage } from "./client";
import { T_EMAIL_TEMPLATE } from "./enum";

type EmailTemplateDataMap = {
	OTP: { otp: string };
	USER_INVITED: { invitedBy: { name: string; email: string } };
	USER_ADDED_TO_GROUP: {
		invitedBy: { name: string; email: string };
		group: { id: string; name: string };
	};
	NEW_USER_ONBOARDED: never;
	CONTACT_MESSAGE: ContactMessage;
};

export type EmailTemplateGenerator<T extends T_EMAIL_TEMPLATE> =
	EmailTemplateDataMap[T];
