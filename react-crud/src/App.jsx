import React, {Suspense} from "react"
import {BrowserRouter as Router, Route, Routes, NavLink} from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import Logout from "./components/Logout"

const Home = React.lazy( ()=> import('./components/Home'))
const FakultasList = React.lazy( ()=> import('./components/Fakultas/List'))
const FakultasCreate = React.lazy( ()=> import('./components/Fakultas/Create'))
const FakultasEdit = React.lazy( ()=> import('./components/Fakultas/Edit')) 
const ProdiCreate = React.lazy( ()=> import('./components/Prodi/Create'))
const ProdiList = React.lazy( ()=> import('./components/Prodi/List'))
const ProdiEdit = React.lazy( ()=> import('./components/Prodi/Edit')) 
const Login = React.lazy(() => import("./components/Login"));

function App() {

  return (
    <Router>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">React CRUD</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li class="nav-item">
          <NavLink className="nav-link" to="fakultas">Fakultas</NavLink>
        </li>
            <li class="nav-item">
          <NavLink className="nav-link" to="prodi">Prodi</NavLink>
          
        </li>
      </ul>
      
    </div>
  </div>
</nav>
      <Suspense fallback ={<div>Loading.....</div>}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='fakultas' element={<ProtectedRoute><FakultasList/></ProtectedRoute>}/>
        <Route path='fakultas/create' element={<ProtectedRoute><FakultasCreate/></ProtectedRoute>}/>
        <Route path='fakultas/edit/:id' element={<ProtectedRoute><FakultasEdit/></ProtectedRoute>}/>
        <Route path='prodi' element={<ProtectedRoute><ProdiList/></ProtectedRoute>}/>
        <Route path='prodi/create' element={<ProtectedRoute><ProdiCreate/></ProtectedRoute>}/>
        <Route path='prodi/edit/:id' element={<ProtectedRoute><ProdiEdit/></ProtectedRoute>}/>
        <Route path='login' element={<Login/>}/>
        <Route path="/logout" element={<Logout />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
