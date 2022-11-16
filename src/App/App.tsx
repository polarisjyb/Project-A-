import { Route, Routes } from "react-router-dom";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Header2 from "@/components/Header2";

const App = () => {
  return (
    <Routes>
      <Route element={<Header2></Header2>}>
        <Route path="/" element={<Main></Main>} />
        <Route path="/Header" element={<Header></Header>} />
      </Route>
    </Routes>
  );
};
export default App;
