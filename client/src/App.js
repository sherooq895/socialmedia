import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/user/login'
import Signup from './pages/user/signup'
import Home from './pages/user/homepage'
import Adminlogin from './pages/admin/Alogin'
import Admindashboard from './pages/admin/Dashboard'
import Userprofile from './pages/user/userprofile'
import Post from './pages/user/post'
import Addpost from './pages/user/addpost'
import Editprofile from './pages/user/editprofile'
import { usercontext } from './context/context'
import react, { useState } from 'react'

function App() {

  const [userdataa, setuserdata] = useState(usercontext)

  return (
    <div>
      <BrowserRouter>
        <usercontext.Provider value={[userdataa, setuserdata]}>
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/home' element={<Home />} />
            <Route path='/profile' element={<Userprofile />} />
            <Route path='/post' element={<Post />} />
            <Route path='/addpost' element={<Addpost />} />
            <Route path='/editprofile' element={<Editprofile />} />

          </Routes>
        </usercontext.Provider>

        <Routes>
          <Route exact path='/admin' element={<Adminlogin />} />
          <Route path='/admin/dashboard' element={<Admindashboard />} />



        </Routes>


      </BrowserRouter>


    </div>


  );
}

export default App;
