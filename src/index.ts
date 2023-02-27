import { App } from './components/app/app';

const appElement = document.body;
if (appElement) {
    const app = new App(appElement);
    app.start();
}
