import { getCars, deleteCar } from '../api/carapi';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DataGrid, type GridCellParams, type GridColDef } from '@mui/x-data-grid';
import type { CarResponse } from '../types';


function CatList() {
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
            field: 'delete',
            headerName: '',
            width: 90,
            sortable: false,
            filterable:false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <button onClick={() => mutate(params.row._links.car.href)}>
                    Delete
                </button>
            ),
        },
    ];

    const { mutate } = useMutation<CarResponse, Error, string>({
        mutationFn: deleteCar,
        onSuccess: () => {
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
            <DataGrid 
                rows={data}
                columns={columns}
                disableRowSelectionOnClick={true}
                getRowId={row => row._links.self.href}
            />
        );
    }
}

export default CatList;