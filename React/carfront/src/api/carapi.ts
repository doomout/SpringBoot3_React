import  type { CarResponse, Car, CarEntry } from "../types";
import axios from 'axios';

export const getCars = async (): Promise<CarResponse[]> => {
    const token = sessionStorage.getItem("jwt");

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars`, {
        headers: { 'Authorization': token }
    });
    return response.data._embedded.cars;
}

export const deleteCar = async (link: string): Promise<CarResponse> =>  {
    const token = sessionStorage.getItem("jwt");
    const response = await axios.delete(link, {
        headers: { 'Authorization': token }
    });
    return response.data;
}


// 새 자동차 추가
export const addCar = async (car: Car): Promise<CarResponse> => {
    const token = sessionStorage.getItem("jwt");

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/cars`, car, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });

    return response.data;
}

// updateCar 함수를 추가
export const updateCar = async (carEntry: CarEntry):Promise<CarResponse> => {
    const response = await axios.put(carEntry.url, carEntry.car, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.data;
}