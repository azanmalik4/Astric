import { Helmet } from 'react-helmet-async';

import ProductionOpenGridView from 'src/sections/Pi-Register/view/Pi-Register-sheet-grid-view';

// ----------------------------------------------------------------------

export default function ProfileListPage() {
  return (
    <>
      <Helmet>
        <title> Pi : List View</title>
      </Helmet>

      <ProductionOpenGridView />
    </>
  );
}
