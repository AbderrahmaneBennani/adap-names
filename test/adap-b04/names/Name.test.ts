import { describe, it, expect } from "vitest";
import { StringName } from "../../../src/adap-b04/names/StringName";
import { StringArrayName } from "../../../src/adap-b04/names/StringArrayName";
import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";
import { InvalidStateException } from "../../../src/adap-b04/common/InvalidStateException";
import { ESCAPE_CHARACTER } from "../../../src/adap-b04/common/Printable";

describe("AbstractName Assertion Tests using StringName", () => {
  it("test constructor throws on null delimiter", () => {
    expect(() => {
      new StringName("valid.name", null as any);
    }).toThrow(IllegalArgumentException);
  });

  it("test constructor throws on empty delimiter", () => {
    expect(() => {
      new StringName("valid.name", "");
    }).toThrow(IllegalArgumentException);
  });

  it("test class invariant throws on invalid delimiter (length > 1)", () => {
    // This triggers assertClassInvariant
    expect(() => {
      new StringName("valid.name", "--");
    }).toThrow(InvalidStateException);
  });

  it("test class invariant throws if delimiter is the escape character", () => {
    expect(() => {
      new StringName("valid.name", ESCAPE_CHARACTER);
    }).toThrow(InvalidStateException);
  });
});

describe("StringName Assertion Tests", () => {
  it("test constructor throws on null source", () => {
    expect(() => {
      new StringName(null as any);
    }).toThrow(IllegalArgumentException);
  });

  it("test getComponent throws on index out of bounds", () => {
    const n = new StringName("oss.cs.fau.de");
    expect(() => n.getComponent(-1)).toThrow(IllegalArgumentException);
    expect(() => n.getComponent(4)).toThrow(IllegalArgumentException);
  });

  it("test setComponent throws on null component", () => {
    const n = new StringName("oss.cs.fau.de");
    expect(() => n.setComponent(1, null as any)).toThrow(
      IllegalArgumentException
    );
  });

  it("test setComponent throws on unescaped component input", () => {
    const n = new StringName("oss.cs.fau.de", ".");
    expect(() => n.setComponent(1, "bad.component")).toThrow(
      IllegalArgumentException
    );
  });

  it("test insert throws on index out of bounds", () => {
    const n = new StringName("oss.cs.fau.de");
    expect(() => n.insert(-1, "new")).toThrow(IllegalArgumentException);
    expect(() => n.insert(5, "new")).toThrow(IllegalArgumentException);
  });

  it("test remove throws on index out of bounds", () => {
    const n = new StringName("oss.cs.fau.de");
    expect(() => n.remove(-1)).toThrow(IllegalArgumentException);
    expect(() => n.remove(4)).toThrow(IllegalArgumentException);
  });

  it("test concat throws on null other", () => {
    const n = new StringName("oss.cs.fau.de");
    expect(() => n.concat(null as any)).toThrow(IllegalArgumentException);
  });

  it("test concat throws on delimiter mismatch", () => {
    const n1 = new StringName("oss.cs.fau.de", ".");
    const n2 = new StringName("oss#cs#fau#de", "#");
    expect(() => n1.concat(n2)).toThrow(IllegalArgumentException);
  });
});

describe("StringArrayName Assertion Tests", () => {
  it("test constructor throws on null source", () => {
    expect(() => {
      new StringArrayName(null as any);
    }).toThrow(IllegalArgumentException);
  });

  it("test constructor throws on empty source array", () => {
    expect(() => {
      new StringArrayName([]);
    }).toThrow(IllegalArgumentException);
  });

  it("test getComponent throws on index out of bounds", () => {
    const n = new StringArrayName(["oss", "fau"]);
    expect(() => n.getComponent(-1)).toThrow(IllegalArgumentException);
    expect(() => n.getComponent(2)).toThrow(IllegalArgumentException);
  });

  it("test setComponent throws on invalid type", () => {
    const n = new StringArrayName(["oss", "fau"]);
    expect(() => n.setComponent(0, 123 as any)).toThrow(
      IllegalArgumentException
    );
  });

  it("test append throws on null component", () => {
    const n = new StringArrayName(["oss", "fau"]);
    expect(() => n.append(null as any)).toThrow(IllegalArgumentException);
  });

  it("test remove throws on index out of bounds", () => {
    const n = new StringArrayName(["oss", "fau"]);
    expect(() => n.remove(10)).toThrow(IllegalArgumentException);
  });

  it("test assertClassInvariant ensures integrity", () => {
    // This requires forcing the object into an invalid state using 'any' to bypass 'private/protected'
    const n = new StringArrayName(["oss", "fau"]);
    (n as any).delimiter = ""; // Corrupting state

    // Any public method call should now trigger the invariant check
    expect(() => n.toString()).toThrow(InvalidStateException);
  });
});
