import BaseComponent from '../baseComponent';
import { Button } from '../button';
import './buttonView.scss';

export class BaseView extends BaseComponent {
    private buttonArray: BaseComponent[];
    private garage: Button;
    private winner: Button;
    constructor(private changeView: () => void) {
        super({
            classNames: ['buttons-spa'],
        });
        this.garage = new Button('garage', () => this.changeColor(), changeView);
        this.garage.setAttribute('disabled', 'true');
        this.buttonArray = [];
        this.buttonArray.push(this.garage);
        this.insertChild(this.garage);
        this.winner = new Button('winner', () => this.changeColor(), changeView);
        this.insertChild(this.winner);
    }
    changeColor() {
        if (this.garage.hasAttribute('disabled')) {
            this.garage.removeAttribute('disabled');
            this.winner.setAttribute('disabled', 'true');
        } else {
            this.winner.removeAttribute('disabled');
            this.garage.setAttribute('disabled', 'true');
        }
    }
}
