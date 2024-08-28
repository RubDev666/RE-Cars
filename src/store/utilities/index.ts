import type { Car } from "@/types";

export const orderF = (currentArr: Car[], option: string): Car[] => {
    let newOrder = currentArr;

    if (option === 'Mayor precio') {
        newOrder.sort((x, y) => y.price - x.price);
    } else if (option === 'Menor precio') {
        newOrder.sort((x, y) => x.price - y.price);
    } else if (option === 'Más antiguos') {
        newOrder.sort((x, y) => x.year - y.year);
    } else if (option === 'Más recientes') {
        newOrder.sort((x, y) => y.year - x.year);
    }

    return newOrder;
}
