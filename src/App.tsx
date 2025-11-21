import { BrowserRouter, Route, Routes } from "react-router";
import AppHeader from "./components/AppHeader";
import Cities from "./pages/Cities";

function App() {
  return (
    <>
      <div className="pl-20 pt-2 pb-5 pr-20 grid min-w-full gap-5 min-h-full grid-cols-1 bg-gray-100">
        <AppHeader />
        <BrowserRouter>
          <Routes>
            <Route path="/api/data" element={<Cities />} />
          </Routes>
        </BrowserRouter>
      </div>
    </> );
}

export default App;
