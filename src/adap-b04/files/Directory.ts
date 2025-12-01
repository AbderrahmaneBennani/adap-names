import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { Node } from "./Node";

export class Directory extends Node {
  protected childNodes: Set<Node> = new Set<Node>();

  constructor(bn: string, pn: Directory) {
    super(bn, pn);
    //Preconditions
    IllegalArgumentException.assert(bn !== null, "Base name must not be null.");
    IllegalArgumentException.assert(
      bn.length > 0,
      "Base name must not be empty."
    );
    IllegalArgumentException.assert(
      pn !== null,
      "Parent directory must not be null."
    );
    IllegalArgumentException.assert(
      pn instanceof Directory,
      "Parent is not a directory."
    );
  }

  public hasChildNode(cn: Node): boolean {
    //Preconditions
    IllegalArgumentException.assert(
      cn !== null,
      "Child node must not be null."
    );
    IllegalArgumentException.assert(cn instanceof Node, "Child is not a node.");
    return this.childNodes.has(cn);
  }

  public addChildNode(cn: Node): void {
    //Preconditions
    IllegalArgumentException.assert(
      cn !== null,
      "Child node must not be null."
    );
    IllegalArgumentException.assert(cn instanceof Node, "Child is not a node.");
    this.childNodes.add(cn);
  }

  public removeChildNode(cn: Node): void {
    //Preconditions
    IllegalArgumentException.assert(
      cn !== null,
      "Child node must not be null."
    );
    IllegalArgumentException.assert(cn instanceof Node, "Child is not a node.");
    this.childNodes.delete(cn); // Yikes! Should have been called remove
  }
}
