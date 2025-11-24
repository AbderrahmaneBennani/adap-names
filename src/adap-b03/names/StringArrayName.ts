import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { escapeComp, unescapeComp } from "./EscapeHelper";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {
  protected components: string[] = []; //escaped components

  constructor(source: string[], delimiter?: string) {
    super(delimiter);
    this.components = source.map((comp) =>
      escapeComp(comp, delimiter ? delimiter : this.delimiter)
    );
  }

  public clone(): Name {
    return new StringArrayName(this.components, this.delimiter);
  }

  // returns a human-readable representation of the Name (unescaped)
  public asString(delimiter: string = this.delimiter): string {
    let unescapedComponents = this.components.map((comp) =>
      unescapeComp(comp, this.delimiter)
    );
    return unescapedComponents.join(delimiter);
  }

  //returns a machine-readable representation of the Name (escaped)
  public asDataString(): string {
    return this.components.join(this.delimiter);
  }

  public getNoComponents(): number {
    return this.components.length;
  }

  //gets the escaped component at index i
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
