// helpers/setup.js 
"use strict"; 
 
// Reset ambiente QUnit 
export function resetEnv(st) { 
    Object.keys(st).forEach(k = st[k]); 
    delete window.__forceNotBrowser; 
    const fx = document.getElementById("qunit-fixture"); 
    if(fx) fx.innerHTML = ""; 
} 
