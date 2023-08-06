import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Home from "./components/home";
import Persons from "./components/persons";
import Tasks from "./components/tasks";

export default function App() {
  return (
    <Dashboard>
      <Routes>
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/persons" element={<Persons />} />
        <Route path="/" element={<Tasks />} />
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
    </Dashboard>
  );
}
