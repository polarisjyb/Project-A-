import { Route, Routes } from "react-router-dom";
import Header from "@/components/youngbin/Layout/Header";
import Main from "@/components/youngbin/Layout/Main";


const App = () => {
  return (
    <Routes>
      <Route element={<Header></Header>}>
        <Route path="/" element={<Main></Main>} />
      </Route>
    </Routes>
  );
};
export default App;