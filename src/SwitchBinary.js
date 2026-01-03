"use strict";
class SwitchBinary extends Components {
    constructor(theParent = null, params = {}, core = null) {
        var _a, _b, _c, _d, _e;
        super(theParent, 'switch-binary');
        // Construction Method #1:  Creating by JS command
        if (theParent !== null) {
            // @ts-ignore - The following line is constructed correctly
            const stateBool = ((_a = params.state) !== null && _a !== void 0 ? _a : false) === true; // true or false;
            const stateTxt = stateBool ? 'on' : 'off';
            // @ts-ignore - The following line is constructed correctly
            let size = (_b = params.size) !== null && _b !== void 0 ? _b : 'sb-medium'; // sb-small, sb-medium, sb-large
            size = size === 'small' ? 'sb-small' : size;
            size = size === 'medium' ? 'sb-medium' : size;
            size = size === 'large' ? 'sb-large' : size;
            // @ts-ignore - The following line is constructed correctly
            let style = (_c = params.style) !== null && _c !== void 0 ? _c : 'nostyle'; // sb-blue, sb-red, sb-grey, nostyle
            style = style === 'blue' ? 'sb-blue' : style;
            style = style === 'red' ? 'sb-red' : style;
            style = style === 'grey' ? 'sb-grey' : style;
            // @ts-ignore - The following line is constructed correctly
            const onTxt = (_d = params.onTxt) !== null && _d !== void 0 ? _d : '';
            // @ts-ignore - The following line is constructed correctly
            const offTxt = (_e = params.offTxt) !== null && _e !== void 0 ? _e : '';
            const identifier = this.__generateIdentifier();
            const eleStr = `<switch-binary class="${identifier}" state="${stateTxt}" size="${size}" style="${style}" ontxt="${onTxt}" offtxt="${offTxt}"></switch-binary>`;
            theParent.innerHTMLAppend(eleStr);
            // Capture the data unique to this class
            this.__core = theParent.find(`.${identifier}`).first();
            this.__core.removeClass(identifier);
            this.__data = {
                onTxt: onTxt,
                offTxt: offTxt
            };
            this.__attributes = {
                size: size,
                style: style
            };
            // Render
            this.setState(stateBool);
            this.__core.addClass(size);
            if (style !== 'nostyle') {
                this.__core.addClass(style);
            }
        }
        // Construction Method #2:  Attaching to what is already in the dom
        //                          <switch-binary class='stateon sb-medium blue'><div class='perim'><div class='slide'><div class='ontxt'>On</div><div class='offtxt'>Off</div></div></div></center-text>
        else if (core !== null) {
            this.__core = core;
            let stateBool = this.__core.hasClass('stateon');
            this.setState(stateBool);
            // @ts-ignore - this.__core will not be null
            let onTxt = this.__core.find('.sb-perim .sb-slide .sb-onTxt').first().innerHTML().trim().str();
            onTxt = onTxt === '' ? 'O' : onTxt;
            // @ts-ignore - this.__core will not be null
            let offTxt = this.__core.find('.sb-perim .sb-slide .sb-offTxt').first().innerHTML().trim().str();
            offTxt = offTxt === '' ? '' : offTxt;
            this.__data = {
                onTxt: onTxt,
                offTxt: offTxt
            };
            let size = 'sb-medium';
            if (this.__core.hasClass('sb-small')) {
                size = 'sb-small';
            }
            else if (this.__core.hasClass('sb-medium')) {
                size = 'sb-medium';
            }
            else if (this.__core.hasClass('sb-large')) {
                size = 'sb-large';
            }
            let style = 'nostyle';
            if (this.__core.hasClass('sb-blue')) {
                style = 'sb-blue';
            }
            else if (this.__core.hasClass('sb-red')) {
                style = 'sb-red';
            }
            else if (this.__core.hasClass('sb-grey')) {
                style = 'sb-grey';
            }
            this.__attributes = {
                size: size,
                style: style
            };
        }
        // Construction Method #3:  DOM Instantiated
        //                          <switch-binary class="aBcDeFgHiJ" state="on" size="sb-medium" style="blue" ontxt="O" offtxt="X"></switch-binary>
        else {
            // Capture this (component html element) as the core
            this.__core = new Dom(this);
            // Capture the state
            const stateStr = this.__getAttribute('state', 'off');
            this.setState(stateStr === 'on');
            // Find the style
            let size = this.__getAttribute('size', 'sb-medium');
            size = size === 'small' ? 'sb-small' : size;
            size = size === 'medium' ? 'sb-medium' : size;
            size = size === 'large' ? 'sb-large' : size;
            let style = new Strings(this.__getAttribute('style', 'nostyle')).trim().str();
            style = style === '' ? 'nostyle' : style;
            style = style === 'blue' ? 'sb-blue' : style;
            style = style === 'red' ? 'sb-red' : style;
            style = style === 'grey' ? 'sb-grey' : style;
            this.__attributes = {
                size: size,
                style: style
            };
            // Data
            const onTxt = this.__getAttribute('ontxt', '');
            const offTxt = this.__getAttribute('offtxt', '');
            const newData = {
                onTxt: onTxt,
                offTxt: offTxt
            };
            // Render
            this.__clearAttributes();
            this.__apply(newData); // Replaces the innerHTML text with the templated HTML
            this.__core.addClass(size);
            if (style !== 'nostyle') {
                this.__core.addClass(style);
            }
        }
    }
    __setTemplate() {
        this.__template = new Strings(`<div class="sb-perim">
                <div class="sb-spacer"></div>
                <div class="sb-slide">
                    <div class="sb-ontxt">{{ onTxt }}</div>
                    <div class="sb-offtxt">{{ offTxt }}</div>
                </div>
            </div>`);
    }
    __setHandlers() {
        this.__handlers = {
            click_root: () => {
                this.toggleState();
            }
        };
    }
    /*
     * Function:  getState
     *
     * Description:  Get the instance state on (true) or off (false).
     *
     * @return  boolean  True (on) or false (off).
     */
    getState() {
        return this.__state;
    }
    /*
     * Function:  setState
     *
     * Description:  Set the instance state on (true) or off (false).
     *
     * @param  newState  A boolean indicating the state on (true) or off (false).
     *
     * @return  void
     */
    setState(newState) {
        this.__state = newState;
        this.__core.removeClass('stateon').removeClass('stateoff').addClass(this.__state ? 'stateon' : 'stateoff');
    }
    /*
     * Function:  toggleState
     *
     * Description:  Flip the state from on to off, or off to on.
     *
     * @return  void
     */
    toggleState() {
        this.setState(!this.__state);
    }
}
;
