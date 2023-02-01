import { useQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { FunctionComponent, useRef } from "react";

import { getUnicodeCharacters } from "../utilities/getUnicodeCharacters";

import css from "./Grid.module.css";

const rowHeight = 128;
const rowMarginBottom = 16;

const totalRowHeight = rowHeight + rowMarginBottom;

const columnCount = 8;

export type GridProps = {};

export const Grid: FunctionComponent<GridProps> = ({}) => {
	const { data, status } = useQuery({
		queryFn: getUnicodeCharacters,
		queryKey: ["unicodeCharacters"],
	});

	const container = useRef(null);

	const rowCount = data ? Math.ceil(data.length / columnCount) : 0;

	const rowVirtualizer = useVirtualizer({
		count: rowCount,
		estimateSize: () => totalRowHeight,
		getScrollElement: () => container.current,
		overscan: 8,
	});

	if (status != "success") {
		return null;
	}

	return (
		<div
			className={css.container}
			ref={container}
			style={{
				width: "100%",
				height: "100%",
				padding: "16px",
				overflow: "auto",
			}}
		>
			<div
				className={css.grid}
				style={{
					position: "relative",
					width: "100%",
					height: `${rowVirtualizer.getTotalSize()}px`,
				}}
			>
				{rowVirtualizer.getVirtualItems().map(({ index, size, start }) => {
					const gridItems = [];
					for (let offset = 0; offset < columnCount; offset++) {
						const { codePoint, name } = data![index + offset]!;

						const character = String.fromCodePoint(codePoint);

						gridItems.push(<GridItem character={character} key={codePoint} name={name} />);
					}

					return (
						<div
							className={css.row}
							key={index}
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								marginBottom: "16px",
								width: "100%",
								height: `${size}px`,
								transform: `translateY(${start}px)`,
							}}
						>
							{gridItems}
						</div>
					);
				})}
			</div>
		</div>
	);
};

type GridItemProps = {
	character: string;
	name: string;
};

const GridItem: FunctionComponent<GridItemProps> = ({ character, name }) => {
	return (
		<div className={css.gridItem}>
			<p className={css.gridItemCharacter}>{character}</p>
			<p className={css.gridItemName}>{name}</p>
		</div>
	);
};
