import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/navigationBar";
import { ResourceCard } from "./components/resourceCard/ResourceCard";
import ResourceTable from "./components/resourceTable/ResourceTable";

export default function Router() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route
          path="/"
          index
          element={<div>choose entity from top navigation bar</div>}
        />
        <Route path="/:resource" element={<ResourceTable />} />
        <Route path="/:resource/:id" element={<ResourceCard />} />
        <Route path="*" element={<div>not found</div>} />
      </Routes>
    </>
  );
}
