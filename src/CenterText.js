"use strict";
class CenterText extends Components {
    constructor(theParent = null, params = {}, core = null) {
        var _a, _b;
        super(theParent, 'center-text');
        // Construction Method #1:  Creating by JS command
        if (theParent !== null) {
            // @ts-ignore - The following line is constructed correctly
            const style = (_a = params.style) !== null && _a !== void 0 ? _a : '';
            // @ts-ignore - The following line is constructed correctly
            const text = (_b = params.txt) !== null && _b !== void 0 ? _b : '';
            const identifier = new Strings().random(10, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz').str();
            const eleStr = `<center-text class="${identifier}" style="${style}">${text}</center-text>`;
            theParent.innerHTMLAppend(eleStr);
            // Capture the data unique to this class
            this.__core = theParent.find(`.${identifier}`).first();
            this.__core.removeClass(identifier);
            this.__data = { txt: text };
            this.__attributes = {};
        }
        // Construction Method #2:  Attaching to what is already in the dom
        //                          <center-text style='light'><div class='inner'>Some Text Here</div></center-text>
        else if (core !== null) {
            this.__core = core;
            // @ts-ignore - this.__core will not be null
            const text = this.__core.find('.inner').first().innerHTML().str();
            this.__data = { txt: text };
            this.__style = '';
            if (this.__core.hasClass('light')) {
                this.__style = 'light';
            }
            else if (this.__core.hasClass('medium')) {
                this.__style = 'medium';
            }
            else if (this.__core.hasClass('dark')) {
                this.__style = 'dark';
            }
            this.__attributes = {};
        }
        // Construction Method #3:  DOM Instantiated
        //                          <center-text style='light'>Some Text Here</center-text>
        else {
            // Capture this (component html element) as the core
            this.__core = new Dom(this);
            // Find the style
            const attStyle = [...this.attributes].filter((attr) => attr.nodeName === 'style');
            this.__style = attStyle.length > 0 ? String(attStyle[0].nodeValue) : '';
            // Attributes
            this.__clearAttributes();
            // Data
            // @ts-ignore - innerHTML() returns a Strings
            const newData = { txt: this.__core.innerHTML().str() };
            // Render
            this.__apply(newData); // Replaces the innerHTML text with the templated HTML
            if (this.__style !== '') {
                this.__core.addClass(this.__style);
            }
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
