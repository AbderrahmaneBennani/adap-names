import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { ServiceFailureException } from "../common/ServiceFailureException";

import { Name } from "../names/Name";
import { Directory } from "./Directory";

export class Node {
  protected baseName: string = "";
  protected parentNode: Directory;

  constructor(bn: string, pn: Directory) {
    this.doSetBaseName(bn);
    this.parentNode = pn; // why oh why do I have to set this
    this.initialize(pn);
  }

  protected initialize(pn: Directory): void {
    this.parentNode = pn;
    this.parentNode.addChildNode(this);
  }

  public move(to: Directory): void {
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
    this.doSetBaseName(bn);
  }

  protected doSetBaseName(bn: string): void {
    this.baseName = bn;
  }

  public getParentNode(): Directory {
    return this.parentNode;
  }

  /**
   * Returns all nodes in the tree that match bn
   * @param bn basename of node being searched for
   */

  public findNodes(bn: string): Set<Node> {
    try {
      const results = new Set<Node>();

      const root = this.getRoot();

      (root as any).collectNodes(bn, results);

      return results;
    } catch (error) {
      if (error instanceof InvalidStateException) {
        throw new ServiceFailureException(
          "Search failed due to corrupted file state",
          error
        );
      }
      throw error;
    }
  }

  protected getRoot(): Node {
    // Stop if no parent OR if parent is self (infinite loop protection)
    if (!this.parentNode || this.parentNode === (this as any)) {
      return this;
    }
    return this.parentNode.getRoot();
  }

  /**
   * Recursive Step & Validation
   */
  protected collectNodes(bn: string, results: Set<Node>): void {
    const currentName = this.getBaseName();

    const isRoot = !this.parentNode || this.parentNode === (this as any);

    if (currentName === "" && !isRoot) {
      throw new InvalidStateException(
        "File state corrupted: BaseName is empty"
      );
    }

    if (currentName === bn) {
      results.add(this);
    }
  }
}
