import { getTransformSet } from "/1-Tropea/utils/getTransformSet.js";

QUnit.module("utils/getTransformSet", () => {
  QUnit.test("creator/top/3 → array di 3 transform string", assert => {
    const arr = getTransformSet("creator", "top", 3);
    assert.ok(Array.isArray(arr), "ritorna array");
    assert.equal(arr.length, 3, "3 elementi");

    arr.forEach((s, i) => {
      assert.equal(typeof s, "string", `#${i} è stringa`);
      assert.ok(/translate3d\s*\(/.test(s), `#${i} contiene translate3d(`);
      assert.ok(/rotate\s*\(/.test(s), `#${i} contiene rotate(`);
      assert.ok(/scale\s*\(/.test(s), `#${i} contiene scale(`);
    });
  });

  QUnit.test("player/bottom/2 → array di 2 stringhe", assert => {
    const arr = getTransformSet("player", "bottom", 2);
    assert.equal(arr.length, 2, "2 elementi");
  });

  QUnit.test("input non valido → array vuoto", assert => {
    const arr = getTransformSet("x", "y", 9);
    assert.deepEqual(arr, [], "array vuoto");
  });
});
