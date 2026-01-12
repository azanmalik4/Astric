import { paramCase } from 'src/utils/change-case';

import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/app',
};

// ----------------------------------------------------------------------

export const paths = {
  page403: '/403',
  page404: '/404',
  page500: '/500',

  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    user: {
      account: `${ROOTS.DASHBOARD}/user/account`,
    },
    reports: {
      root: `${ROOTS.DASHBOARD}/reports`,
    },

    production: {
      root: `${ROOTS.DASHBOARD}/production`,
      new: `${ROOTS.DASHBOARD}/production/new`,
      edit: (productID) => `${ROOTS.DASHBOARD}/production/edit/${productID}`,
    },

   Pi_Register: {
    root: `${ROOTS.DASHBOARD}/Pi-Register`,
      new: `${ROOTS.DASHBOARD}/Pi-Register/new`,
       list: `${ROOTS.DASHBOARD}/Pi-Register/view`,
      edit: (productID) => `${ROOTS.DASHBOARD}/Pi-Register/edit/${productID}`,
   },
    Converter: {
    root: `${ROOTS.DASHBOARD}/Converter`,
      new: `${ROOTS.DASHBOARD}/Converter/new`,
       list: `${ROOTS.DASHBOARD}/Converter/view`,
      edit: (productID) => `${ROOTS.DASHBOARD}/Converter/edit/${productID}`,
   },

    Commercial: {
      root: `${ROOTS.DASHBOARD}/commercial`,
      ExportInvoice: {
        root: `${ROOTS.DASHBOARD}/commercial/ExportInvoice`,
        list: `${ROOTS.DASHBOARD}/commercial/ExportInvoice/view`,
        new: `${ROOTS.DASHBOARD}/commercial/ExportInvoice/new`,
        edit: (ExportInvoiceID) =>
          `${ROOTS.DASHBOARD}/commercial/ExportInvoice/edit/${ExportInvoiceID}`,
        add: (opportunityID) => `${ROOTS.DASHBOARD}/commercial/ExportInvoice/add/${opportunityID}`,
        // revision: (opportunityID) => ${ROOTS.DASHBOARD}/transaction/ExportInvoice/revision/${opportunityID},
        // approver: (opportunityID) => ${ROOTS.DASHBOARD}/transaction/ExportInvoice/approver/${opportunityID},
        pdf: (ExportInvoiceID) =>
          `${ROOTS.DASHBOARD}/commercial/ExportInvoice/pdf/${ExportInvoiceID}`,
      },
    },
  },
};
