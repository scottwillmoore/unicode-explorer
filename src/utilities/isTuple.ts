// prettier-ignore
type Tuple_<T, Length extends number, Accumulator extends T[] = []> =
    Accumulator["length"] extends Length
        ? Accumulator
        : Tuple_<T, Length, [T, ...Accumulator]>;

// prettier-ignore
export type Tuple<T, Length extends number> =
    Length extends number
	    ? number extends Length
		    ? T[]
		    : Tuple_<T, Length>
	    : never;

// prettier-ignore
type IsNumber<Type, True = true, False = false> =
	Type extends number
		? True
		: False;

// type A = IsNumber<number>;
// type B = IsNumber<0>;
// type C = IsNumber<0 | 1>;
// type D = IsNumber<string>;
// type E = IsNumber<"">;
// type F = IsNumber<number | string>;
// type G = IsNumber<any>;

// prettier-ignore
type IsNumberLiteral<Type, True = true, False = false> =
	Type extends number
		? number extends Type
			? False
			: True
		: False;

// type A = IsNumberLiteral<number>;
// type B = IsNumberLiteral<0>;
// type C = IsNumberLiteral<0 | 1>;
// type D = IsNumberLiteral<0 | number>;
// type E = IsNumberLiteral<0 | "">;

export const isTuple = <T, Length extends number>(
	array: T[],
	length: Length
): array is Tuple<T, Length> => array.length == length;
