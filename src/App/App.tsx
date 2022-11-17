import { Route, Routes } from "react-router-dom";
import Header from "@/components/youngbin/Header";
import Main from "@/components/youngbin/Main";
import Header2 from "@/components/youngbin/Header2";
import ResultPage from "@/components/hwayeon/ResultPage";


const App = () => {
  return (
    <Routes>
      <Route element={<Header2></Header2>}>
        <Route path="/" element={<Main></Main>} />
        <Route path="/Header" element={<Header></Header>} />
        <Route path="/company" element={<ResultPage></ResultPage>} />
      </Route>
    </Routes>
  );
};
export default App;