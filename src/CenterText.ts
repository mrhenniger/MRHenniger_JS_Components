"use strict";
class CenterText extends Components {

    // @ts-ignore - __style is initialized in the constructor after the call to super
    private __style: string;

    constructor(theParent: Dom|null = null, params: object = {}, core: Dom|null = null) {
        super(theParent, 'center-text');

        // Construction Method #1:  Creating by JS command
        if (theParent !== null) {
            // @ts-ignore - The following line is constructed correctly
            const style = params.style ?? '';
            // @ts-ignore - The following line is constructed correctly
            const text = params.txt ?? '';
            const identifier = this.__generateIdentifier();
            const eleStr = `<center-text class="${identifier}" style="${style}">${text}</center-text>`;
            theParent.innerHTMLAppend(eleStr);

            // Capture the data unique to this class
            this.__core = theParent.find(`.${identifier}`).first();
            this.__core!.removeClass(identifier);
            this.__data = {txt: text};
            this.__attributes = {};
        }

        // Construction Method #2:  Attaching to what is already in the dom
        //                          <center-text style='light'><div class='inner'>Some Text Here</div></center-text>
        else if (core !== null) {
            this.__core = core;
            // @ts-ignore - this.__core will not be null
            const text = this.__core.find('.inner').first().innerHTML().str();
            this.__data = {txt: text};

// TODO:  this.__style should be converted to an attribute
            this.__style = '';
            if (this.__core.hasClass('light')) {
                this.__style = 'light';
            } else if (this.__core.hasClass('medium')) {
                this.__style = 'medium';
            } else if (this.__core.hasClass('dark')) {
                this.__style = 'dark';
            }

            this.__attributes = {};
        }

        // Construction Method #3:  DOM Instantiated
        //                          <center-text style='ct-light'>Some Text Here</center-text>
        else {
            // Capture this (component html element) as the core
            this.__core = new Dom(this);

            // Find the style
            const attStyle = [...this.attributes].filter((attr) => attr.nodeName === 'style');
            this.__style = attStyle.length > 0 ? String(attStyle[0].nodeValue) : '';

            // Data
            // @ts-ignore - innerHTML() returns a Strings
            const newData = {txt: this.__core.innerHTML().str()};

            // Render
            this.__clearAttributes();
            this.__apply(newData); // Replaces the innerHTML text with the templated HTML
            if (this.__style !== '') {
                this.__core!.addClass(this.__style);
            }
        }
    }

    protected __setTemplate(): void {
        this.__template = new Strings(`<div class="inner">{{ txt }}</div>`);
    }

    protected __setHandlers(): void {
        this.__handlers = {
            click_root: () => {
                if( this.__core!.hasClass('light') ) {
                    this.__core!.removeClass('light').addClass('medium');
                } else if( this.__core!.hasClass('medium') ) {
                    this.__core!.removeClass('medium').addClass('dark');
                } else if( this.__core!.hasClass('dark') ) {
                    this.__core!.removeClass('dark').addClass('light');
                }
            },
            click_inner: (event: any) => {
                event.stopPropagation();

                let inner = this.__core!.find('.inner').first();
                // @ts-ignore - innerHTML returns a Strings
                let innerTxt = inner!.innerHTML().str();

                if (innerTxt === 'one') {
                    inner!.innerHTML('two');
                } else if (innerTxt === 'two') {
                    inner!.innerHTML('three');
                } else if (innerTxt === 'three') {
                    inner!.innerHTML('one');
                } else {
                    inner!.innerHTML('one');
                }
            }
        };
    }
};
