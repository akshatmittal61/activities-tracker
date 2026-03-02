import React, { useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { Input } from "./text-input";
import { InputProps } from "./types";

interface HiddenInputProps extends Omit<InputProps, "onChange"> {
	value: string;
	onChange: (_: string) => void;
}

export const HiddenInput: React.FC<HiddenInputProps> = ({
	value,
	onChange,
	...props
}) => {
	const [reveal, setReveal] = useState(false);
	return (
		<Input
			type={reveal ? "text" : "password"}
			value={value}
			onChange={(e: any) => onChange(e.target.value)}
			leftIcon={<FiLock />}
			autoComplete="new-password"
			rightIcon={
				reveal ? (
					<FiEye onClick={() => setReveal((p) => !p)} />
				) : (
					<FiEyeOff onClick={() => setReveal((p) => !p)} />
				)
			}
			{...props}
		/>
	);
};
