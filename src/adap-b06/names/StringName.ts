import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";
import { ESCAPE_CHARACTER } from "../common/Printable";
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

    //PreConditions
    IllegalArgumentException.assert(
      source != null,
      "Source cannot be null or undefined"
    );
    IllegalArgumentException.assert(
      source.length >= 0,
      "Source cannot be negative length"
    );

    this.name = source;
    let components = this.getComponents();
    this.noComponents = components.length;

    //PostConditions
    MethodFailedException.assert(
      this.name != null,
      "Name string cannot be null or undefined"
    );
    MethodFailedException.assert(
      this.noComponents > 0,
      "Number of components must be greater than zero"
    );

    this.assertClassInvariant();
  }

  /**
   * Parses the name string into escaped components.
   */
  private getComponents(): string[] {
    const esc = ESCAPE_CHARACTER;
    const del = this.delimiter;

    // Hide Escaped Delimiters
    let noEscapedDel = this.name.split(esc + del).join(StringName.TOKEN_DEL);

    // Safe Split by Delimiter
    const escapedComponents = noEscapedDel.split(del);

    // 4. Restore the Tokens (Keep them ESCAPED)
    let restoredComponents = escapedComponents.map((comp) => {
      let restored = comp;
      restored = restored.split(StringName.TOKEN_DEL).join(esc + del);
      return restored;
    });
    return restoredComponents;
  }

  public clone(): Name {
    this.assertClassInvariant();

    const result = new StringName(this.name, this.delimiter);

    //PostConditions
    MethodFailedException.assert(
      result != null && result != undefined,
      "Cloned Name cannot be null or undefined"
    );

    return result;
  }

  // returns a human-readable representation of the Name (unescaped)
  public asString(delimiter: string = this.delimiter): string {
    this.assertClassInvariant();

    //Preconditions
    IllegalArgumentException.assert(
      delimiter != null && delimiter != undefined,
      "Delimiter cannot be null or undefined"
    );
    IllegalArgumentException.assert(
      delimiter.length > 0,
      "Delimiter cannot be an empty string"
    );

    const components = this.getComponents();
    const result = components
      .map((comp) => unescapeComp(comp, this.delimiter))
      .join(delimiter);

    //PostConditions
    MethodFailedException.assert(
      result != null && result != undefined,
      "asString() returned null or undefined"
    );

    return result;
  }

  //returns a machine-readable representation of the Name (escaped)
  public asDataString(): string {
    this.assertClassInvariant();

    //postConditions
    MethodFailedException.assert(
      this.name != null && this.name != undefined,
      "asDataString() returned null or undefined"
    );

    return this.name;
  }

  public getNoComponents(): number {
    this.assertClassInvariant();

    //PostConditions
    MethodFailedException.assert(
      this.noComponents != null && this.noComponents != undefined,
      "getNoComponents() returned null or undefined"
    );
    return this.noComponents;
  }

  public getComponent(i: number): string {
    this.assertClassInvariant();

    //Preconditions
    IllegalArgumentException.assert(
      i != null && i != undefined,
      "Index cannot be null or undefined"
    );
    IllegalArgumentException.assert(
      i >= 0 && i < this.getNoComponents(),
      "Index out of bounds"
    );
    IllegalArgumentException.assert(
      typeof i === "number",
      "Index must be a number"
    );

    const components = this.getComponents();
    const result = components[i];

    //PostConditions
    MethodFailedException.assert(
      result != null && result != undefined,
      "getComponent() returned null or undefined"
    );
    MethodFailedException.assert(
      typeof result === "string",
      "getComponent() returned a non-string value"
    );

    return result;
  }

  public setComponent(i: number, c: string): StringName {
    this.assertClassInvariant();

    //PreConditions
    IllegalArgumentException.assert(
      i != null && i != undefined,
      "Index cannot be null or undefined"
    );
    IllegalArgumentException.assert(
      typeof i === "number",
      "Index must be a number"
    );
    IllegalArgumentException.assert(
      i >= 0 && i < this.getNoComponents(),
      "Index out of bounds"
    );
    IllegalArgumentException.assert(
      c != null && c != undefined,
      "Component cannot be null or undefined"
    );
    IllegalArgumentException.assert(
      typeof c === "string",
      "Component must be a string"
    );
    IllegalArgumentException.assert(
      escapeComp(unescapeComp(c, this.delimiter), this.delimiter) === c,
      "Component is not properly escaped"
    );

    const components = this.getComponents();
    components[i] = c;
    const newName = components.join(this.delimiter);
    const result = new StringName(newName, this.delimiter);

    //PostConditions
    MethodFailedException.assert(
      result.getComponent(i) === c,
      "setComponent() did not set the component correctly"
    );

    return result;
  }

  public insert(i: number, c: string): StringName {
    this.assertClassInvariant();

    //PreConditions
    IllegalArgumentException.assert(
      i != null && i != undefined,
      "Index cannot be null or undefined"
    );
    IllegalArgumentException.assert(
      typeof i === "number",
      "Index must be a number"
    );
    IllegalArgumentException.assert(
      i >= 0 && i <= this.getNoComponents(),
      "Index out of bounds"
    );
    IllegalArgumentException.assert(
      c != null && c != undefined,
      "Component cannot be null or undefined"
    );
    IllegalArgumentException.assert(
      typeof c === "string",
      "Component must be a string"
    );
    IllegalArgumentException.assert(
      escapeComp(unescapeComp(c, this.delimiter), this.delimiter) === c,
      "Component is not properly escaped"
    );

    const components = this.getComponents();
    let oldLength = components.length;
    components.splice(i, 0, c);
    const newName = components.join(this.delimiter);
    const result = new StringName(newName, this.delimiter);

    //PostConditions
    MethodFailedException.assert(
      result.getComponent(i) === c,
      "insert() did not insert the component correctly"
    );
    MethodFailedException.assert(
      result.getNoComponents() === oldLength + 1,
      "Number of components was not increased correctly"
    );

    return result;
  }

  public append(c: string): StringName {
    this.assertClassInvariant();

    //PreConditions
    IllegalArgumentException.assert(
      c != null && c != undefined,
      "Component cannot be null or undefined"
    );
    IllegalArgumentException.assert(
      typeof c === "string",
      "Component must be a string"
    );
    IllegalArgumentException.assert(
      escapeComp(unescapeComp(c, this.delimiter), this.delimiter) === c,
      "Component is not properly escaped"
    );

    const components = this.getComponents();
    let oldLength = components.length;
    components.push(c);
    const newName = components.join(this.delimiter);
    const result = new StringName(newName, this.delimiter);

    //PostConditions
    MethodFailedException.assert(
      result.getNoComponents() === oldLength + 1,
      "Number of components was not increased correctly"
    );
    MethodFailedException.assert(
      result.getComponent(result.getNoComponents() - 1) === c,
      "append() did not append the component correctly"
    );

    return result;
  }

  public remove(i: number): StringName {
    this.assertClassInvariant();

    //PreConditions
    IllegalArgumentException.assert(
      i != null && i != undefined,
      "Index cannot be null or undefined"
    );
    IllegalArgumentException.assert(
      typeof i === "number",
      "Index must be a number"
    );
    IllegalArgumentException.assert(
      i >= 0 && i < this.getNoComponents(),
      "Index out of bounds"
    );

    const components = this.getComponents();
    let oldLength = components.length;
    components.splice(i, 1);
    const newName = components.join(this.delimiter);
    const result = new StringName(newName, this.delimiter);

    //PostConditions
    MethodFailedException.assert(
      result.getNoComponents() === oldLength - 1,
      "Number of components was not decreased correctly"
    );

    return result;
  }

  public concat(other: Name): StringName {
    this.assertClassInvariant();

    //PreConditions
    IllegalArgumentException.assert(
      other != null && other != undefined,
      "Other Name cannot be null or undefined"
    );
    IllegalArgumentException.assert(
      other.getDelimiterCharacter() === this.delimiter,
      "Other Name has a different delimiter"
    );

    let oldLength = this.getNoComponents();
    const components = this.getComponents();
    for (let i = 0; i < other.getNoComponents(); i++) {
      components.push(other.getComponent(i));
    }
    const newName = components.join(this.delimiter);
    const result = new StringName(newName, this.delimiter);

    //PostConditions
    MethodFailedException.assert(
      result.getNoComponents() === oldLength + other.getNoComponents(),
      "Components length was not increased correctly"
    );

    return result;
  }

  protected assertClassInvariant(): void {
    super.assertClassInvariant();
    InvalidStateException.assert(
      this.getComponents().length === this.noComponents,
      "Components length does not match number of components"
    );
    //Allows empty and null components, but not undefined
    InvalidStateException.assert(
      this.getComponents().every((comp) => comp !== undefined),
      "Components contains undefined values"
    );
    InvalidStateException.assert(
      this.name != null,
      "Name string cannot be null or undefined"
    );
    InvalidStateException.assert(
      this.noComponents > 0,
      "There are no components in the Name"
    );
  }
}
