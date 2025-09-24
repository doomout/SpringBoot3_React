import { useState } from 'react';
import { getCars, deleteCar } from '../api/carapi';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DataGrid, type GridCellParams, type GridColDef } from '@mui/x-data-grid';
import type { CarResponse } from '../types';
import Snackbar from '@mui/material/Snackbar';
import AddCar from './AddCar';
import EditCar from './EditCar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function CatList() {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data, error, isSuccess } = useQuery ({
        queryKey: ["cars"],
        queryFn: getCars
    });

    const columns: GridColDef[] = [
        {field: 'brand', headerName: 'Brand', width: 200},
        {field: 'model', headerName: 'Model', width: 200},
        {field: 'color', headerName: 'Color', width: 200},
        {field: 'registrationNumber', headerName: 'Reg.nr.', width: 150},
        {field: 'modelYear', headerName: 'Model Year', width: 150},
        {field: 'price', headerName: 'Price', width: 150},
        {
            field: 'edit',
            headerName: '',
            width: 90,
            sortable: false,
            filterable:false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => <EditCar cardata={params.row} />
        },
        {
            field: 'delete',
            headerName: '',
            width: 90,
            sortable: false,
            filterable:false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <IconButton aria-label="delete" size="small"
                    onClick={() =>{ 
                        if (window.confirm(`${params.row.brand} - ${params.row.model}을 삭제 하시겠습니까?`)) {
                            mutate(params.row._links.car.href)
                        }
                    }}
                >
                <DeleteIcon fontSize="small" />    
                </IconButton>
            ),
        },
    ];

    const { mutate } = useMutation<CarResponse, Error, string>({
        mutationFn: deleteCar,
        onSuccess: () => {
            setOpen(true);
            // 자동차 삭제 이후 실행되는 로직
            queryClient.invalidateQueries({ queryKey: ['cars']});
        },
        onError: (err) => {
            console.error(err);
        },
    });

    if(!isSuccess) {
        return <span>Loading...</span>
    }
    else if(error) {
        return <span>Error when fetching cars...</span>
    }
    else {
        return (
            <>      
            <AddCar />      
            <DataGrid 
                rows={data}
                columns={columns}
                disableSelectionOnClick={true}
                getRowId={row => row._links.self.href}
            />
            <Snackbar 
                open={open}
                autoHideDuration={20000}
                onClose={() => setOpen(false)}
                message="삭제 성공"
            />
            </>
        );
    }
}

export default CatList;