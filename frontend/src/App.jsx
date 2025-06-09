import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/_auth/layout";
import Login from "./pages/_auth/login";
import Register from "./pages/_auth/register";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <h1>Header</h1>
      <Routes>
        <Route path="/auth" element={<AuthLayout/>}>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
