import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";

/** escape delimiter */
export function escapeComp(
  component: string,
  delimiter: string = DEFAULT_DELIMITER
): string {
  const DelimiterCharacterPattern = new RegExp(
    delimiter.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"),
    "g"
  );

  return component.replace(
    DelimiterCharacterPattern,
    ESCAPE_CHARACTER + delimiter
  );
}

/** unescape delimiter */
export function unescapeComp(
  component: string,
  delimiter: string = DEFAULT_DELIMITER
): string {
  const pattern = ESCAPE_CHARACTER + delimiter;

  return component.split(pattern).join(delimiter);
}
