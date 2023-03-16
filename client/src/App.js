import {Routes,Route} from "react-router-dom"
import Home from "./pages/home/Home"
import Layout from "./components/layout/Layout.jsx"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Messenger from "./pages/messenger/Messenger"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
         <Route index element={<Home/>}/>
         <Route path="login" element={<Login/>}/>
         <Route path="register" element={<Register/>}/>
         <Route path="messenger" element={<Messenger/>}/>
      </Route>
    </Routes>
  );
}

export default App;
