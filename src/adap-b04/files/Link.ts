import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Link extends Node {
  protected targetNode: Node | null = null;

  constructor(bn: string, pn: Directory, tn?: Node) {
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
    IllegalArgumentException.assert(
      tn === undefined || tn instanceof Node,
      "Target is not a node."
    );
    if (tn != undefined) {
      this.targetNode = tn;
    }
  }

  public getTargetNode(): Node | null {
    return this.targetNode;
  }

  public setTargetNode(target: Node): void {
    //Preconditions
    IllegalArgumentException.assert(
      target !== null,
      "Target node must not be null."
    );
    IllegalArgumentException.assert(
      target instanceof Node,
      "Target is not a node."
    );
    this.targetNode = target;
  }

  public getBaseName(): string {
    const target = this.ensureTargetNode(this.targetNode);
    return target.getBaseName();
  }

  public rename(bn: string): void {
    const target = this.ensureTargetNode(this.targetNode);
    target.rename(bn);
  }

  protected ensureTargetNode(target: Node | null): Node {
    const result: Node = this.targetNode as Node;
    return result;
  }
}
