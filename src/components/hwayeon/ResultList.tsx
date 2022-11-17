import { useParams } from 'react-router-dom';
import Categories from './Categories';
import Total from './Total';
import Strategy from './Strategy';


const ResultList = () => {
  const params = useParams();
  const category = params.category || 'all';

  return(
    <>
      <Total />
      <Strategy />
    </>
  )
}

export default ResultList;