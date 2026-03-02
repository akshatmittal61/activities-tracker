import { Page } from "@/layouts";
import {
	Avatar,
	Button,
	CheckBox,
	FabButton,
	IconButton,
	Input,
	MaterialIcon,
	Pane,
	Popup,
	Typography,
} from "@/library";
import { Logger } from "@/log";
import { useAuthStore } from "@/store";
import { Notify } from "@/utils";
import React, { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";

const HomePage: React.FC = () => {
	const { user, isSyncing, isLoggedIn } = useAuthStore();
	const [check, setCheck] = useState(false);
	const [openPopup, setOpenPopup] = useState(false);
	const [openPane, setOpenPane] = useState(false);
	return (
		<>
			<Page className="w-screen h-screen flex justify-center items-center flex-col gap-4">
				<Typography
					className="text-blue-600"
					as="h1"
					size="head-1"
					weight="bold"
				>
					Home Page
				</Typography>
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
				<Avatar
					src="https://github.com/akshatmittal61.png"
					alt="Akshat"
					size="small"
				/>
				<IconButton
					icon={<MaterialIcon icon="home" />}
					onClick={() => Notify.info("Home")}
				/>
				<Button
					onClick={() => {
						throw new Error("Just for Error Boundary");
					}}
					size="large"
					theme="error"
					icon={<FiAlertTriangle />}
				>
					Throw an Error
				</Button>
				<Button onClick={() => setOpenPopup(true)}>Open Popup</Button>
				<Button onClick={() => setOpenPane(true)}>Open Pane</Button>
				<div className="w-1/2 flex justify-center items-center gap-2">
					<Input placeholder="Input" label="Label" />
					<CheckBox
						checked={check}
						onChange={() => setCheck((p) => !p)}
					/>
				</div>
				<FabButton
					icon={<FiAlertTriangle />}
					onClick={(e) => {
						e.stopPropagation();
						Notify.info("Fab");
					}}
				/>
			</Page>
			{openPopup ? (
				<Popup
					onEdit={() => Logger.info("Edit")}
					onDelete={() => Logger.info("Delete")}
					onClose={() => setOpenPopup(false)}
				>
					You are in a popup
				</Popup>
			) : null}
			{openPane ? (
				<Pane
					title="Pane Title"
					direction="bottom"
					onClose={() => setOpenPane(false)}
				>
					You are in pain
				</Pane>
			) : null}
		</>
	);
};

export default HomePage;
