import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {
  protected delimiter: string = DEFAULT_DELIMITER;

  constructor(delimiter: string = DEFAULT_DELIMITER) {
    this.delimiter = delimiter ?? DEFAULT_DELIMITER;
  }

  public toString(): string {
    //Assert ClassInvariant
    //Assert asDataString() is valid here before returning (PostCondition)
    return this.asDataString();
  }

  abstract asDataString(): string;

  public isEqual(other: Name): boolean {
    //Assert ClassInvariant
    //Assert other is valid here before comparing (PreCondition)
    //Assert asDataString() is valid here before comparing (PreCondition)
    //Assert boolean result is valid here before returning (PostCondition)
    return this.asDataString() === other.asDataString();
  }

  public getHashCode(): number {
    //Assert ClassInvariant
    //Assert asDataString() is valid here before computing hash (PreCondition)
    //Assert number result is valid here before returning (PostCondition)
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

    return hash;
  }

  public isEmpty(): boolean {
    //Assert ClassInvariant
    //Assert boolean result is valid here before returning (PostCondition)
    return this.getNoComponents() === 0;
  }

  public getDelimiterCharacter(): string {
    //Assert ClassInvariant
    //Assert delimiter is valid here before returning (PostCondition)
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
    if (this.delimiter.length !== 1) {
      throw new Error(`Delimiter must be a single character`);
    }
    if (this.delimiter === ESCAPE_CHARACTER) {
      throw new Error(`Delimiter cannot be the escape character`);
    }
  }
}
