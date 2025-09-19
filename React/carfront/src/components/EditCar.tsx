import { useState } from "react";
import type { Car, CarResponse, CarEntry } from '../types';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CarDialogContent from "./CarDialogContent";
import { updateCar } from "../api/carapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type FormProps = {
    cardata : CarResponse;
}


function EditCar({cardata}: FormProps) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState<Car> ({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price: 0
    });

    const handleClickOpen = () => { 
        setCar({
            brand: cardata.brand,
            model: cardata.model,
            color: cardata.color,
            registrationNumber: cardata.registrationNumber,
            modelYear: cardata.modelYear,
            price: cardata.price
        });

        setOpen(true); 
    };
    
    const handleClose = () => { setOpen(false); };
    
    const handleSave = () => {
        const url = cardata._links.self.href;
        const carEntry: CarEntry = {car, url}
        mutate(carEntry);
        setCar({ brand:'', model:'', color:'', registrationNumber:'', modelYear: 0, price: 0 });
        setOpen(false);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
        const { name, value }  = event.target;
        setCar({
            ...car, 
            [name]: name === "modelYear" || name === "price" ? Number(value) : value,
        });
    }

    // 쿼리 클라이언트 가져오기
    const queryClient = useQueryClient();

    // useMutation 훅 이용
    const { mutate }= useMutation<CarResponse, Error, CarEntry>({
        mutationFn: updateCar,
        onSuccess: () => { 
            queryClient.invalidateQueries({ queryKey: ["cars"]}); 
        },
        onError: (err: Error) => { 
            console.error(err.message); 
        }
    });
    
    return (
        <>
            <button onClick={handleClickOpen}>Edit</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit car</DialogTitle>
                <CarDialogContent car={car} handleChange={handleChange}/>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditCar;