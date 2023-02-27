const models = ['mers', 'lada', 'renault', 'citroen', 'ford', 'jaguar', 'BMW', 'honda', 'mazda', 'nissan'];
const modelsAdd = ['m-1', 'm-2', 'm-3', 'm-4', 'm-5', 'm-6', 'm-7', 'm-8', 'm-9', 'm-10'];

const COUNT_CAR = 100;

const getRandomModel = () => {
    const model = models[Math.floor(Math.random() * models.length)];
    const add = modelsAdd[Math.floor(Math.random() * modelsAdd.length)];
    return `${model} ${add}`;
};

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const getRandomCars = (count = COUNT_CAR) =>
    new Array(count).fill(1).map(() => ({
        name: getRandomModel(),
        color: getRandomColor(),
    }));
