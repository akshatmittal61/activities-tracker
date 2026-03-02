import {
	AppNetworkStatus,
	AppTheme,
	T_API_METHODS,
	T_AUTH_MAPPING_PROVIDER,
	T_EMAIL_TEMPLATE,
	T_NODE_ENV,
	T_OTP_STATUS,
	T_USER_ROLE,
} from "@/types";
import { getEnumeration } from "@/utils";

export const USER_ROLE = getEnumeration<T_USER_ROLE>([
	"ADMIN",
	"GUEST",
	"MEMBER",
]);

export const apiMethods = getEnumeration<T_API_METHODS>([
	"GET",
	"POST",
	"PUT",
	"PATCH",
	"DELETE",
]);

export const NODE_ENV = getEnumeration<T_NODE_ENV>([
	"development",
	"test",
	"production",
]);

export const appTheme = getEnumeration<AppTheme>(["light", "dark"]);

export const appNetworkStatus = getEnumeration<AppNetworkStatus>([
	"online",
	"offline",
]);

export const emailTemplates = getEnumeration<T_EMAIL_TEMPLATE>([
	"OTP",
	"NEW_USER_ONBOARDED",
	"CONTACT_MESSAGE",
]);

export const authMappingProvider = getEnumeration<T_AUTH_MAPPING_PROVIDER>([
	"otp",
	"google",
]);

export const OTP_STATUS = getEnumeration<T_OTP_STATUS>(["PENDING", "EXPIRED"]);
