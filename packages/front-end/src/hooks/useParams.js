import { useParams as useParamsRouter } from 'react-router-dom';

const useParams = () => {
  const params = useParamsRouter();
  return params;
};

export default useParams;
