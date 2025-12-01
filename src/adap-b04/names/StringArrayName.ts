import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";
import { escapeComp, unescapeComp } from "./EscapeHelper";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {
  protected components: string[] = []; //escaped components

  constructor(source: string[], delimiter?: string) {
    super(delimiter);
    //Preconditions
    IllegalArgumentException.assert(
      source != null && source != undefined,
      "Source cannot be null or undefined"
    );
    IllegalArgumentException.assert(
      source.length > 0,
      "Source cannot be empty"
    );

    this.components = source.map((comp) =>
      escapeComp(comp, delimiter ? delimiter : this.delimiter)
    );

    //PostConditions
    MethodFailedException.assert(
      this.components != null && this.components != undefined,
      "Components cannot be null or undefined"
    );
    MethodFailedException.assert(
      this.components.length === source.length,
      "Components length does not match source length"
    );

    this.assertClassInvariant();
  }

  public clone(): Name {
    this.assertClassInvariant();

    const result = new StringArrayName(this.components, this.delimiter);

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

    let unescapedComponents = this.components.map((comp) =>
      unescapeComp(comp, this.delimiter)
    );
    const result = unescapedComponents.join(delimiter);

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

    const result = this.components.join(this.delimiter);

    //PostConditions
    MethodFailedException.assert(
      result != null && result != undefined,
      "asDataString() returned null or undefined"
    );
    return result;
  }

  public getNoComponents(): number {
    this.assertClassInvariant();

    const result = this.components.length;

    //PostConditions
    MethodFailedException.assert(
      result != null && result != undefined,
      "getNoComponents() returned null or undefined"
    );
    MethodFailedException.assert(
      typeof result === "number",
      "getNoComponents() returned a non-number value"
    );

    return result;
  }

  //gets the escaped component at index i
  public getComponent(i: number): string {
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

    const result = this.components[i];

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

  public setComponent(i: number, c: string) {
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

    this.components[i] = c;

    //PostConditions
    MethodFailedException.assert(
      this.components[i] === c,
      "Component was not set correctly"
    );

    this.assertClassInvariant();
  }

  public insert(i: number, c: string) {
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

    let oldLength = this.getNoComponents();
    this.components.splice(i, 0, c);

    //PostConditions
    MethodFailedException.assert(
      this.components[i] === c,
      "Component was not inserted correctly"
    );
    MethodFailedException.assert(
      this.getNoComponents() === oldLength + 1,
      "Components length was not increased correctly"
    );

    this.assertClassInvariant();
  }

  public append(c: string) {
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

    let oldLength = this.getNoComponents();
    this.components.push(c);

    //PostConditions
    MethodFailedException.assert(
      this.components[this.getNoComponents() - 1] === c,
      "Component was not appended correctly"
    );
    MethodFailedException.assert(
      this.getNoComponents() === oldLength + 1,
      "Components length was not increased correctly"
    );

    this.assertClassInvariant();
  }

  public remove(i: number) {
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
    if (i < 0 || i >= this.getNoComponents()) {
      throw new Error(`Index out of bounds`);
    }

    let oldLength = this.getNoComponents();
    this.components.splice(i, 1);

    //PostConditions
    MethodFailedException.assert(
      this.getNoComponents() === oldLength - 1,
      "Components length was not decreased correctly"
    );

    this.assertClassInvariant();
  }

  public concat(other: Name): void {
    this.assertClassInvariant();
    //PreConditions
    IllegalArgumentException.assert(
      other != null && other != undefined,
      "Other Name cannot be null or undefined"
    );
    IllegalArgumentException.assert(
      other.getDelimiterCharacter() === this.delimiter,
      "Other Name delimiter does not match"
    );

    let oldLength = this.getNoComponents();
    for (let i = 0; i < other.getNoComponents(); i++) {
      this.components.push(other.getComponent(i));
    }

    //PostConditions
    MethodFailedException.assert(
      this.getNoComponents() === oldLength + other.getNoComponents(),
      "Components length was not increased correctly"
    );

    this.assertClassInvariant();
  }

  protected assertClassInvariant(): void {
    super.assertClassInvariant();
    InvalidStateException.assert(
      this.components.length > 0,
      "Components length must be greater than 0"
    );
    //Allows empty and null components, but not undefined
    InvalidStateException.assert(
      this.components.every((comp) => comp !== undefined),
      "Components contains undefined values"
    );
  }
}
