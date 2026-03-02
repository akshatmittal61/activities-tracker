import {
	AppNetworkStatus,
	AppTheme,
	T_API_METHODS,
	T_NODE_ENV,
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
