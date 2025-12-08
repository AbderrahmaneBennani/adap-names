import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {
  protected delimiter: string = DEFAULT_DELIMITER;

  constructor(delimiter: string = DEFAULT_DELIMITER) {
    //Preconditions
    IllegalArgumentException.assert(
      delimiter != null && delimiter != undefined,
      "Delimiter cannot be null or undefined"
    );
    IllegalArgumentException.assert(
      delimiter.length > 0,
      "Delimiter cannot be an empty string"
    );
    this.delimiter = delimiter;
  }

  public toString(): string {
    this.assertClassInvariant();

    const s = this.asDataString();

    //PostCondition
    MethodFailedException.assert(
      s != null,
      "toString() returned null or undefined"
    );

    return s;
  }

  abstract asDataString(): string;

  public isEqual(other: Name): boolean {
    this.assertClassInvariant();

    //PreConditions
    IllegalArgumentException.assert(
      other != null,
      "Other Name cannot be null or undefined"
    );
    IllegalArgumentException.assert(
      this.getDelimiterCharacter() === other.getDelimiterCharacter(),
      "Delimiter characters do not match"
    );
    IllegalArgumentException.assert(
      other.asDataString() != null,
      "Other Name cannot be null or undefined"
    );

    const result = this.asDataString() === other.asDataString();

    //PostConditions
    MethodFailedException.assert(
      result != null,
      "isEqual() returned null or undefined"
    );
    MethodFailedException.assert(
      typeof result === "boolean",
      "isEqual() returned a non-boolean value"
    );
    return result;
  }

  public getHashCode(): number {
    this.assertClassInvariant();

    //PreConditions
    IllegalArgumentException.assert(
      this.asDataString() != null,
      "asDataString() returned null or undefined"
    );

    const s = this.asDataString();
    let hash = 0;

    if (s.length === 0) {
      return hash;
    }

    for (let i = 0; i < s.length; i++) {
      const char = s.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }

    //PostConditions
    MethodFailedException.assert(
      hash != null,
      "getHashCode() returned null or undefined"
    );

    return hash;
  }

  public isEmpty(): boolean {
    this.assertClassInvariant();

    const result = this.getNoComponents() === 0;

    //PostConditions
    MethodFailedException.assert(
      result != null,
      "isEmpty() returned null or undefined"
    );
    MethodFailedException.assert(
      typeof result === "boolean",
      "isEmpty() returned a non-boolean value"
    );

    return result;
  }

  public getDelimiterCharacter(): string {
    this.assertClassInvariant();

    //PostCondition
    MethodFailedException.assert(
      this.delimiter != null,
      "getDelimiterCharacter() returned null or undefined"
    );

    return this.delimiter;
  }

  abstract clone(): Name;

  abstract asString(delimiter: string): string;

  abstract getNoComponents(): number;

  abstract getComponent(i: number): string;
  abstract setComponent(i: number, c: string): void;

  abstract insert(i: number, c: string): void;
  abstract append(c: string): void;
  abstract remove(i: number): void;

  abstract concat(other: Name): void;

  protected assertClassInvariant(): void {
    InvalidStateException.assert(
      this.delimiter.length !== 0,
      "Delimiter cannot be an empty string"
    );
    InvalidStateException.assert(
      this.delimiter !== ESCAPE_CHARACTER,
      "Delimiter cannot be the escape character"
    );
    InvalidStateException.assert(
      this.delimiter.length === 1,
      "Delimiter must be a single character"
    );
  }
}
