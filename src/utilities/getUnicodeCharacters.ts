import { isTuple } from "../utilities/isTuple";

export type UnicodeCharacter = {
	codePoint: number;
	name: string;
};

export const getUnicodeCharacters = async (): Promise<UnicodeCharacter[]> => {
	const response = await fetch("./DerivedName.txt");
	const text = await response.text();

	const unicodeCharacters: UnicodeCharacter[] = [];

	const lines = text.split("\n");
	for (const line of lines) {
		if (line.length == 0 || line.startsWith("#")) {
			continue;
		}

		const fields = line.split(";");
		if (!isTuple(fields, 2)) {
			continue;
		}

		const codePoint = Number.parseInt(fields[0], 16);
		const name = fields[1].trim();

		unicodeCharacters.push({ codePoint, name });
	}

	return unicodeCharacters;
};
