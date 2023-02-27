import BaseComponent from '../baseComponent';
import './race.scss';

export class RaceButton extends BaseComponent {
    constructor(private raceGo: () => void, private raceStop: () => void) {
        super({
            classNames: ['race-wrapper'],
        });
        const raceGoBtn = new BaseComponent({
            tagName: 'button',
            classNames: ['race-btn'],
            textContent: 'race start',
        });
        this.insertChild(raceGoBtn);
        const raceStopBtn = new BaseComponent({
            tagName: 'button',
            classNames: ['race-btn', 'race_stop'],
            textContent: 'race stop',
        });
        this.insertChild(raceStopBtn);
        raceGoBtn.addListener('click', () => {
            raceGo();
        });
        raceStopBtn.addListener('click', () => {
            raceStop();
        });
    }
}
