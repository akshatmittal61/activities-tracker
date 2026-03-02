import { stylesConfig } from "@/utils";
import React from "react";
import styles from "./styles.module.scss";
import { TextareaProps } from "./types";

const classes = stylesConfig(styles, "input");

export const Textarea: React.FC<TextareaProps> = ({
	label,
	styles,
	className,
	style,
	errorMessage,
	...rest
}) => {
	return (
		<div className={classes("") + ` ${className}`} style={styles?.box}>
			{label ? (
				<label className={classes("__label")} style={styles?.label}>
					{label}
				</label>
			) : null}
			<textarea
				{...rest}
				className={classes("__input", "__input--textarea")}
				style={{
					...styles?.input,
					...style,
				}}
				onInvalid={(e) => {
					e.currentTarget.setCustomValidity(errorMessage + "");
				}}
				onInput={(e) => {
					e.currentTarget.setCustomValidity("");
				}}
			/>
		</div>
	);
};
