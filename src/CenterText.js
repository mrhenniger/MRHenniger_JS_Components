"use strict";
// @ts-ignore - TS2415 - Ignore incompatibility warning with the base Components
class CenterText extends Components {
    constructor(theParent = null, params = {}, core = null) {
        super(theParent, params, core, 'input-text');
    }
    __constructParent(theParent, params) {
        var _a, _b;
        // @ts-ignore - The following line is constructed correctly
        const text = (_a = params.txt) !== null && _a !== void 0 ? _a : '';
        // @ts-ignore - The following line is constructed correctly
        let style = (_b = params.style) !== null && _b !== void 0 ? _b : 'nostyle';
        style = style === 'light' ? 'ct-light' : style;
        style = style === 'medium' ? 'ct-medium' : style;
        style = style === 'dark' ? 'ct-dark' : style;
        const identifier = this.__generateIdentifier();
        const eleStr = `<center-text class="${identifier}" style="${style}">${text}</center-text>`;
        theParent.innerHTMLAppend(eleStr);
        // Capture the data unique to this class
        this.__core = theParent.find(`.${identifier}`).first();
        this.__core.removeClass(identifier);
        this.__data = {
            txt: text
        };
        this.__attributes = {
            style: style
        };
    }
    __constructCore(core) {
        this.__core = core;
        // @ts-ignore - this.__core will not be null
        const text = this.__core.find('.inner').first().innerHTML().str();
        this.__data = {
            txt: text
        };
        let style = 'nostyle';
        if (this.__core.hasClass('ct-light')) {
            style = 'ct-light';
        }
        else if (this.__core.hasClass('ct-medium')) {
            style = 'ct-medium';
        }
        else if (this.__core.hasClass('ct-dark')) {
            style = 'ct-dark';
        }
        this.__attributes = {
            style: style
        };
    }
    __constructDom() {
        // Capture this (component html element) as the core
        this.__core = new Dom(this);
        // Data
        // @ts-ignore - innerHTML() returns a Strings
        const newData = { txt: this.__core.innerHTML().str() };
        // Find the style
        let style = new Strings(this.__getAttribute('style', 'nostyle')).trim().str();
        style = style === '' ? 'nostyle' : style;
        style = style === 'light' ? 'ct-light' : style;
        style = style === 'medium' ? 'ct-medium' : style;
        style = style === 'dark' ? 'ct-dark' : style;
        // Render
        this.__clearAttributes();
        this.__apply(newData); // Replaces the innerHTML text with the templated HTML
        if (style !== 'nostyle') {
            this.__core.addClass(style);
        }
    }
    __setTemplate() {
        this.__template = new Strings(`<div class="inner">{{ txt }}</div>`);
    }
    __setHandlers() {
        this.__handlers = {
            click_root: () => {
                if (this.__core.hasClass('light')) {
                    this.__core.removeClass('light').addClass('medium');
                }
                else if (this.__core.hasClass('medium')) {
                    this.__core.removeClass('medium').addClass('dark');
                }
                else if (this.__core.hasClass('dark')) {
                    this.__core.removeClass('dark').addClass('light');
                }
            },
            click_inner: (event) => {
                event.stopPropagation();
                let inner = this.__core.find('.inner').first();
                // @ts-ignore - innerHTML returns a Strings
                let innerTxt = inner.innerHTML().str();
                if (innerTxt === 'one') {
                    inner.innerHTML('two');
                }
                else if (innerTxt === 'two') {
                    inner.innerHTML('three');
                }
                else if (innerTxt === 'three') {
                    inner.innerHTML('one');
                }
                else {
                    inner.innerHTML('one');
                }
            }
        };
    }
}
;
