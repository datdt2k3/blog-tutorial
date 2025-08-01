import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { HomePage } from "./pages/Home/HomePage";
import { Detail } from "./pages/Detail/Detail";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/detail" element={<Detail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
