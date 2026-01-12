import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { ProductionView } from 'src/sections/Converter/view';



// ----------------------------------------------------------------------

export default function AccountPage() {
  const params = useParams();
  return (
    <>
      <Helmet>
        <title>Pi-Edit : Edit</title>
      </Helmet>

      <ProductionView urlData={params}/>
    </>
  );
}
