import { CarInterface } from '../../interface/carInterface';

const url = 'http://127.0.0.1:3000';
const garage = `${url}/garage`;
const engine = `${url}/engine`;
const winners = `${url}/winners`;

const CARS_ON_PAGE_GARAGE = 7;
const CARS_ON_PAGE_WINNERS = 10;

export const getGarageCars = async (page: number, limit = CARS_ON_PAGE_GARAGE) => {
    const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
    return {
        items: await response.json(),
        count: response.headers.get('X-Total-Count'),
    };
};

export const getCar = async (id: number | undefined) => (await fetch(`${garage}/${id}`)).json();

export const createCar = async (data: { name: string; color: string }) =>
    (
        await fetch(garage, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    ).json();

export const deleteCar = async (id: number) => (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();

export const updateCarApi = async (id: number, body: { name: string; color: string }) =>
    (
        await fetch(`${garage}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    ).json();

export const startCar = async (id: number) =>
    (
        await fetch(`${engine}?id=${id}&status=started`, {
            method: 'PATCH',
        })
    ).json();

export const stopCar = async (id: number) =>
    (
        await fetch(`${engine}?id=${id}&status=stopped`, {
            method: 'PATCH',
        })
    ).json();

export const drive = async (id: number) => {
    const res = await fetch(`${engine}?id=${id}&status=drive`, {
        method: 'PATCH',
    }).catch();
    return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};

export const getWinnersCars = async (page: number, limit = CARS_ON_PAGE_WINNERS, sort?: string, order?: string) => {
    let orderStr = '';
    if (sort && order) orderStr = `&_sort=${sort}&_order=${order}`;
    const response = await fetch(`${winners}?_page=${page}&_limit=${limit}${orderStr}`);
    const item = await response.json();
    return {
        items: await Promise.all(
            item.map(async (winner: CarInterface) => ({ ...winner, car: await getCar(winner.id) }))
        ),
        count: response.headers.get('X-Total-Count'),
    };
};

export const getAllWinnersCars = async () => {
    const response = await fetch(`${winners}`);
    const item = await response.json();
    return {
        items: await Promise.all(
            item.map(async (winner: CarInterface) => ({ ...winner, car: await getCar(winner.id) }))
        ),
        count: response.headers.get('X-Total-Count'),
    };
};

export const getWinnerCar = async (id: number) => (await fetch(`${winners}${id}`)).json();

export const createWinnerCar = async (date: { id: number; wins: number; time: number }) =>
    (
        await fetch(winners, {
            method: 'POST',
            body: JSON.stringify(date),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    ).json();

export const deleteWinner = async (id: number) => (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();

export const updateWinner = async (id: number, body: { wins: number; time: number }) =>
    (
        await fetch(`${winners}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    ).json();
