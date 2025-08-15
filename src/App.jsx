import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { HomePage } from "./pages/Home/HomePage";
import { Detail } from "./pages/Detail/Detail";
import Author from "./pages/Author/Author";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/author/:id" element={<Author />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
