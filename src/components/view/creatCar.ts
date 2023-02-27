import BaseComponent from '../baseComponent';
import './createCar.scss';

export class CreatCar extends BaseComponent {
    constructor(private send: (name: string, color: string) => void) {
        super({
            classNames: ['create-car'],
        });
        const inputName = document.createElement('input');
        inputName.classList.add('create-car__name');
        this.insertChildS(inputName);
        const inputColor = document.createElement('input');
        inputColor.classList.add('create-car__color');
        inputColor.setAttribute('type', 'color');
        this.insertChildS(inputColor);
        const sendButton = new BaseComponent({
            tagName: 'button',
            classNames: ['create-car__button'],
            textContent: 'create',
        });
        sendButton.addListener('click', () => {
            send(inputName.value, inputColor.value);
            inputName.value = '';
            inputColor.value = '#000';
        });
        this.insertChild(sendButton);
    }
}
