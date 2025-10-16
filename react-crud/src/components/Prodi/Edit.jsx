import React, {useState, useEffect} from "react"; //Mengimpor React, useState, dan useEffect dari library React
import { useParams, useNavigate } from "react-router-dom"; //Menimpor useParams dan useNavigate dari react-router-dom untuk menangani parameter navigasi
import axios from "axios"; //Mengimpor axios untuk melakukan request HTTP

export default function Edit() {
    const { id } = useParams(); //Mengambil parameter "id" dari URL mengggunakan useParams
    const navigate = useNavigate(); //Menggunakan useNavigate untuk navigasi setelah proses selesai
    const [nama, setNama] = useState(""); //Menginisialisasi state 'nama' untuk menyimpan nama prodi
    const [fakultas, setFakultas] = useState("")
    const [fakultasList, setFakultasList] = useState([])
    const [error, setError] = useState(null); //Menginisialisasi state 'error' untuk menyimpan pesan error jika ada
    
    //Mengambil data prodi berdasarkan id ketika komponen pertama kali di muat
    useEffect( () => {
        axios
        .get(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`) //Mengirimkan request GET untuk mendapatkan data prodi berdasarkan id
        .then( (response) => {
            setNama(response.data.result.nama)
            setFakultas(response.data.result.fakultas.id)
        })
        .catch( (error) => {
            console.error("Error fetching data", error)
            setError("Data tidak ditemukan")
        })

        axios
        .get(`https://project-apiif-3-b.vercel.app/api/api/fakultas`) //Mengirimkan request GET untuk mendapatkan data prodi berdasarkan id
        .then( (response) => {
            setFakultasList(response.data.result)
        })
        .catch( (error) => {
            console.error("Error fetching fakultas data", error)
        })

    }, [id])
    

    //Menghandle perubahan input saat pengguna mengetik di form\
    const handleChange = (e) => {
        setNama(e.target.value)
    }

      const handleFakultasChange = (e) => {
        setFakultas(e.target.value)
    }

    //Menghandle submit form untuk mengedit data prodi
    const handleSubmit = (e) => {
        e.preventDefault()
        axios
        .patch(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`, {nama, fakultas_id: fakultas})
        .then( (response) => {
            navigate("/prodi")
        })
        .catch( (error) => {
            console.error("Error updating data:", error)
            setError("Gagal menggupdate data")
        })
    }
    return (
        <div>
            <h2>Edit Prodi</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nama" className="form-label">Nama Prodi</label>
                    <input 
                    type="text"
                    className="form-control"
                    id="nama"
                    value={nama}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fakultass" className="form-label">Nama Fakultas</label>
                    <select className="form-select" id="fakultas" value={fakultas}
                    onChange={handleFakultasChange}
                    required
                    >
                        <option value="">Pilih Fakultas</option>
                        {fakultasList.map(
                            (fakultas) => (
                                <option key={fakultas.id} value={fakultas.id}>
                                    {fakultas.nama}
                                </option>
                            )
                        )}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}