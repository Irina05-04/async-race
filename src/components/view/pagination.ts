import BaseComponent from '../baseComponent';
import './pagination.scss';
localStorage.setItem('page', '1');
localStorage.setItem('winner-page', '1');

export class Pagination extends BaseComponent {
    private pageNumber: number;
    constructor(
        countPage: number,
        localName: string,
        private nextPage: (page: number) => void,
        private prevPage: (page: number) => void
    ) {
        super({
            classNames: ['pagination'],
        });
        this.pageNumber = localStorage[localName];
        const prev = new BaseComponent({
            tagName: 'button',
            classNames: ['pagination__prev'],
            textContent: 'prev',
        });
        if (this.pageNumber == 1) prev.setAttribute('disabled', 'true');
        this.insertChild(prev);
        const pageNumber = new BaseComponent({
            classNames: ['page'],
            textContent: `${this.pageNumber}`,
        });
        this.insertChild(pageNumber);
        const next = new BaseComponent({
            tagName: 'button',
            classNames: ['pagination__next'],
            textContent: 'next',
        });
        if (this.pageNumber == countPage) next.setAttribute('disabled', 'true');
        this.insertChild(next);
        prev.addListener('click', () => {
            this.pageNumber--;
            localStorage[localName] = `${this.pageNumber}`;
            prevPage(this.pageNumber);
        });
        next.addListener('click', () => {
            this.pageNumber++;
            localStorage[localName] = `${this.pageNumber}`;
            nextPage(this.pageNumber);
        });
    }
}
