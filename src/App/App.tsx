import { Route, Routes } from "react-router-dom";
import Header from "@/components/Header";
import Main from "@/components/Main";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main></Main>} />
      <Route path="/Header" element={<Header></Header>} />
    </Routes>
  );
};
export default App;
