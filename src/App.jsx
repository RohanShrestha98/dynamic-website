import { Route, Routes } from "react-router-dom";
import { ColorProvider } from "./ColorContext";
import AdminPannelLayout from "./layout/AdminPannelLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import AddProduct from "./pages/product/AddProduct";
import Setting from "./pages/settings/Setting";

const App = () => {
  return (
    <ColorProvider>
      <Routes>
        <Route element={<AdminPannelLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
      </Routes>
    </ColorProvider>
  );
};

export default App;
