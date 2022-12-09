import { Route, Routes } from "react-router-dom";
import Header from "@/components/Mainpage/Header";
import Main from "@/components/Mainpage/Main";
import ResultPage from "@/components/SubPage/ResultPage";
import Average from "@/components/Strategy/Average";
import MainStrategy from "@/components/Strategy/MainStrategy";
import Fluctuation from "@/components/Strategy/Fluctuation";
import Overall from "@/components/Strategy/Overall";
import Volume from "@/components/Strategy/Volume";

const App = () => {
  return (
    <Routes>
      <Route element={<Header></Header>}>
        <Route path="/" element={<Main></Main>} />
        <Route path="/code/:key" element={<ResultPage />}>
          <Route path="/code/:key/" element={<MainStrategy></MainStrategy>} />
          <Route path="/code/:key/Average" element={<Average></Average>} />
          <Route
            path="/code/:key/Fluctuation"
            element={<Fluctuation></Fluctuation>}
          />
          <Route path="/code/:key/Overall" element={<Overall></Overall>} />
          <Route path="/code/:key/Volume" element={<Volume></Volume>} />
        </Route>
      </Route>
    </Routes>
  );
};
export default App;
