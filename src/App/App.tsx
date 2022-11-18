import { Route, Routes } from "react-router-dom";
import Header from "@/components/youngbin/Header";
import Main from "@/components/youngbin/Main";
import Header2 from "@/components/youngbin/Header2";
import ResultPage from "@/components/hwayeon/ResultPage";
import Hwayeon from "@/components/hwayeon/Hwayeon";


const App = () => {
  return (
    <Routes>
      <Route element={<Header2></Header2>}>
        <Route path="/" element={<Main></Main>} />
        <Route path="/Header" element={<Header></Header>} />
        <Route path="/code" element={<ResultPage></ResultPage>}>
          <Route path="/code/hwayeon" element={<Hwayeon></Hwayeon>} />
        </Route>
      </Route>
    </Routes>
  );
};
export default App;