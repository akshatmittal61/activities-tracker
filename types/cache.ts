export type CacheParameter = "USER" | "AUTH_MAPPING";

type CachePayloadMap = {
	USER: { id: string } | { email: string };
	AUTH_MAPPING: { id: string } | { identifier: string; provider: string };
};

export type CachePayloadGenerator<T extends CacheParameter> =
	CachePayloadMap[T];
