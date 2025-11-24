import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {
  protected components: string[] = [];

  constructor(source: string[], delimiter?: string) {
    super(delimiter);
    this.components = [...source];
  }

  public clone(): Name {
    return new StringArrayName(this.components, this.delimiter);
  }

  public asString(delimiter: string = this.delimiter): string {
    return this.components.join(delimiter);
  }

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

  public getNoComponents(): number {
    return this.components.length;
  }

  public getComponent(i: number): string {
    if (i < 0 || i >= this.getNoComponents()) {
      throw new Error(`Index out of bounds`);
    }
    return this.components[i];
  }

  public setComponent(i: number, c: string) {
    if (i < 0 || i >= this.getNoComponents()) {
      throw new Error(`Index out of bounds`);
    }
    this.components[i] = c;
  }

  public insert(i: number, c: string) {
    if (i < 0 || i > this.getNoComponents()) {
      throw new Error(`Index out of bounds`);
    }
    this.components.splice(i, 0, c);
  }

  public append(c: string) {
    this.components.push(c);
  }

  public remove(i: number) {
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
