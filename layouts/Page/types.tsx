import { IUser, SeoProps } from "@/types";
import React from "react";

// extends props for <main> html element so it can be used as Page
export interface PageProps extends React.ComponentProps<"main"> {
	children?: React.ReactNode;
	user?: IUser;
	seo?: SeoProps;
}

export type ProtectedPageProps = Omit<PageProps, "user"> & {
	user: IUser;
};
