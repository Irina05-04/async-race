import BaseComponent from '../components/baseComponent';
import { GarageView } from '../components/view/garageView';
import { BaseView } from '../components/view/baseView';
import { WinnerView } from '../components/view/winnerView';

export class viewController extends BaseComponent {
    private garage: GarageView;
    private winner: WinnerView;
    constructor() {
        super({
            tagName: 'main',
        });
        const baseView = new BaseView(() => this.changeView());
        this.insertChild(baseView);
        this.garage = new GarageView();
        this.winner = new WinnerView();
        this.insertChild(this.garage);
    }
    changeView() {
        if (document.querySelector('.garage')) {
            this.garage.remove();
            this.winner = new WinnerView();
            this.insertChild(this.winner);
        } else if (document.querySelector('.winner-page')) {
            this.winner.remove();
            this.garage = new GarageView();
            this.insertChild(this.garage);
        }
    }
}
