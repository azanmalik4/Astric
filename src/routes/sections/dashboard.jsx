import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';
import { LoadingScreen, SplashScreen } from 'src/components/loading-screen';
import useUserData from 'src/routes/hooks/useUserData';

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/app'));

// User
const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));

// production imports

const ProductionListPage = lazy(() => import('src/pages/dashboard/production/list'));
const ProductionNewPage = lazy(() => import('src/pages/dashboard/production/new'));
const ProductionEditPage = lazy(() => import('src/pages/dashboard/production/edit'));

// Pi-Register imports

const Pi_RegisterListPage = lazy(() => import('src/pages/dashboard/Pi-Register/list'));
const Pi_RegisterNewPage = lazy(() => import('src/pages/dashboard/Pi-Register/new'));
const Pi_RegisterEditPage = lazy(() => import('src/pages/dashboard/Pi-Register/edit'));

// converter imports

const ConverterListPage = lazy(() => import('src/pages/dashboard/Converter/list'));
const ConverterNewPage = lazy(() => import('src/pages/dashboard/Converter/new'));
const ConverterEditPage = lazy(() => import('src/pages/dashboard/Converter/edit'));


// commercial imports

const CommercialListPage = lazy(() => import('src/pages/commercial/list'));
const CommercialNewPage = lazy(() => import('src/pages/commercial/new'));
const CommercialEditPage = lazy(() => import('src/pages/commercial/edit'));
const CommercialPDFPage = lazy(() => import('src/pages/commercial/pdf'));




export const dashboardRoutes = [
  {
    path: 'app',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'user',
        children: [
          { element: <UserAccountPage />, index: true },
          { path: 'account', element: <UserAccountPage /> },
        ],
      },
      {
        path: 'production',
        element: (
          <Outlet />
          // </RoleGuard>
        ),
        children: [
          {
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ProductionListPage />
              </Suspense>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ProductionNewPage />
              </Suspense>
            ),
          },
          {
            path: 'edit/:productionID/',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ProductionEditPage />
              </Suspense>
            ),
          },
        ],
      },
      
       {
        path: 'Pi-Register',
        element: (
          <Outlet />
          // </RoleGuard>
        ),
        children: [
          {
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Pi_RegisterListPage/>
              </Suspense>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Pi_RegisterNewPage />
              </Suspense>
            ),
          },
          {
            path: 'edit/:productionID/',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Pi_RegisterEditPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'Converter',
        element: (
          <Outlet />
          // </RoleGuard>
        ),
        children: [
          {
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ConverterListPage/>
              </Suspense>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ConverterNewPage />
              </Suspense>
            ),
          },
          {
            path: 'edit/:productionID/',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ConverterEditPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'commercial',
        element: (
          // <RoleGuard allowedRoles={[87, 88, 70, 898]}>
          <Outlet />
          // </RoleGuard>
        ),
        children: [
          {
            path: 'ExportInvoice',
            element: (
              // <RoleGuard allowedRoles={[87, 88, 70, 898]}>
              <Outlet />
              // </RoleGuard>
            ),
            children: [
              {
                element: (
                  <Suspense fallback={<LoadingScreen />}>
                    <CommercialListPage />
                  </Suspense>
                ),
                index: true,
              },
              {
                path: 'new',
                element: (
                  <Suspense fallback={<LoadingScreen />}>
                    <CommercialNewPage />
                  </Suspense>
                ),
              },
              {
                path: 'edit/:ExportInvoiceID',
                element: (
                  <Suspense fallback={<LoadingScreen />}>
                    <CommercialEditPage />
                  </Suspense>
                ),
              },

              // },
              {
                path: 'pdf/:ExportInvoiceID/',
                element: (
                  <Suspense fallback={<LoadingScreen />}>
                    <CommercialPDFPage />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      // {
      //   path: 'BookingOrder',
      //   children: [
      //     { element: <BookingViewPage />, index: true },
      //     // { path: 'view', element: <BookingViewPage /> },
      //     { path: 'add', element: <BookingAddPage /> },
      //     { path: 'edit/:id', element: <BookingEditPage /> },
      //   ],
      // },
    ],
  },
];
