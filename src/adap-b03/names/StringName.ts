import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {
  protected name: string = "";
  protected noComponents: number = 0;

  constructor(source: string, delimiter?: string) {
    super(delimiter);
    this.name = source;
    this.noComponents = this.name.split(this.delimiter).length;
  }

  public clone(): Name {
    return new StringName(this.toString(), this.delimiter);
  }

  public asString(delimiter: string = this.delimiter): string {
    if (delimiter !== this.delimiter) {
      const components = this.name.split(this.delimiter);
      return components.join(delimiter);
    }
    return this.name;
  }

  public asDataString(): string {
    const components = this.name.split(this.delimiter);
    return components
      .map((c) => this.escapeComponent(c))
      .join(DEFAULT_DELIMITER);
  }

  /** Escape helper: escape ESCAPE_CHARACTER and DEFAULT_DELIMITER */
  private escapeComponent(component: string): string {
    const escapeRegex = new RegExp(
      ESCAPE_CHARACTER.replace(/\\/g, "\\\\"),
      "g"
    );
    const delimiterRegex = new RegExp(
      DEFAULT_DELIMITER.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"),
      "g"
    );

    return component
      .replace(escapeRegex, ESCAPE_CHARACTER + ESCAPE_CHARACTER)
      .replace(delimiterRegex, ESCAPE_CHARACTER + DEFAULT_DELIMITER);
  }

  public getNoComponents(): number {
    return this.noComponents;
  }

  public getComponent(i: number): string {
    const components = this.name.split(this.delimiter);
    if (i < 0 || i >= this.getNoComponents()) {
      throw new Error(`Index out of bounds`);
    }
    return components[i];
  }

  public setComponent(i: number, c: string) {
    const components = this.name.split(this.delimiter);
    if (i < 0 || i >= this.getNoComponents()) {
      throw new Error(`Index out of bounds`);
    }
    components[i] = c;
    this.name = components.join(this.delimiter);
  }

  public insert(i: number, c: string) {
    const components = this.name.split(this.delimiter);
    if (i < 0 || i > this.getNoComponents()) {
      throw new Error(`Index out of bounds`);
    }
    components.splice(i, 0, c);
    this.name = components.join(this.delimiter);
    this.noComponents++;
  }

  public append(c: string) {
    const components = this.name.split(this.delimiter);
    components.push(c);
    this.name = components.join(this.delimiter);
    this.noComponents++;
  }

  public remove(i: number) {
    const components = this.name.split(this.delimiter);
    if (i < 0 || i >= this.getNoComponents()) {
      throw new Error(`Index out of bounds`);
    }
    components.splice(i, 1);
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
