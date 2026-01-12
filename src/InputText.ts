"use strict";
// @ts-ignore - TS2415 - Ignore incompatibility warning with the base Components
class InputText extends Components {

    constructor(theParent: Dom|null = null, params: object = {}, core: Dom|null = null) {
        super(theParent, params, core, 'input-text');
    }

    private __constructParent(theParent: Dom, params: object): void {
        // @ts-ignore - The following line is constructed correctly
        const val = params.val ?? '';

        // @ts-ignore - The following line is constructed correctly
        let req = params.req ?? false;
        req = req === true || req === 'true' ? 'true' : 'false';

        // @ts-ignore - The following line is constructed correctly
        let ro = params.ro ?? false;
        ro = ro === true || ro === 'true' ? 'true' : 'false';

        // @ts-ignore - The following line is constructed correctly
        let minLen = params.minLen ?? '';
        minLen = minLen === '' ? minLen : parseInt(minLen);
        // @ts-ignore - The following line is constructed correctly
        let maxLen = params.maxLen ?? '';
        maxLen = maxLen === '' ? maxLen : parseInt(maxLen);
        // @ts-ignore - The following line is constructed correctly
        let len = params.len ?? '';
        len = len === '' ? len : parseInt(len);

        // @ts-ignore - The following line is constructed correctly
        let spellBool = params.spell ?? false;
        spellBool = spellBool === true;
        const spell = spellBool === true ? 'true' : 'false';

        // @ts-ignore - The following line is constructed correctly
        const ph = params.ph ?? '';

        // @ts-ignore - The following line is constructed correctly
        let size = params.size ?? 'it-medium'; // it-small, it-medium, it-large
        size = size === 'small'  ? 'it-small'  : size;
        size = size === 'medium' ? 'it-medium' : size;
        size = size === 'large'  ? 'it-large'  : size;

        // @ts-ignore - The following line is constructed correctly
        let style = params.style ?? 'nostyle'; // it-blue, it-red, it-rey, nostyle
        style = style === 'blue' ? 'it-blue' : style;
        style = style === 'red'  ? 'it-red'  : style;
        style = style === 'grey' ? 'it-grey' : style;

        const identifier = this.__generateIdentifier();
        let eleStr =
            `<input-text class="${identifier}" val="${val}" req="${req}" ro="${ro}" minlen="${minLen}" maxlen="${maxLen}" len="${len}" spell="${spell}" ph="${ph}" size="${size}" style="${style}"/>`;
        theParent.innerHTMLAppend(eleStr);

        // Capture the data unique to this class
        this.__core = theParent.find(`.${identifier}`).first();
        this.__core!.removeClass(identifier);
        this.__data = {
            val: val,
            req: req,
            ro: ro,
            minLen: minLen,
            maxLen: maxLen,
            len: len,
            spell: spell,
            ph: ph
        };
        this.__attributes = {
            size: size,
            style: style
        };

        // Render
        this.__core!.addClass(size);
        if (style !== 'nostyle') {
            this.__core!.addClass(style);
        }
    }

    private __constructCore(core: Dom): void {
        this.__core = core;
        // @ts-ignore - this.__core will not be null
        const inputEle = this.__core.find('input').first();


        const val = inputEle!.att('value');

        const req = inputEle!.hasAtt('required') ? 'required' : '';

        const ro = inputEle!.hasAtt('readonly') ? 'readonly' : '';

        const minLen = inputEle!.hasAtt('minlength') ? inputEle!.att('minlength') : null;
        const maxLen = inputEle!.hasAtt('maxlength') ? inputEle!.att('maxlength') : null;
        const len = inputEle!.hasAtt('size') ? inputEle!.att('size') : null;

        const spell = inputEle!.hasAtt('spellcheck') ? 'spellcheck' : '';

        const ph = inputEle!.hasAtt('placeholder') ? 'placeholder' : '';

        this.__data = {
            val: val,
            req: req,
            ro: ro,
            minLen: minLen,
            maxLen: maxLen,
            len: len,
            spell: spell,
            ph: ph
        };


        let size = 'it-medium'
        if (this.__core.hasClass('it-small')) {
            size = 'it-small';
        } else if (this.__core.hasClass('it-medium')) {
            size = 'it-medium';
        } else if (this.__core.hasClass('it-large')) {
            size = 'it-large';
        }
        let style = 'nostyle'
        if (this.__core.hasClass('it-blue')) {
            style = 'it-blue';
        } else if (this.__core.hasClass('it-red')) {
            style = 'it-red';
        } else if (this.__core.hasClass('it-grey')) {
            style = 'it-grey';
        }

        this.__attributes = {
            size: size,
            style: style
        };
    }

    private __constructDom(): void {
        // Capture this (component html element) as the core
        this.__core = new Dom(this);

        const val = this.__getAttribute('val', '');

        let req = this.__getAttribute('req', '');
        req = req === 'true' ? 'required' : '';

        let ro = this.__getAttribute('ro', 'false');
        ro = ro === 'true' ? 'readonly' : '';

        const minLen = this.__getAttribute('minlen', '');
        //const minLenNum = minLen === '' ? minLen : parseInt(minLen);
        const maxLen = this.__getAttribute('maxlen', '');
        //const maxLenNum = maxLen === '' ? maxLen : parseInt(maxLen);
        const len = this.__getAttribute('len', '');
        //const lenNum = len === '' ? len : parseInt(len);

        const spell = this.__getAttribute('spell', 'false');
        //const spellBool = spell === 'true';

        const ph = this.__getAttribute('ph', '');
        //const phBool = ph === 'true';

        const newData = {
            val: val,
            req: req,
            ro: ro,
            minLen: minLen,
            maxLen: maxLen,
            len: len,
            spell: spell,
            ph: ph
        };


        let size  = this.__getAttribute('size', 'it-medium');
        size = size === 'small'  ? 'it-small'  : size;
        size = size === 'medium' ? 'it-medium' : size;
        size = size === 'large'  ? 'it-large'  : size;
        let style = new Strings(this.__getAttribute('style', 'nostyle')).trim().str();
        style = style === ''     ? 'nostyle' : style;
        style = style === 'blue' ? 'it-blue' : style;
        style = style === 'red'  ? 'it-red'  : style;
        style = style === 'grey' ? 'it-grey' : style;

        this.__attributes = {
            size: size,
            style: style
        };


        // Render
        this.__clearAttributes();
        this.__apply(newData); // Replaces the innerHTML text with the templated HTML
        this.__core!.addClass(size);
        if (style !== 'nostyle') {
            this.__core!.addClass(style);
        }
    }

    protected __setTemplate(): void {
        this.__template = new Strings(
            `<input type='text' class='inner' name='From' value='{{ val }}' {{ req }}  {{ ro }} minlength='{{ minLen }}' maxlength='{{ maxLen }}' size='{{ len }}' spellcheck='{{ spell }}' placeholder='{{ ph }}'>`
        );
    }

    protected __setHandlers(): void {}
};
