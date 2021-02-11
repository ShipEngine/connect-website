const {
  parseKeyValuePairs,
  parseIndependentKeyValuePairs,
  tryParseTuple
} = require("../../../../lib/core/utils/parse-key-value-pairs");

const {expect} = require("chai");

describe("key-value-pair parser", () => {
  describe("tryParseTuple", () => {
    it("can parse key=value", () => {
      const kvp = tryParseTuple("key=value")

      expect(kvp).to.not.be.null;
      expect(kvp.key).equal("key");
      expect(kvp.value).equal("value");
    })

    it("can parse key=\"value spaced\"", () => {
      const kvp = tryParseTuple("key=\"value spaced\"")

      expect(kvp).to.not.be.null;
      expect(kvp.key).equal("key");
      expect(kvp.value).equal("value spaced");
    })

    it("does not parse key=", () => {
      const kvp = tryParseTuple("key=")
      expect(kvp).to.be.null;
    })

    it("does not parse =value", () => {
      const kvp = tryParseTuple("=value")
      expect(kvp).to.be.null;
    })
  })

  describe("parseIndependentKeyValuePairs", () => {
    it("returns null with no arguments", () => {
      const kvps = parseIndependentKeyValuePairs(null);
      expect(kvps).to.be.null;
    })

    it("throws an exception when there are unmatched values", () => {
      const action = () => parseIndependentKeyValuePairs(["one", "two", "three"]);
      expect(action).to.throw;
    })

    it("can parse foo bar", () => {
      const kvps = parseIndependentKeyValuePairs(["foo", "bar"]);
      expect(kvps).to.not.be.null;
      expect(kvps).to.have.lengthOf(1);
      const kvp = kvps[0];
      expect(kvp.key).equal("foo");
      expect(kvp.value).equal("bar");
    })

    it("can parse foo bar baz bang", () => {
      const kvps = parseIndependentKeyValuePairs(["foo", "bar", "baz", "bang"]);
      expect(kvps).to.not.be.null;
      expect(kvps).to.have.lengthOf(2);
      let kvp = kvps[0];
      expect(kvp.key).equal("foo");
      expect(kvp.value).equal("bar");

      kvp = kvps[1];
      expect(kvp.key).equal("baz");
      expect(kvp.value).equal("bang");
    })

    it("can parse values with spaces", () => {
      const kvps = parseIndependentKeyValuePairs(["foo ", " bar"]);
      expect(kvps).to.not.be.null;
      expect(kvps).to.have.lengthOf(1);

      const kvp = kvps[0];
      expect(kvp.key).equal("foo");
      expect(kvp.value).equal("bar");
    })

    it("can parse values with quotes", () => {
      const kvps = parseIndependentKeyValuePairs(["foo", "\"space bar\""]);
      expect(kvps).to.not.be.null;
      expect(kvps).to.have.lengthOf(1);

      const kvp = kvps[0];
      expect(kvp.key).equal("foo");
      expect(kvp.value).equal("space bar");
    })
  })

  describe("parseKeyValuePairs can parse all styles", () => {
    it("can parse combined styles", () => {
      const kvps = parseKeyValuePairs(["key=value", "foo", "bar"]);
      expect(kvps).to.not.be.null;
      expect(kvps).to.have.lengthOf(2);
      let kvp = kvps[0];
      expect(kvp.key).equal("key");
      expect(kvp.value).equal("value");
      kvp = kvps[1];
      expect(kvp.key).equal("foo");
      expect(kvp.value).equal("bar");
    })

    it("can parse key=value only style", () => {
      const kvps = parseKeyValuePairs(["key=value", "foo=bar"]);
      expect(kvps).to.not.be.null;
      expect(kvps).to.have.lengthOf(2);
      let kvp = kvps[0];
      expect(kvp.key).equal("key");
      expect(kvp.value).equal("value");
      kvp = kvps[1];
      expect(kvp.key).equal("foo");
      expect(kvp.value).equal("bar");
    })

    it("can parse key value only style", () => {
      const kvps = parseKeyValuePairs(["key", "value", "foo", "bar"]);
      expect(kvps).to.not.be.null;
      expect(kvps).to.have.lengthOf(2);
      let kvp = kvps[0];
      expect(kvp.key).equal("key");
      expect(kvp.value).equal("value");
      kvp = kvps[1];
      expect(kvp.key).equal("foo");
      expect(kvp.value).equal("bar");
    })

    it("can parse styles with spaces and quotes", () => {
      const kvps = parseKeyValuePairs([
        "apple", "spaced value",
        "banana", "\"space quote bar\"",
        "carrot=\"bang bang\"",
        "durian=spaced value"
      ]);
      expect(kvps).to.not.be.null;
      expect(kvps).to.have.lengthOf(4);
      const sorted = kvps.sort((l,r) => l.key.localeCompare(r.key));

      expect(sorted[0].key).equal("apple");
      expect(sorted[0].value).equal("spaced value");
      expect(sorted[1].key).equal("banana");
      expect(sorted[1].value).equal("space quote bar");
      expect(sorted[2].key).equal("carrot");
      expect(sorted[2].value).equal("bang bang");
      expect(sorted[3].key).equal("durian");
      expect(sorted[3].value).equal("spaced value");
    })
  });

})
