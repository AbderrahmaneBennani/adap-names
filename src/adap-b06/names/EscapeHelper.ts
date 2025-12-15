import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";

/** * Escapes the component string.
 */
export function escapeComp(
  component: string,
  delimiter: string = DEFAULT_DELIMITER
): string {
  let result = component
    .split(ESCAPE_CHARACTER)
    .join(ESCAPE_CHARACTER + ESCAPE_CHARACTER);

  result = result.split(delimiter).join(ESCAPE_CHARACTER + delimiter);

  return result;
}

/** * Unescapes the component string.
 */
export function unescapeComp(
  component: string,
  delimiter: string = DEFAULT_DELIMITER
): string {
  let result = component.split(ESCAPE_CHARACTER + delimiter).join(delimiter);

  result = result
    .split(ESCAPE_CHARACTER + ESCAPE_CHARACTER)
    .join(ESCAPE_CHARACTER);

  return result;
}
