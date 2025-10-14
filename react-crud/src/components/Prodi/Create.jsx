import React, {useEffect, useState} from "react"
import axios from 'axios'

export default function CreateProdi(){
    //Inisialisasi state untuk menyimpan nama prodi
    const [namaProdi, setNamaProdi] = useState("");

    //Inisialisasi state untuk menyimpan ID Fakultas yang dipilih
    const [fakultasId, setFakultasId] = useState("");

    //Inisialisasi state untuk menyimpan daftar fakultas
    const [fakultasList, setFakultasList] = useState([]);

    //Inisialisasi state untuk menyimpan pesan error
    const [error, setError] = useState("");

    //Inisialisasi state untuk menyimpan pesan success
    const [success, setSuccess] = useState("");

    //Mengambil daftar fakultas dari API saat komponen dibuat
    useEffect(() => {
        const fetchFakultas = async () => {
            try {
                const response = await axios.get(
                    "https://project-apiif-3-b.vercel.app/api/api/fakultas"
                );
                setFakultasList(response.data.result); //Simpan data fakultas ke dalam state
            } catch (error) {
                setError("Failed to fetch fakultas data");
            }
        };
        fetchFakultas(); //Panggil fungsi untuk mengambil data fakultas
    }, []); //Kosongkan array dependensi agar hanya dijalankan sekali saat komponen dimuat

    //Fungsi yang akan dijalankan saat form disubmit
    const handleSubmit = async (e) => {
        e.preventDefault(); //Mencegah reload halaman setelah form disubmit
        setError(""); //Reset pesan error sebelum proses
        setSuccess(""); //Reset pesan success sebelum proses

    //Validasi input: jika namaprodi kosong, set pesan error
    if (namaProdi.trim() === "" || fakultasId.trim() === ""){
        setError("Nama Prodi and Fakultas are required"); //Set pesan error jika input kosong
        return; //Stop eksekusi fungsi jika input tidak valid
    }
    try {
        //Melakukan HTTP POST request untuk menyimpan data prodi
        const response = await axios.post(
            "https://project-apiif-3-b.vercel.app/api/api/prodi", //Endpoint API yang dituju
            {
                nama: namaProdi, //Data nama prodi
                fakultas_id: fakultasId //Data id fakultas yang dipilih
            }
        );
        //Jika response HTTP status 201 (Created), berarti berhasil
        if(response.status === 201) {
            //Tampilkan pesan sukses jika prodi berhasil dibuat
            setSuccess("Prodi Berhasil Dibuat");
            setNamaprodi("") //Kosongkan input form setelah success di submit
            setFakultasId(""); //Kosongkan dropdown setelah success di submit
        } else {
            //Jika tidak berhasil, tampilkan pesan error 
            setError("Failed To Create Prodi")
        }
    } catch (error){
        //Jika terjadi error (misal masalah jaringan), tampilkan pesan error
        setError("An error occured while creating prodi")
     }   
    };

    return (
  <div className="container mt-5">
    <h2 className="mb-4">Create Prodi</h2>
    {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
    {error && <div className="alert alert-danger">{error}</div>}
    {/* Jika ada pesan sukses, tampilkan dalam alert bootstrap */}
    {success && <div className="alert alert-success">{success}</div>}

    <form onSubmit={handleSubmit}>
      {/* Tangani event submit dengan handleSubmit */}
      <div className="mb-3">
        {/* Margin bottom pada div untuk jarak antar elemen */}
        <label className="form-label">Nama Prodi</label>
        {/* Input untuk nama prodi dengan class bootstrap untuk styling */}
        <input
          type="text" className="form-control" id="namaProdi"
          value={namaProdi} // Nilai input disimpan di state namaprodi
          onChange={(e) => setNamaProdi(e.target.value)} // Update state saat input berubah
          placeholder="Enter Prodi Name" // Placeholder teks untuk input
        />
      </div>
<div className="mb-3">
  <label className="form-label">Fakultas</label>
  {/* Dropdown untuk memilih fakultas */}
  <select
    className="form-select"
    id="fakultasId"
    value={fakultasId} // Nilai dropdown disimpan di state fakultasId
    onChange={(e) => setFakultasId(e.target.value)} // Update state saat pilihan berubah
  >
    <option value="">Select Fakultas</option>
    {fakultasList.map((fakultas) => (
      <option key={fakultas.id} value={fakultas.id}>
        {/* Set key dan value untuk masing-masing fakultas */}
        {fakultas.nama} {/* Nama fakultas sebagai teks di dropdown */}
      </option>
    ))}
  </select>
</div>
{/* Tombol submit dengan class bootstrap */}
<button type="submit" className="btn btn-primary">
  Create
</button>   
    </form>
  </div>
);
}


