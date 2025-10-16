import React, {useEffect, useState} from "react"
import axios from 'axios'
import { NavLink } from "react-router-dom"
import Swal from "sweetalert2"

export default function List(){

    //state Prodi untuk menyimpan data response API Prodi
    const [prodi, setProdi] = useState([])

    //panggil API Prodi menggunakan useEffect dan axios
    useEffect( ()=> {
        axios
        .get("https://project-apiif-3-b.vercel.app/api/api/prodi")
        .then((response) =>{
            console.log(response.data);
            setProdi(response.data.result);
        })
    }, [])
    
    const handleDelete = (id, nama) => (
        Swal.fire({
        title:"Are you sure?",
        text: `You won't be able to revert this! Prodi: ${nama}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
        }).then((result) => {
        if (result.isConfirmed) {
            //Lakukan Penghapusan jika di konfirmasi
            axios.delete(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`)
            .then((response) => {
                //Hapus Prodi dari state setelah sukses dihapus dari server
                setProdi(prodi.filter((prodi) => prodi.id !== id))
                //Tampilkan notifikasi sukses 
                Swal.fire("Deleted!", "Your data has been deleted.", "success")
            })
            .catch((error) => {
                console.error("Error deleting data: ", error);
                Swal.fire(
                    "Error",
                    "There was an issue deleting the data",
                    "error"
                );
            });
        }
    })
)

        return (
            <div>
            <h2>List Prodi</h2>
            <NavLink to='create' className="btn btn-primary wb-3 btn-sm">Create</NavLink>
            <table className="table table-striped">
            <thead>
                <tr>
                    <th>Nama Prodi</th>
                    <th>Nama Fakultas</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {prodi.map( (data) => (
                    <tr key={data.id}>
                        <td>{data.nama}</td>
                        <td>{data.fakultas.nama}</td>
                        <td>
                            <button onClick={() => handleDelete(data.id, data.nama)}
                            className="btn btn-danger btn-sm">Hapus</button>

                            <NavLink to={`edit/${data.id}`}className="btn btn-warning btn-sm">Edit</NavLink>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
         </div>
            
        )
    }
