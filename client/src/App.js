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
import Profile from './pages/user/profile'
import { usercontext } from './context/context'
import Messenger from './pages/user/messenger'
import Userpost from './pages/user/userpost'
import Reportpost from './pages/admin/Reportpost'
import Reportuser from './pages/admin/Areportuser'
import Error from './pages/user/error'
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
            <Route path='/userprofile' element={<Profile />} />
            <Route path='/userchat' element={<Messenger />} />
            <Route path='/userpost' element={<Userpost />} />
            <Route path='/error' element={<Error />} />

          </Routes>
        </usercontext.Provider>

        <Routes>
          <Route exact path='/adminlogin' element={<Adminlogin />} />
          <Route path='/admin' element={<Admindashboard />} >
               <Route path='/admin/reportpost' element={<Reportpost/>} />
               <Route path='/admin/reportuser' element={<Reportuser/>} />
          </Route>
        </Routes>
      </BrowserRouter>


    </div>


  );
}

export default App;
