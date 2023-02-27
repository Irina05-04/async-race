import BaseComponent from './baseComponent';

export class Button extends BaseComponent {
    constructor(content: string, private changeColor: () => void, private changeView: () => void) {
        super({
            tagName: 'button',
            textContent: content,
            classNames: ['buttons-spa__item'],
        });
        this.addListener('click', () => {
            changeColor();
            changeView();
        });
    }
}
