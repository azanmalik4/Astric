import { Helmet } from 'react-helmet-async';
import { ProductionAddView } from 'src/sections/Converter/view';



// ----------------------------------------------------------------------

export default function AccountPage() {
  return (
    <>
      <Helmet>
        <title>Pi: Add</title>
      </Helmet>
      <ProductionAddView />
    </>
  );
}
