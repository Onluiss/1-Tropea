"use strict";

/* global QUnit */

import { isBrowser } from "/1-Tropea/utils/isBrowser.js";

QUnit.module("utils/isBrowser", () => {
  QUnit.test("ritorna true in ambiente browser", assert => {
    const result = isBrowser();
    assert.strictEqual(result, true, "Deve rilevare che siamo nel browser");
  });

  QUnit.test("ritorna false se forziamo ambiente non-browser", assert => {
    const originalFlag = window.__forceNotBrowser;

    window.__forceNotBrowser = true; // forziamo non-browser
    const result = isBrowser();
    assert.strictEqual(result, false, "Deve tornare false con flag attiva");

    // ripristino
    window.__forceNotBrowser = originalFlag;
  });
});
