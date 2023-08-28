import { Route, Routes } from "react-router-dom";
import { ColorProvider } from "./ColorContext";
import AdminPannelLayout from "./layout/AdminPannelLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Setting from "./pages/settings/Setting";
import AddUser from "./pages/product/AddUser";
import AddProduct from "./pages/product/AddProduct";
import LoginForm from "./pages/auth/LoginForm";

const App = () => {
  return (
    <ColorProvider>
      <Routes>
        <Route element={<AdminPannelLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
      </Routes>
    </ColorProvider>
  );
};

export default App;
