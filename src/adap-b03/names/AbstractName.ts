import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {
  protected delimiter: string = DEFAULT_DELIMITER;

  constructor(delimiter: string = DEFAULT_DELIMITER) {
    this.delimiter = delimiter ?? DEFAULT_DELIMITER;
  }

  public toString(): string {
    return this.asDataString();
  }

  abstract asDataString(): string;

  public isEqual(other: Name): boolean {
    return this.asDataString() === other.asDataString();
  }

  public getHashCode(): number {
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
    return this.getNoComponents() === 0;
  }

  public getDelimiterCharacter(): string {
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
}
