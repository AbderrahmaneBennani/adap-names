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

    const unescaped = this.components.map((c) =>
      unescapeComp(c, this.delimiter)
    );
    const result = new StringArrayName(unescaped, this.delimiter);

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

  public setComponent(i: number, c: string): StringArrayName {
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

    const unescaped = this.components.map((k) =>
      unescapeComp(k, this.delimiter)
    );
    unescaped[i] = unescapeComp(c, this.delimiter);
    const result = new StringArrayName(unescaped, this.delimiter);

    //PostConditions
    MethodFailedException.assert(
      result.getComponent(i) === c,
      "Component was not set correctly"
    );

    return result;
  }

  public insert(i: number, c: string): StringArrayName {
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
    const unescaped = this.components.map((k) =>
      unescapeComp(k, this.delimiter)
    );
    unescaped.splice(i, 0, unescapeComp(c, this.delimiter));
    const result = new StringArrayName(unescaped, this.delimiter);

    //PostConditions
    MethodFailedException.assert(
      result.getComponent(i) === c,
      "Component was not inserted correctly"
    );
    MethodFailedException.assert(
      result.getNoComponents() === oldLength + 1,
      "Components length was not increased correctly"
    );

    return result;
  }

  public append(c: string): StringArrayName {
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
    const unescaped = this.components.map((k) =>
      unescapeComp(k, this.delimiter)
    );
    unescaped.push(unescapeComp(c, this.delimiter));
    const result = new StringArrayName(unescaped, this.delimiter);

    //PostConditions
    MethodFailedException.assert(
      result.getComponent(result.getNoComponents() - 1) === c,
      "Component was not appended correctly"
    );
    MethodFailedException.assert(
      result.getNoComponents() === oldLength + 1,
      "Components length was not increased correctly"
    );

    return result;
  }

  public remove(i: number): StringArrayName {
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
    const unescaped = this.components.map((k) =>
      unescapeComp(k, this.delimiter)
    );
    unescaped.splice(i, 1);
    const result = new StringArrayName(unescaped, this.delimiter);

    //PostConditions
    MethodFailedException.assert(
      result.getNoComponents() === oldLength - 1,
      "Components length was not decreased correctly"
    );

    return result;
  }

  public concat(other: Name): StringArrayName {
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
    const unescaped = this.components.map((k) =>
      unescapeComp(k, this.delimiter)
    );
    for (let i = 0; i < other.getNoComponents(); i++) {
      unescaped.push(
        unescapeComp(other.getComponent(i), other.getDelimiterCharacter())
      );
    }
    const result = new StringArrayName(unescaped, this.delimiter);

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
