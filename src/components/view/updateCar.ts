import BaseComponent from '../baseComponent';
import './updateCar.scss';

export class UpdateCar extends BaseComponent {
    constructor(private sendUpdate: (name: string, color: string) => void, name?: string, color?: string) {
        super({
            classNames: ['update-car'],
        });
        const inputName = document.createElement('input');
        inputName.classList.add('update-car__name');
        if (name) inputName.value = name;
        this.insertChildS(inputName);
        const inputColor = document.createElement('input');
        inputColor.classList.add('update-car__color');
        inputColor.setAttribute('type', 'color');
        if (color) inputColor.value = color;
        this.insertChildS(inputColor);
        const sendButton = new BaseComponent({
            tagName: 'button',
            classNames: ['update-car__button'],
            textContent: 'update',
        });
        sendButton.addListener('click', () => {
            sendUpdate(inputName.value, inputColor.value);
            inputName.value = '';
            inputColor.value = '#000000';
        });
        this.insertChild(sendButton);
    }
}
