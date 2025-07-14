"use strict";
class CenterText extends Components {
    private __style: string;

    constructor(theParent: Dom, params: object = {}) {
        super(theParent, 'CenterText');

        // Initialize
        this.__style = params.style ?? null;
        let theText  = params.txt ?? '';

        // Prep
        this.__template = new Strings(`<div class="outer"><div class="inner">{{ txt }}</div></div>`);
        const newData = { txt: theText };
        const newAttributes = {};
        let newHandlers = {};

        // Render
        this.__apply(newData, newAttributes, newHandlers);
        if (this.__style !== null) {
            this.__core!.addClass(this.__style);
        }
    }
};
