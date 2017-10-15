"use strict";

const template = `
    <style>
        :host {
            position: relative;
        }

        .input-container {
            position: relative;
            display: inline-block;
        }
        
        input[type=text] {
            height: 25px;
            width: 260px;
            border: 1px solid #999999;
            padding-left: 5px;
            padding-right: 25px;
            outline: none;
            box-sizing: border-box;
        }
        
        a {
            width: 25px;
            height: 25px;
            position: absolute;
            top: 0;
            right: 0.1em;
            text-align: center;
            text-decoration: none;
            line-height: 25px;
            color: #51626F;
            display: inline-block;
        }
        
        .no-display {
            display: none;
        }
        
        ul {
            list-style-type: none;
            border: 1px solid #999999;
            border-top: none;
            width: 260px;
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            position: absolute;
            z-index: 1;
            top: 22px;
            left: 0;
            background-color: white;
        }
        
        li {
            padding: 0 5px 0 5px;
            line-height: 25px;
            vertical-align: middle;
        }
        
        li:hover {
            border-top: 1px solid #999999;
            border-bottom: 1px solid #999999;
            padding-left: 10px;
        }
        
        li:hover:first-child {
            border-top: none;
        }
        
        li:hover:last-child {
            border-bottom: none;
        }
    </style>
    <div class="input-container">
        <input type="text">
        <a href="#">▼</a>
    </div>
    <ul class="no-display">
        <li tabindex="0">item 1</li>
        <li tabindex="0">item 2</li>
        <li tabindex="0">item 3</li>
    </ul>
`;

class CustomCombobox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.innerHTML = template;

        this._initElementVars();
        this._setupListeners();
    }

    _setupListeners() {
        this.addEventListener('blur', e => this.ul.classList.add('no-display'));
        this.button.addEventListener('click', e => {
            this.lis.forEach((li) => li.classList.remove('no-display'));
            this.ul.classList.toggle('no-display');
        });
        this.lis.forEach((li) => {
            li.addEventListener('click', e => {
                this.input.value = li.innerHTML;
                this.ul.classList.add('no-display');
            });
        });
        this.input.addEventListener('focus', e => this.ul.classList.remove('no-display'));
        this.input.addEventListener('keyup', this._autocomplete.bind(this));
    }

    _initElementVars() {
        this.input = this.shadowRoot.querySelector('input');
        this.button = this.shadowRoot.querySelector('a');
        this.ul = this.shadowRoot.querySelector('ul');
        this.lis = this.shadowRoot.querySelectorAll('li');
    }

    _autocomplete(e) {
        const term = this.input.value;
        this.ul.classList.remove('no-display');
        this.lis.forEach((li) => {
            li.classList.remove('no-display');
            if (term && term.length > 0 && !li.innerText.includes(term))
                li.classList.add('no-display');
        });
    }
}

window.customElements.define('custom-combobox', CustomCombobox);