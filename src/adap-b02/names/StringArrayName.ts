import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {
  protected delimiter: string = DEFAULT_DELIMITER;
  protected components: string[] = [];

  constructor(source: string[], delimiter?: string) {
    this.delimiter = delimiter ? delimiter : DEFAULT_DELIMITER;
    this.components = [...source];
  }

  public asString(delimiter: string = this.delimiter): string {
    return this.components.join(delimiter);
  }

  public asDataString(): string {
    const escape = (value: string): string => {
      // Escape the Escape Character
      let result = value.replace(
        new RegExp(`\\${ESCAPE_CHARACTER}`, "g"),
        ESCAPE_CHARACTER + ESCAPE_CHARACTER
      );

      // Escape the Delimiter Character
      result = result.replace(
        new RegExp(`\\${DEFAULT_DELIMITER}`, "g"),
        ESCAPE_CHARACTER + DEFAULT_DELIMITER
      );

      return result;
    };

    return this.components.map(escape).join(DEFAULT_DELIMITER);
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
    return this.components[i];
  }

  public setComponent(i: number, c: string): void {
    this.components[i] = c;
  }

  public insert(i: number, c: string): void {
    this.components.splice(i, 0, c);
  }

  public append(c: string): void {
    this.components.push(c);
  }

  public remove(i: number): void {
    this.components.splice(i, 1);
  }

  public concat(other: Name): void {
    for (let i = 0; i < other.getNoComponents(); i++) {
      this.components.push(other.getComponent(i));
    }
  }
}
