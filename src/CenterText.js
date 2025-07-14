"use strict";
class CenterText extends Components {
    constructor(theParent, params = {}) {
        var _a, _b;
        super(theParent, 'CenterText');
        // Initialize
        this.__style = (_a = params.style) !== null && _a !== void 0 ? _a : null;
        let theText = (_b = params.txt) !== null && _b !== void 0 ? _b : '';
        // Prep
        this.__template = new Strings(`<div class="outer"><div class="inner">{{ txt }}</div></div>`);
        const newData = { txt: theText };
        const newAttributes = {};
        let newHandlers = {};
        // Render
        this.__apply(newData, newAttributes, newHandlers);
        if (this.__style !== null) {
            this.__core.addClass(this.__style);
        }
    }
}
;
