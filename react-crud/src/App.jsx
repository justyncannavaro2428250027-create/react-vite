import React, {Suspense} from "react"
import {BrowserRouter as Router, Route, Routes, NavLink} from "react-router-dom"

const Home = React.lazy( ()=> import('./components/Home'))
const FakultasList = React.lazy( ()=> import('./components/Fakultas/List'))
const FakultasCreate = React.lazy( ()=> import('./components/Fakultas/Create'))
const ProdiCreate = React.lazy( ()=> import('./components/Prodi/Create'))
const ProdiList = React.lazy( ()=> import('./components/Prodi/List'))

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
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
      <Suspense fallback ={<div>Loading.....</div>}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='fakultas' element={<FakultasList/>}/>
        <Route path='fakultas/create' element={<FakultasCreate/>}/>
        <Route path='prodi' element={<ProdiList/>}/>
        <Route path='prodi/create' element={<ProdiCreate/>}/>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
