export type ColorName = keyof typeof defaultColors;

const defaultColors = {
	success: "MediumSeaGreen",
	error: "Crimson",
	warning: "Orange",
	info: "DodgerBlue",
	debug: "SlateGray",
	highlight: "Fuchsia",
	muted: "Gray",
} as const;

const applyColor = (
	message: any,
	colorName: ColorName | string,
	...extraArgs: any[]
) => {
	const colorValue = defaultColors[colorName as ColorName] || colorName;

	if (typeof message === "string") {
		if (colorName === "error") {
			console.error(`%c${message}`, `color: ${colorValue};`, ...extraArgs);
		} else {
			console.log(`%c${message}`, `color: ${colorValue};`, ...extraArgs);
		}
	} else {
		console.log(message, ...extraArgs);
	}
};

const colorLog = (
	messageParts: string[],
	...colorStyles: (ColorName | string)[]
) => {
	const formatStr = messageParts.map((part) => `%c${part}`).join("");
	const styles = colorStyles.map((color) =>
		typeof color === "string" && color.startsWith("color:")
			? color
			: `color: ${defaultColors[color as ColorName] || color};`,
	);

	console.log(formatStr, ...styles);
};

export const logger = {
	...console,

	console: {
		error: console.error,
	},

	color: (message: any, colorName: ColorName | string, ...extraArgs: any[]) => {
		applyColor(message, colorName, ...extraArgs);
	},

	colorLog: (
		messageParts: string[],
		...colorStyles: (ColorName | string)[]
	) => {
		colorLog(messageParts, ...colorStyles);
	},

	success: (message: any, ...args: any[]) => {
		applyColor(message, "success", ...args);
	},

	error: (message: any, ...args: any[]) => {
		applyColor(message, "error", ...args);
	},

	warning: (message: any, ...args: any[]) => {
		applyColor(message, "warning", ...args);
	},

	info: (message: any, ...args: any[]) => {
		applyColor(message, "info", ...args);
	},

	highlight: (message: any, ...args: any[]) => {
		applyColor(message, "highlight", ...args);
	},
};
