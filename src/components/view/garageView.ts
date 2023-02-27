import BaseComponent from '../baseComponent';
import './garageView.scss';
import {
    createCar,
    createWinnerCar,
    deleteCar,
    deleteWinner,
    getAllWinnersCars,
    getGarageCars,
    updateCarApi,
    updateWinner,
} from '../api/api';
import { CarInterface } from '../../interface/carInterface';
import { Car } from '../car';
import { CreatCar } from './creatCar';
import { UpdateCar } from './updateCar';
import { Pagination } from './pagination';
import { GenerateCars } from './generateCars';
import { getRandomCars } from './generateCarsFn';
import { RaceButton } from './race';

const LIMIT = 7;
localStorage['flag'] = 'false';

export class GarageView extends BaseComponent {
    private totalSum: BaseComponent | undefined;
    private carWrapper: BaseComponent | undefined;
    private updateCarForm: UpdateCar;
    private setting: BaseComponent;
    private pagination: Pagination | undefined;
    private car: Car | undefined;
    private idCar = 0;
    private winner: BaseComponent;
    constructor() {
        super({
            classNames: ['garage'],
        });
        this.setting = new BaseComponent();
        this.insertChild(this.setting);
        const createCarForm = new CreatCar((name: string, color: string) => this.send(name, color));
        this.setting.insertChild(createCarForm);
        this.updateCarForm = new UpdateCar((name: string, color: string) => this.sendUpdate(name, color));
        this.setting.insertChild(this.updateCarForm);
        const divFoBtn = new BaseComponent({
            classNames: ['btn-wrapper'],
        });
        this.insertChild(divFoBtn);
        const generateCars = new GenerateCars(() => this.generate());
        divFoBtn.insertChild(generateCars);
        const raceCar = new RaceButton(
            () => this.raceGo(),
            () => this.raceStop()
        );
        divFoBtn.insertChild(raceCar);
        const header = new BaseComponent({
            classNames: ['garage__header'],
            textContent: 'Garage',
        });
        this.insertChild(header);
        this.drawCars(+localStorage['page']);
        this.winner = new BaseComponent({
            classNames: ['winner'],
        });
    }
    send(name: string, color: string) {
        createCar({ name, color });
        this.drawCars(+localStorage['page']);
    }
    drawCars(page: number) {
        (async () => {
            if (this.carWrapper) this.carWrapper.remove();
            if (this.pagination) this.pagination.remove();
            if (this.winner) this.winner.remove();
            const res = await getGarageCars(page, LIMIT);
            this.carWrapper = new BaseComponent();
            this.insertChild(this.carWrapper);
            if (typeof res.count === 'string') {
                this.totalSum = new BaseComponent({
                    classNames: ['total-sum'],
                    textContent: `count ${res.count}`,
                });
                this.carWrapper.insertChild(this.totalSum);
            }
            res.items.forEach((item: CarInterface) => {
                this.car = new Car(
                    item.name,
                    item.color,
                    () => this.removeCar(item.id),
                    () => this.updateCar(item.id, item.name, item.color),
                    () => this.driveCar(item.id),
                    (name) => this.showWinner(name),
                    (id, name, color, progress) => this.createWinner(id, name, color, progress)
                );
                this.carWrapper?.insertChild(this.car);
            });
            this.pagination = new Pagination(
                Math.ceil(res.count ? +res.count / LIMIT : 1),
                'page',
                (page: number) => this.nextPage(page),
                (page: number) => this.prevPage(page)
            );
            this.insertChild(this.pagination);
        })();
    }
    removeCar(id: number) {
        deleteCar(id);
        deleteWinner(id);
        this.drawCars(+localStorage['page']);
    }
    sendUpdate(name: string, color: string) {
        updateCarApi(this.idCar, { name, color });
        this.drawCars(+localStorage['page']);
    }
    updateCar(id: number, name: string, color: string) {
        this.updateForm(name, color);
        this.idCar = id;
    }
    updateForm(name?: string, color?: string) {
        this.updateCarForm.remove();
        this.updateCarForm = new UpdateCar((name: string, color: string) => this.sendUpdate(name, color), name, color);
        this.setting.insertChild(this.updateCarForm);
    }
    nextPage(page: number) {
        this.drawCars(page);
    }
    prevPage(page: number) {
        this.drawCars(page);
    }
    generate() {
        const carArr = getRandomCars();
        carArr.forEach((item) => {
            const name = item.name;
            const color = item.color;
            createCar({ name, color });
        });
        this.drawCars(+localStorage['page']);
    }
    driveCar(id: number) {
        return id;
    }
    raceGo() {
        localStorage['flag'] = 'true';
        const buf = Array.from(document.querySelectorAll('.start'));
        buf.map((item) => item.dispatchEvent(new Event('click')));
    }
    raceStop() {
        const buf = Array.from(document.querySelectorAll('.end'));
        buf.map((item) => item.dispatchEvent(new Event('click')));
        if (this.winner) this.winner.remove();
    }
    showWinner(name: string) {
        this.winner.setContent(`winner: ${name}`);
        this.insertChild(this.winner);
    }
    createWinner(id: number, name: string, color: string, progress: number) {
        let time = +(progress / 1000).toFixed(1);
        let wins = 1;
        let flag = true;
        getAllWinnersCars().then((v) => {
            v.items.forEach((item) => {
                if (item.id === id) {
                    flag = false;
                    wins = item.wins + 1;
                    if (item.time > time) {
                        updateWinner(id, { wins, time });
                    } else {
                        time = item.time;
                        updateWinner(id, { wins, time });
                    }
                }
            });
            if (flag) {
                createWinnerCar({ id, wins, time });
            }
        });
    }
}
