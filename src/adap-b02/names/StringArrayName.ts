import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {
  protected delimiter: string = DEFAULT_DELIMITER;
  protected components: string[] = [];

  constructor(source: string[], delimiter?: string) {
    this.delimiter = delimiter ?? DEFAULT_DELIMITER;
    this.components = [...source];
  }

  /** Human-readable string, no escaping */
  public asString(delimiter: string = this.delimiter): string {
    return this.components.join(delimiter);
  }

  /** Machine-readable string with escaping */
  public asDataString(): string {
    return this.components
      .map((c) => this.escapeComponent(c))
      .join(DEFAULT_DELIMITER);
  }

  /** Escape helper: escape ESCAPE_CHARACTER and DEFAULT_DELIMITER */
  private escapeComponent(component: string): string {
    // Escape ESCAPE_CHARACTER
    const EscapeCharacterPattern = new RegExp(
      ESCAPE_CHARACTER.replace(/\\/g, "\\\\"),
      "g"
    );
    // Escape DEFAULT_DELIMITER
    const DelimiterCharacterPattern = new RegExp(
      DEFAULT_DELIMITER.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"),
      "g"
    );

    return component
      .replace(EscapeCharacterPattern, ESCAPE_CHARACTER + ESCAPE_CHARACTER)
      .replace(DelimiterCharacterPattern, ESCAPE_CHARACTER + DEFAULT_DELIMITER);
  }

  public getDelimiterCharacter(): string {
    return this.delimiter;
  }

  public isEmpty(): boolean {
    return this.components.length === 0;
  }

  public getNoComponents(): number {
    return this.components.length;
  }

  public getComponent(i: number): string {
    if (i < 0 || i >= this.getNoComponents()) {
      throw new Error(`Index out of bounds`);
    }
    return this.components[i];
  }

  public setComponent(i: number, c: string): void {
    if (i < 0 || i >= this.getNoComponents()) {
      throw new Error(`Index out of bounds`);
    }
    this.components[i] = c;
  }

  public insert(i: number, c: string): void {
    if (i < 0 || i > this.getNoComponents()) {
      throw new Error(`Index out of bounds`);
    }
    this.components.splice(i, 0, c);
  }

  public append(c: string): void {
    this.components.push(c);
  }

  public remove(i: number): void {
    if (i < 0 || i >= this.getNoComponents()) {
      throw new Error(`Index out of bounds`);
    }
    this.components.splice(i, 1);
  }

  public concat(other: Name): void {
    for (let i = 0; i < other.getNoComponents(); i++) {
      this.components.push(other.getComponent(i));
    }
  }
}
