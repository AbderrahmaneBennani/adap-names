import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { escapeComp, unescapeComp } from "./EscapeHelper";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {
  protected name: string = ""; //raw string with escaped components
  protected noComponents: number = 0;

  // We use this to hide escaped characters temporarily during splitting.
  private static readonly TOKEN_DEL = "___DEL_TOKEN___";

  constructor(source: string, delimiter?: string) {
    super(delimiter);
    this.name = source;

    this.noComponents = this.getComponents().length;
  }

  /**
   * Parses the name string into escaped components.
   */
  private getComponents(): string[] {
    if (!this.name) return [""];

    const esc = ESCAPE_CHARACTER;
    const del = this.delimiter;

    // Hide Escaped Delimiters
    let noEscapedDel = this.name.split(esc + del).join(StringName.TOKEN_DEL);

    // Safe Split by Delimiter
    const escapedComponents = noEscapedDel.split(del);

    // 4. Restore the Tokens (Keep them ESCAPED)
    return escapedComponents.map((comp) => {
      let restored = comp;
      restored = restored.split(StringName.TOKEN_DEL).join(esc + del);
      return restored;
    });
  }

  public clone(): Name {
    return new StringName(this.name, this.delimiter);
  }

  // returns a human-readable representation of the Name (unescaped)
  public asString(delimiter: string = this.delimiter): string {
    const components = this.getComponents();

    return components
      .map((c) => unescapeComp(c, this.delimiter))
      .join(delimiter);
  }

  //returns a machine-readable representation of the Name (escaped)
  public asDataString(): string {
    return this.name;
  }

  public getNoComponents(): number {
    return this.noComponents;
  }

  public getComponent(i: number): string {
    const components = this.getComponents();
    if (i < 0 || i >= components.length) {
      throw new Error(`Index out of bounds`);
    }
    return components[i];
  }

  public setComponent(i: number, c: string) {
    const components = this.getComponents();
    if (i < 0 || i >= components.length) {
      throw new Error(`Index out of bounds`);
    }
    components[i] = c;
    this.name = components.join(this.delimiter);
  }

  public insert(i: number, c: string) {
    const components = this.getComponents();
    if (i < 0 || i > components.length) {
      throw new Error(`Index out of bounds`);
    }
    components.splice(i, 0, c);
    this.name = components.join(this.delimiter);
    this.noComponents++;
  }

  public append(c: string) {
    const components = this.getComponents();
    components.push(c);
    this.name = components.join(this.delimiter);
    this.noComponents++;
  }

  public remove(i: number) {
    const components = this.getComponents();
    if (i < 0 || i >= components.length) {
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
  }
}
