import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Index from "./components/Index.js";
import Create from "./components/Create";
import Edit from "./components/Edit.js";

(function App () {
    
    render (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/create" element={<Create />} />
                <Route path="/:id/edit" element={<Edit />} />
            </Routes>
        </BrowserRouter>,
      document.getElementById("app")
    );
}());