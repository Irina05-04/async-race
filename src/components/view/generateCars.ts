import BaseComponent from '../baseComponent';
import './generateCars.scss';

export class GenerateCars extends BaseComponent {
    constructor(private generate: () => void) {
        super({
            tagName: 'button',
            classNames: ['generate-cars'],
            textContent: 'generate',
        });
        this.addListener('click', () => {
            generate();
        });
    }
}
