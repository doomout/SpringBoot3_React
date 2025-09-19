import { useState } from "react";
import type { Car, CarResponse } from '../types';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CarDialogContent from "./CarDialogContent";

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
    const handleSave = () => { setOpen(false); };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setCar({...car, [event.target.name]: event.target.value});
    }

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