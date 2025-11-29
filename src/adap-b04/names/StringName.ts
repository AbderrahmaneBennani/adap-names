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
    //Assert ClassInvariant
    //Assert source is valid here before proceeding (PreCondition)
    //Assert delimiter is valid here before proceeding (PreCondition)
    this.name = source;

    this.noComponents = this.getComponents().length;

    //Assert noComponents is valid here after proceeding (PostCondition)
    //Assert ClassInvariant
  }

  /**
   * Parses the name string into escaped components.
   */
  private getComponents(): string[] {
    //Assert ClassInvariant
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

    //Assert result is valid here before returning (PostCondition)
  }

  public clone(): Name {
    //Assert ClassInvariant
    //Assert new Name is valid here before returning (PostCondition)
    return new StringName(this.name, this.delimiter);
  }

  // returns a human-readable representation of the Name (unescaped)
  public asString(delimiter: string = this.delimiter): string {
    //Assert ClassInvariant
    //Assert delimiter is valid here before proceeding (PreCondition)
    const components = this.getComponents();
    //Assert result is valid here before returning (PostCondition)
    return components
      .map((c) => unescapeComp(c, this.delimiter))
      .join(delimiter);
  }

  //returns a machine-readable representation of the Name (escaped)
  public asDataString(): string {
    //Assert ClassInvariant
    //Assert result is valid here before returning (PostCondition)
    return this.name;
  }

  public getNoComponents(): number {
    //Assert ClassInvariant
    //Assert number result is valid here before returning (PostCondition)
    return this.noComponents;
  }

  public getComponent(i: number): string {
    //Assert ClassInvariant
    //Assert i is valid here before proceeding (PreCondition)
    const components = this.getComponents();
    if (i < 0 || i >= components.length) {
      throw new Error(`Index out of bounds`);
    }
    //Assert result is valid here before returning (PostCondition)
    return components[i];
  }

  public setComponent(i: number, c: string) {
    //Assert ClassInvariant
    //Assert i is valid here before proceeding (PreCondition)
    //Assert c is valid here before proceeding (PreCondition)
    //Assert c is properly masked here before proceeding (PreCondition)
    const components = this.getComponents();
    if (i < 0 || i >= components.length) {
      throw new Error(`Index out of bounds`);
    }
    components[i] = c;
    this.name = components.join(this.delimiter);
    //Assert component c is properly set at index i here after proceeding (PostCondition)
    //Assert ClassInvariant
  }

  public insert(i: number, c: string) {
    //Assert ClassInvariant
    //Assert i is valid here before proceeding (PreCondition)
    //Assert c is valid here before proceeding (PreCondition)
    //Assert c is properly masked here before proceeding (PreCondition)
    const components = this.getComponents();
    if (i < 0 || i > components.length) {
      throw new Error(`Index out of bounds`);
    }
    components.splice(i, 0, c);
    this.name = components.join(this.delimiter);
    this.noComponents++;
    //Assert component c is properly inserted at index i here after proceeding (PostCondition)
    //Assert ClassInvariant
  }

  public append(c: string) {
    //Assert ClassInvariant
    //Assert c is valid here before proceeding (PreCondition)
    //Assert c is properly masked here before proceeding (PreCondition)
    const components = this.getComponents();
    components.push(c);
    this.name = components.join(this.delimiter);
    this.noComponents++;
    //Assert component c is properly appended here after proceeding (PostCondition)
    //Assert ClassInvariant
  }

  public remove(i: number) {
    //Assert ClassInvariant
    //Assert i is valid here before proceeding (PreCondition)
    const components = this.getComponents();
    if (i < 0 || i >= components.length) {
      throw new Error(`Index out of bounds`);
    }
    components.splice(i, 1);
    this.name = components.join(this.delimiter);
    this.noComponents--;
    //Assert component at index i is properly removed here after proceeding (PostCondition)
    //Assert ClassInvariant
  }

  public concat(other: Name): void {
    //Assert ClassInvariant
    //Assert other is valid here before proceeding (PreCondition)
    //Assert delimiter of other matches this delimiter here before proceeding (PreCondition)
    for (let i = 0; i < other.getNoComponents(); i++) {
      this.append(other.getComponent(i));
    }
    //Assert components length is increased by other's length here after proceeding (PostCondition)
    //Assert ClassInvariant
  }
}
