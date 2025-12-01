import { Name } from "../names/Name";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Node {
  protected baseName: string = "";
  protected parentNode: Directory;

  constructor(bn: string, pn: Directory) {
    //Preconditions
    IllegalArgumentException.assert(bn !== null, "Base name must not be null.");
    IllegalArgumentException.assert(
      bn.length > 0,
      "Base name must not be empty."
    );
    IllegalArgumentException.assert(
      pn !== null,
      "Parent node must not be null."
    );
    IllegalArgumentException.assert(
      pn instanceof Directory,
      "Parent is not a directory."
    );
    this.doSetBaseName(bn);
    this.parentNode = pn; // why oh why do I have to set this
    this.initialize(pn);
  }

  protected initialize(pn: Directory): void {
    //Preconditions
    IllegalArgumentException.assert(
      pn !== null,
      "Parent node must not be null."
    );
    IllegalArgumentException.assert(
      pn instanceof Directory,
      "Parent is not a directory."
    );
    this.parentNode = pn;
    this.parentNode.addChildNode(this);
  }

  public move(to: Directory): void {
    //Preconditions
    IllegalArgumentException.assert(
      to !== null,
      "Target directory must not be null."
    );
    IllegalArgumentException.assert(
      to instanceof Directory,
      "Target is not a directory."
    );
    this.parentNode.removeChildNode(this);
    to.addChildNode(this);
    this.parentNode = to;
  }

  public getFullName(): Name {
    const result: Name = this.parentNode.getFullName();
    result.append(this.getBaseName());
    return result;
  }

  public getBaseName(): string {
    return this.doGetBaseName();
  }

  protected doGetBaseName(): string {
    return this.baseName;
  }

  public rename(bn: string): void {
    //Preconditions
    IllegalArgumentException.assert(bn !== null, "Base name must not be null.");
    IllegalArgumentException.assert(
      bn.length > 0,
      "Base name must not be empty."
    );
    this.doSetBaseName(bn);
  }

  protected doSetBaseName(bn: string): void {
    //Preconditions
    IllegalArgumentException.assert(bn !== null, "Base name must not be null.");
    IllegalArgumentException.assert(
      bn.length > 0,
      "Base name must not be empty."
    );
    this.baseName = bn;
  }

  public getParentNode(): Directory {
    return this.parentNode;
  }
}
