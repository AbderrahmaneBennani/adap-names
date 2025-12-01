import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

enum FileState {
  OPEN,
  CLOSED,
  DELETED,
}

export class File extends Node {
  protected state: FileState = FileState.CLOSED;

  constructor(baseName: string, parent: Directory) {
    super(baseName, parent);
    //Preconditions
    IllegalArgumentException.assert(
      baseName !== null,
      "Base name must not be null."
    );
    IllegalArgumentException.assert(
      baseName.length > 0,
      "Base name must not be empty."
    );
    IllegalArgumentException.assert(
      parent !== null,
      "Parent directory must not be null."
    );
    IllegalArgumentException.assert(
      parent instanceof Directory,
      "Parent is not a directory."
    );
  }

  public open(): void {
    //Preconditions
    IllegalArgumentException.assert(
      this.state === FileState.CLOSED,
      "File must be closed to open."
    );
    this.state = FileState.OPEN;
  }

  public read(noBytes: number): Int8Array {
    //Preconditions
    IllegalArgumentException.assert(
      this.state === FileState.OPEN,
      "File must be open to read."
    );
    IllegalArgumentException.assert(
      noBytes > 0,
      "Number of bytes to read must be positive."
    );
    // read something
    return new Int8Array();
  }

  public write(data: Int8Array): void {
    //Preconditions
    IllegalArgumentException.assert(
      this.state === FileState.OPEN,
      "File must be open to write."
    );
    IllegalArgumentException.assert(
      data !== null,
      "Data to write must not be null."
    );
    // write something
  }

  public close(): void {
    //Preconditions
    IllegalArgumentException.assert(
      this.state === FileState.OPEN,
      "File must be open to close."
    );

    this.state = FileState.CLOSED;
  }

  protected doGetFileState(): FileState {
    return this.state;
  }
}
