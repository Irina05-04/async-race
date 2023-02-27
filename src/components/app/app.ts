import { viewController } from '../../controller/viewController';
import '../../global.scss';

export class App {
    constructor(private element: HTMLElement) {}
    start() {
        const controller = new viewController();
        this.element.append(controller.getNode());
    }
}
