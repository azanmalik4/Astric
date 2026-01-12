/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

// i18n
import 'src/locales/i18n';

// ----------------------------------------------------------------------
import { ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule, LicenseManager } from 'ag-grid-enterprise';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { LocalizationProvider } from 'src/locales';
import { useRouter } from 'src/routes/hooks';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';

import { AuthProvider } from 'src/auth/context/jwt';
import { useEffect } from 'react';

export default function App() {

  const router = useRouter();

  ModuleRegistry.registerModules([AllEnterpriseModule]);
  LicenseManager.setLicenseKey(
    'Using_this_{AG_Grid}Enterprise_key{AG-074500}in_excess_of_the_licence_granted_is_not_permitted_Please_report_misuse_to_legal@ag-grid.com_For_help_with_changing_this_key_please_contact_info@ag-grid.com{ITG}is_granted_a{Single_Application}Developer_License_for_the_application{INTEGRAB2B}only_for{1}Front-End_JavaScript_developer_All_Front-End_JavaScript_developers_working_on{INTEGRAB2B}need_to_be_licensed{INTEGRAB2B}has_not_been_granted_a_Deployment_License_Add-on_This_key_works_with{AG_Grid}Enterprise_versions_released_before{7_January_2026}[v3]_[01]_MTc2Nzc0NDAwMDAwMA==5178de3a49766a37d49cd920c9c41fd7'
  );

  useScrollToTop();

  const checkExpiry = () => {
    const loginTime = localStorage.getItem('loginTime');
    if (loginTime) {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - loginTime;
      const hoursDifference = timeDifference / (1000 * 60 * 60);
      if (hoursDifference >= 24) {
        router.replace('/auth/jwt/login');
        localStorage.removeItem('UserData');
        localStorage.removeItem('loginTime');
      }
    }
  };

  useEffect(() => {
    checkExpiry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <AuthProvider>
      <LocalizationProvider>
        <SettingsProvider
          defaultSettings={{
            themeMode: 'light', // 'light' | 'dark'
            themeDirection: 'ltr', //  'rtl' | 'ltr'
            themeContrast: 'default', // 'default' | 'bold'
            themeLayout: 'mini', // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: true,
          }}
        >
          <ThemeProvider>
            <MotionLazy>
              <SnackbarProvider>
                <SettingsDrawer />
                <ProgressBar />
                <Router />
                <SpeedInsights />
              </SnackbarProvider>
            </MotionLazy>
          </ThemeProvider>
        </SettingsProvider>
      </LocalizationProvider>
    </AuthProvider>
  );
}
