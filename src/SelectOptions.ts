"use strict";
// @ts-ignore - TS2415 - Ignore incompatibility warning with the base Components
class SelectDropdown extends Components {

    constructor(theParent: Dom|null = null, params: object = {}, core: Dom|null = null) {
        super(theParent, params, core, 'select-dropdown');
    }

    private __constructParent(theParent: Dom, params: object): void {
        // @ts-ignore
        const options = params.options ?? {}; // Expecting { value: label }
        // @ts-ignore
        const val = params.val ?? '';
        // @ts-ignore
        let req = params.req ?? false;
        req = req === true || req === 'true' ? 'true' : 'false';
        // @ts-ignore
        let dis = params.dis ?? false;
        dis = dis === true || dis === 'true' ? 'true' : 'false';

        // @ts-ignore
        let size = params.size ?? 'sd-medium';
        size = size === 'small'  ? 'sd-small'  : size;
        size = size === 'medium' ? 'sd-medium' : size;
        size = size === 'large'  ? 'sd-large'  : size;

        const identifier = this.__generateIdentifier();
        // We serialize options as a JSON string in the attribute for DOM persistence
        const optStr = JSON.stringify(options).replace(/"/g, '&quot;');

        let eleStr = `<select-dropdown class="${identifier}" val="${val}" req="${req}" dis="${dis}" size="${size}" options="${optStr}"/>`;
        theParent.innerHTMLAppend(eleStr);

        this.__core = theParent.find(`.${identifier}`).first();
        this.__core!.removeClass(identifier);

        this.__data = {
            val: val,
            req: req === 'true' ? 'required' : '',
            dis: dis === 'true' ? 'disabled' : '',
            options: options
        };
        this.__attributes = { size: size };

        this.__core!.addClass(size);
    }

    private __constructCore(core: Dom): void {
        this.__core = core;
        const selectEle = this.__core.find('select').first();

        const val = selectEle!.val();
        const req = selectEle!.hasAtt('required') ? 'required' : '';
        const dis = selectEle!.hasAtt('disabled') ? 'disabled' : '';

        // Parse options back from the custom element attribute if possible
        let options = {};
        try {
            const optAttr = this.__core.att('options');
            if (optAttr) options = JSON.parse(optAttr);
        } catch (e) {
            // Fallback: scrape from existing options if JS object is lost
            this.__core.find('option').each((opt: any) => {
                const d = new Dom(opt);
                options[d.att('value')] = d.innerHTML().str();
            });
        }

        this.__data = { val, req, dis, options };

        let size = 'sd-medium';
        if (this.__core.hasClass('sd-small')) size = 'sd-small';
        else if (this.__core.hasClass('sd-large')) size = 'sd-large';

        this.__attributes = { size: size };
    }

    private __constructDom(): void {
        this.__core = new Dom(this);

        const val = this.__getAttribute('val', '');
        const req = this.__getAttribute('req', 'false') === 'true' ? 'required' : '';
        const dis = this.__getAttribute('dis', 'false') === 'true' ? 'disabled' : '';

        let options = {};
        try {
            options = JSON.parse(this.__getAttribute('options', '{}'));
        } catch (e) {}

        const newData = { val, req, dis, options };

        let size = this.__getAttribute('size', 'sd-medium');
        size = size === 'small' ? 'sd-small' : (size === 'medium' ? 'sd-medium' : (size === 'large' ? 'sd-large' : size));

        this.__attributes = { size: size };

        this.__clearAttributes();
        this.__apply(newData);
        this.__core!.addClass(size);
    }

    protected __setTemplate(): void {
        // Build option tags dynamically from data
        let optionsHtml = '';
        const options = this.__data.options || {};
        const currentVal = this.__data.val;

        for (const [value, label] of Object.entries(options)) {
            const selected = String(value) === String(currentVal) ? 'selected' : '';
            optionsHtml += `<option value="${value}" ${selected}>${label}</option>`;
        }

        this.__template = new Strings(
            `<select class='inner' {{ req }} {{ dis }}>${optionsHtml}</select>`
        );
    }

    protected __setHandlers(): void {}
}
