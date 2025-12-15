import { describe, it, expect } from "vitest";
import { StringName } from "../../../src/adap-b06/names/StringName";
import { StringArrayName } from "../../../src/adap-b06/names/StringArrayName";
import { IllegalArgumentException } from "../../../src/adap-b06/common/IllegalArgumentException";
import { InvalidStateException } from "../../../src/adap-b06/common/InvalidStateException";
import { ESCAPE_CHARACTER } from "../../../src/adap-b06/common/Printable";

describe("StringName Immutability Tests", () => {
  it("append returns new instance and leaves original unchanged", () => {
    const original = new StringName("oss.cs.fau", ".");
    const modified = original.append("de");

    expect(original.asDataString()).toBe("oss.cs.fau");
    expect(modified.asDataString()).toBe("oss.cs.fau.de");
    expect(original).not.toBe(modified);
  });

  it("remove returns new instance and leaves original unchanged", () => {
    const original = new StringName("oss.cs.fau.de", ".");
    const modified = original.remove(0);

    expect(original.asDataString()).toBe("oss.cs.fau.de");
    expect(modified.asDataString()).toBe("cs.fau.de");
    expect(original).not.toBe(modified);
  });
});

describe("StringArrayName Immutability Tests", () => {
  it("insert returns new instance and leaves original unchanged", () => {
    const original = new StringArrayName(["oss", "fau", "de"], ".");
    const modified = original.insert(1, "cs");

    expect(original.asDataString()).toBe("oss.fau.de");
    expect(modified.asDataString()).toBe("oss.cs.fau.de");
    expect(original).not.toBe(modified);
  });

  it("setComponent returns new instance and leaves original unchanged", () => {
    const original = new StringArrayName(["oss", "cs", "fau", "de"], ".");
    const modified = original.setComponent(0, "www");

    expect(original.asDataString()).toBe("oss.cs.fau.de");
    expect(modified.asDataString()).toBe("www.cs.fau.de");
    expect(original).not.toBe(modified);
  });
});

describe("Equality Contract Tests", () => {
  it("test equality between StringName and StringArrayName", () => {
    const sn = new StringName("oss.cs.fau.de", ".");
    const san = new StringArrayName(["oss", "cs", "fau", "de"], ".");

    expect(sn.isEqual(san)).toBe(true);
    expect(san.isEqual(sn)).toBe(true);
  });

  it("test inequality on different delimiters", () => {
    const n1 = new StringName("a.b", ".");
    const n2 = new StringName("a#b", "#");
    expect(n1.isEqual(n2)).toBe(false);
  });

  it("test inequality on different content", () => {
    const n1 = new StringName("a.b", ".");
    const n2 = new StringName("a.c", ".");
    expect(n1.isEqual(n2)).toBe(false);
  });
});

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

  it("test append throws on null component", () => {
    const n = new StringArrayName(["oss", "fau"]);
    expect(() => n.append(null as any)).toThrow(IllegalArgumentException);
  });

  it("test remove throws on index out of bounds", () => {
    const n = new StringArrayName(["oss", "fau"]);
    expect(() => n.remove(10)).toThrow(IllegalArgumentException);
  });
});
