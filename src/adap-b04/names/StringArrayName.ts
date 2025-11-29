import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { escapeComp, unescapeComp } from "./EscapeHelper";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {
  protected components: string[] = []; //escaped components

  constructor(source: string[], delimiter?: string) {
    super(delimiter);
    //Assert ClassInvariant
    //Assert source is valid here before proceeding (PreCondition)
    //Assert delimiter is valid here before proceeding (PreCondition)
    this.components = source.map((comp) =>
      escapeComp(comp, delimiter ? delimiter : this.delimiter)
    );
    //Assert components is valid here after proceeding (PostCondition)
    //Assert components length matches source length here after proceeding (PostCondition)
    //Assert ClassInvariant
  }

  public clone(): Name {
    //Assert ClassInvariant
    //Assert new Name is valid here before returning (PostCondition)
    return new StringArrayName(this.components, this.delimiter);
  }

  // returns a human-readable representation of the Name (unescaped)
  public asString(delimiter: string = this.delimiter): string {
    //Assert ClassInvariant
    //Assert delimiter is valid here before proceeding (PreCondition)
    let unescapedComponents = this.components.map((comp) =>
      unescapeComp(comp, this.delimiter)
    );
    //Assert result is valid here before returning (PostCondition)
    return unescapedComponents.join(delimiter);
  }

  //returns a machine-readable representation of the Name (escaped)
  public asDataString(): string {
    //Assert ClassInvariant
    //Assert result is valid here before returning (PostCondition)
    return this.components.join(this.delimiter);
  }

  public getNoComponents(): number {
    //Assert ClassInvariant
    //Assert number result is valid here before returning (PostCondition)
    return this.components.length;
  }

  //gets the escaped component at index i
  public getComponent(i: number): string {
    //Assert ClassInvariant
    //Assert i is valid here before proceeding (PreCondition)
    if (i < 0 || i >= this.getNoComponents()) {
      throw new Error(`Index out of bounds`);
    }
    //Assert result is valid here before returning (PostCondition)
    return this.components[i];
  }

  public setComponent(i: number, c: string) {
    //Assert ClassInvariant
    //Assert i is valid here before proceeding (PreCondition)
    //Assert c is valid here before proceeding (PreCondition)
    //Assert c is properly masked here before proceeding (PreCondition)
    if (i < 0 || i >= this.getNoComponents()) {
      throw new Error(`Index out of bounds`);
    }
    this.components[i] = c;
    //Assert component at index i is properly set here after proceeding (PostCondition)
    //Assert components length remains unchanged here after proceeding (PostCondition)
    //Assert ClassInvariant
  }

  public insert(i: number, c: string) {
    //Assert ClassInvariant
    //Assert i is valid here before proceeding (PreCondition)
    //Assert c is valid here before proceeding (PreCondition)
    //Assert c is properly masked here before proceeding (PreCondition)
    if (i < 0 || i > this.getNoComponents()) {
      throw new Error(`Index out of bounds`);
    }
    this.components.splice(i, 0, c);
    //Assert component c is properly inserted at index i here after proceeding (PostCondition)
    //Assert components length is increased by one here after proceeding (PostCondition)
    //Assert ClassInvariant
  }

  public append(c: string) {
    //Assert ClassInvariant
    //Assert c is valid here before proceeding (PreCondition)
    //Assert c is properly masked here before proceeding (PreCondition)
    this.components.push(c);
    //Assert component c is properly appended here after proceeding (PostCondition)
    //Assert components length is increased by one here after proceeding (PostCondition)
    //Assert ClassInvariant
  }

  public remove(i: number) {
    //Assert ClassInvariant
    //Assert i is valid here before proceeding (PreCondition)
    if (i < 0 || i >= this.getNoComponents()) {
      throw new Error(`Index out of bounds`);
    }
    this.components.splice(i, 1);
    //Assert component at index i is properly removed here after proceeding (PostCondition)
    //Assert components length is decreased by one here after proceeding (PostCondition)
    //Assert ClassInvariant
  }

  public concat(other: Name): void {
    //Assert ClassInvariant
    //Assert other is valid here before proceeding (PreCondition)
    //Assert delimiter of other matches this delimiter here before proceeding (PreCondition)
    for (let i = 0; i < other.getNoComponents(); i++) {
      this.components.push(other.getComponent(i));
    }
    //Assert components length is increased by other's length here after proceeding (PostCondition)
    //Assert ClassInvariant
  }
}
