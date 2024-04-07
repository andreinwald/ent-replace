/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 */
export declare function ucs2decode(string: any): any[];
/**
 * Creates a string based on an array of numeric code points.
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 */
export declare function ucs2encode(codePoints: any): string;
