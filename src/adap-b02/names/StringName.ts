import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {
  protected delimiter: string = DEFAULT_DELIMITER;
  protected name: string = "";
  protected noComponents: number = 0;

  constructor(source: string, delimiter?: string) {
    this.delimiter = delimiter ? delimiter : DEFAULT_DELIMITER;
    this.name = source;
    const components = this.name.split(this.delimiter);
    this.noComponents = components.length;
  }

  public asString(delimiter: string = this.delimiter): string {
    if (delimiter !== this.delimiter) {
      const components = this.name.split(this.delimiter);
      return components.join(delimiter);
    }
    return this.name;
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

    const components = this.name.split(this.delimiter);
    return components.map(escape).join(DEFAULT_DELIMITER);
  }

  public getDelimiterCharacter(): string {
    return this.delimiter;
  }

  public isEmpty(): boolean {
    return this.noComponents === 0;
  }

  public getNoComponents(): number {
    return this.noComponents;
  }

  public getComponent(x: number): string {
    const components = this.name.split(this.delimiter);
    return components[x];
  }

  public setComponent(n: number, c: string): void {
    const components = this.name.split(this.delimiter);
    components[n] = c;
    this.name = components.join(this.delimiter);
  }

  public insert(n: number, c: string): void {
    const components = this.name.split(this.delimiter);
    components.splice(n, 0, c);
    this.name = components.join(this.delimiter);
    this.noComponents++;
  }

  public append(c: string): void {
    const components = this.name.split(this.delimiter);
    components.push(c);
    this.name = components.join(this.delimiter);
    this.noComponents++;
  }

  public remove(n: number): void {
    const components = this.name.split(this.delimiter);
    components.splice(n, 1);
    this.name = components.join(this.delimiter);
    this.noComponents--;
  }

  public concat(other: Name): void {
    for (let i = 0; i < other.getNoComponents(); i++) {
      this.append(other.getComponent(i));
    }
    this.noComponents += other.getNoComponents();
  }
}
