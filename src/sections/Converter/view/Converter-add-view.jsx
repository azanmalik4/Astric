import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import AccountGeneralAdd from '../Converter-add'

// ----------------------------------------------------------------------

export default function ProductionAddView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Converter"
        links={[
          { name: 'Home', href: paths.dashboard.root },
          { name: 'Converter', href: paths.dashboard.Converter.root },
          { name: 'Add' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <AccountGeneralAdd />
    </Container>
  );
}
