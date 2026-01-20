
import { Helmet } from 'react-helmet-async';

import { HomeView } from 'src/sections/Home/view';

// ----------------------------------------------------------------------

export default function HomeViewPage() {
  return (
    <>
      <Helmet>
        <title> Astaric</title>
      </Helmet>

      <HomeView />
    </>
  );
}
