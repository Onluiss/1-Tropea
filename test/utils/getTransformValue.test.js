import { getTransformValue } from "/1-Tropea/utils/getTransformValue.js";
import { state } from "/1-Tropea/state.js";

QUnit.module("utils/getTransformValue", {
  beforeEach() {
    window.__forceNotBrowser = false;
    state.userRole = "creator";
    state.placeholdersSwapped = false;
  }
});

QUnit.test("non-browser → stringa vuota", assert => {
  window.__forceNotBrowser = true;
  const res = getTransformValue(0, "creator", true);
  assert.strictEqual(res, "", "ritorna stringa vuota fuori browser");
});

QUnit.test("creator, propria carta → contiene translate3d e rotate(6deg)", assert => {
  const t = getTransformValue(0, "creator", true);
  assert.equal(typeof t, "string", "ritorna stringa");
  assert.ok(t.includes("translate3d"), "ha translate3d");
  assert.ok(t.includes("rotate(6deg)"), "ha rotate(6deg)");
});

QUnit.test("viewer con placeholdersSwapped → offset invertiti", assert => {
  state.userRole = "viewer";
  state.placeholdersSwapped = true;

  const own  = getTransformValue(0, "creator", true);
  const oppo = getTransformValue(0, "creator", false);

  assert.ok(own.includes("translate(-150%, -86%)"), "own → -86%");
  assert.ok(oppo.includes("translate(-150%, -64%)"), "oppo → -64%");
});
