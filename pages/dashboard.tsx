import { Page, ProtectedPageProps } from "@/layouts";
import { Avatar, Typography } from "@/library";
import { useAuthStore } from "@/store";
import { UserUtils } from "@/utils";
import React from "react";

type DashboardPageProps = ProtectedPageProps;

const DashboardPage: React.FC<DashboardPageProps> = () => {
	const { user, isSyncing, isLoggedIn } = useAuthStore();
	return (
		<Page
			className="w-screen h-screen flex justify-center items-center flex-col gap-4"
			seo={{
				title: isSyncing
					? "Syncing"
					: isLoggedIn && user
						? `${UserUtils.getNameOfUser(user)} - Dashboard`
						: "Dashboard",
			}}
		>
			<Typography as="h1" size="head-1" weight="bold">
				Dashboard
			</Typography>
			<div className="w-256 h-256 flex flex-wrap justify-center items-center">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9]
					.map((x) => x * 100)
					.map((item) => (
						<div
							key={item}
							className="w-32 h-32"
							style={{
								backgroundColor: `var(--accent-color-${item})`,
							}}
						></div>
					))}
			</div>
			{user ? (
				<div>
					<Avatar
						src={UserUtils.getUserAvatar(user)}
						alt="Akshat"
						size="small"
					/>
				</div>
			) : null}
			<pre>
				{JSON.stringify(
					isSyncing
						? { state: "syncing" }
						: isLoggedIn
							? { state: "loggedIn", user }
							: { state: "loggedOut", user },
					null,
					2
				)}
			</pre>
		</Page>
	);
};

export default DashboardPage;

export const getServerSideProps = () => {
	return {
		props: {
			user: {
				id: "1",
				name: "Akshat",
				email: "[EMAIL_ADDRESS]",
				avatar: "https://github.com/akshatmittal61.png",
				role: "admin",
			},
		},
	};
};
