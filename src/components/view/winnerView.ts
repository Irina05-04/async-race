import { getWinnersCars } from '../api/api';
import BaseComponent from '../baseComponent';
import { Pagination } from './pagination';
import { WinnerCar } from './winnerCar';
import './winnerView.scss';

const pageNumber = 1;
const LIMIT_WINNER = 4;
localStorage['order'] = 'ASC';
localStorage['orderWins'] = 'ASC';

export class WinnerView extends BaseComponent {
    private totalSum: BaseComponent | undefined;
    private pagination: Pagination | undefined;
    private table: BaseComponent;
    private tableContent: BaseComponent;
    private winnerWraper: BaseComponent | undefined;
    constructor() {
        super({
            classNames: ['winner-page'],
        });
        const header = new BaseComponent({
            classNames: ['winner__header'],
            textContent: 'Winner',
        });
        this.insertChild(header);
        this.insertChild(header);
        (async () => {
            const res = await getWinnersCars(pageNumber, 2);
            if (typeof res.count === 'string') {
                this.totalSum = new BaseComponent({
                    classNames: ['winner__total-sum'],
                    textContent: `count ${res.count}`,
                });
                header.insertChild(this.totalSum);
            }
        })();
        this.table = new BaseComponent({
            tagName: 'table',
            classNames: ['winners'],
        });
        this.insertChild(this.table);
        const caption = new BaseComponent({
            tagName: 'tr',
            classNames: ['winners__caption'],
        });
        this.table.insertChild(caption);
        const captionNumber = new BaseComponent({
            tagName: 'th',
            textContent: 'number',
        });
        caption.insertChild(captionNumber);
        const captionCar = new BaseComponent({
            tagName: 'th',
            textContent: 'car',
        });
        caption.insertChild(captionCar);
        const captionName = new BaseComponent({
            tagName: 'th',
            textContent: 'name',
        });
        caption.insertChild(captionName);
        const captionWins = new BaseComponent({
            tagName: 'th',
            textContent: localStorage['wins'] ? localStorage['wins'] : 'wins',
            classNames: ['winner__sort'],
        });
        caption.insertChild(captionWins);
        const captionTime = new BaseComponent({
            tagName: 'th',
            textContent: localStorage['time'] ? localStorage['time'] : 'time',
            classNames: ['winner__sort'],
        });
        caption.insertChild(captionTime);
        this.tableContent = new BaseComponent({
            tagName: 'table',
            classNames: ['winners'],
        });
        this.insertChild(this.tableContent);
        this.drawSortCars(+localStorage['winner-page']);

        captionTime.addListener('click', () => {
            localStorage['wins'] = 'wins';
            localStorage['sort'] = 'time';
            localStorage['orderWins'] = 'ASC';
            captionWins.setContent(`wins`);
            this.drawWinnerCars(+localStorage['winner-page'], localStorage['sort'], localStorage['order']);
            if (localStorage['order'] == 'ASC') {
                captionTime.setContent(`time↑`);
                localStorage['time'] = 'time↑';
                localStorage['order'] = 'DESC';
            } else if (localStorage['order'] == 'DESC') {
                localStorage['time'] = 'time↓';
                captionTime.setContent(`time↓`);
                localStorage['order'] = 'ASC';
            }
        });
        captionWins.addListener('click', () => {
            localStorage['time'] = 'time';
            localStorage['sort'] = 'wins';
            captionTime.setContent(`time`);
            localStorage['order'] = 'ASC';
            this.drawWinnerCars(+localStorage['winner-page'], localStorage['sort'], localStorage['orderWins']);
            if (localStorage['orderWins'] == 'ASC') {
                captionWins.setContent(`wins↑`);
                localStorage['wins'] = 'wins↑';
                localStorage['orderWins'] = 'DESC';
            } else if (localStorage['orderWins'] == 'DESC') {
                captionWins.setContent(`wins↓`);
                localStorage['wins'] = 'wins↓';
                localStorage['orderWins'] = 'ASC';
            }
        });
    }
    drawWinnerCars(page: number, sort?: string, order?: string) {
        if (this.pagination) this.pagination.remove();
        if (this.winnerWraper) this.winnerWraper.remove();
        this.winnerWraper = new BaseComponent();
        this.tableContent.insertChild(this.winnerWraper);
        getWinnersCars(page, LIMIT_WINNER, sort, order).then((v) => {
            v.items.forEach((item) => {
                const winnerCar = new WinnerCar(item.id, item.car.name, item.car.color, item.wins, item.time);
                this.winnerWraper?.insertChild(winnerCar);
            });
            this.pagination = new Pagination(
                Math.ceil(v.count ? +v.count / LIMIT_WINNER : 1),
                'winner-page',
                (page: number) => this.nextPage(page),
                (page: number) => this.prevPage(page)
            );
            this.insertChild(this.pagination);
        });
    }
    nextPage(page: number) {
        this.drawSortCars(page);
    }
    prevPage(page: number) {
        this.drawSortCars(page);
    }
    drawSortCars(page: number) {
        if (localStorage['sort'] == 'time') {
            if (localStorage['order'] == 'ASC') this.drawWinnerCars(page, localStorage['sort'], 'DESC');
            else if (localStorage['order'] == 'DESC') this.drawWinnerCars(page, localStorage['sort'], 'ASC');
        } else if (localStorage['sort'] == 'wins') {
            if (localStorage['orderWins'] == 'ASC') this.drawWinnerCars(page, localStorage['sort'], 'DESC');
            else if (localStorage['orderWins'] == 'DESC') this.drawWinnerCars(page, localStorage['sort'], 'ASC');
        } else this.drawWinnerCars(page);
    }
}
