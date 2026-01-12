import { useCallback, useEffect, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useSnackbar } from 'src/components/snackbar';
import { LoadingScreen } from 'src/components/loading-screen';
import { Delete, Get } from 'src/api/apibasemethods';
import {
  colorSchemeDarkBlue,
  themeAlpine,
  themeBalham,
  themeMaterial,
  themeQuartz,
} from 'ag-grid-enterprise';
import { useSettingsContext } from 'src/components/settings';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import {
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Button,
  Tab,
  Tabs,
  Box,
} from '@mui/material';
import { Stack, textAlign } from '@mui/system';
import Scrollbar from 'src/components/scrollbar';
import { APP_API_STORAGE } from 'src/config-global';
import PropTypes from 'prop-types';
import { fDate } from 'src/utils/format-time';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import { fNumber } from 'src/utils/format-number';

// Create a file called StatusRenderer.js or add this to your existing file
const StatusRenderer = (params) => {
  // eslint-disable-next-line
  const status = params.value;
  // eslint-disable-next-line
  let backgroundColor, textColor, borderColor;

  switch (status) {
    case 'Approved':
      // backgroundColor = 'rgba(208, 245, 216, 0.5)';
      textColor = '#63913a';
      // borderColor = '#00a854';
      // borderColor = 'rgba(208, 245, 216, 0.5)';
      break;
    case 'Rejected':
      // backgroundColor = 'rgba(255, 204, 204, 0.5)';
      textColor = '#a80000';
      // borderColor = 'rgba(255, 204, 204, 0.5)';
      break;
    case 'Pending':
      // backgroundColor = '#fff7e6';
      textColor = '#cd8f4d';
      // borderColor = '#fa8c16';
      break;
    default:
      // backgroundColor = '#f5f5f5';
      textColor = '#595959';
    // borderColor = '#d9d9d9';
  }

  return (
    <div
      style={{
        display: 'inline-block',
        padding: '0px 6px',
        borderRadius: '8px',
        backgroundColor,
        color: textColor,
        border: `1px solid ${borderColor}`,
        // fontSize: '8px',
        textAlign: 'center',
      }}
    >
      {status}
    </div>
  );
};

const ImageNameRender =
  (id) =>
  // eslint-disable-next-line
  ({ data }) => {
    const name = data?.[`Approver${id}_Name`] || '';
    const image = data?.[`Approver${id}_Image`] || '';

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'left',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          // padding: '0 8px',
        }}
      >
        {image && (
          <img
            src={image}
            alt="Approver"
            style={{ width: '25px', height: '25px', marginRight: '8px', borderRadius: '50%' }}
          />
        )}
        <span style={{ textOverflow: 'ellipsis' }}>{name}</span>
      </div>
    );
  };

const getRowStyle = (params) => {
  if (params.data.ApplyForReapproval === 'Y') {
    return { backgroundColor: 'rgba(99, 145, 58, 0.1)' }; // CYCLO green background
  }
  return null;
};

const PiGrid = ({ superSearch }) => {
  const settings = useSettingsContext();
  const navigate = useNavigate();
  const themeDark = themeBalham.withPart(colorSchemeDarkBlue);
  const { enqueueSnackbar } = useSnackbar();
  const userData = useMemo(() => JSON.parse(localStorage.getItem('UserData')), []);

  // Tab state
  const [activeTab, setActiveTab] = useState(0);
  const [piMasterData, setPiMasterData] = useState([]);
  const [piDetailData, setPiDetailData] = useState({});
  const [loadingDetails, setLoadingDetails] = useState({});

  const [sampleMasterData, setSampleMasterData] = useState([]);
  const [sampleDetailData, setSampleDetailData] = useState({});
  const [sampleLoadingDetails, setSampleLoadingDetails] = useState({});

  // Navigation function
  const moveToEditForm = (PIID) => {
    navigate(paths.dashboard.Commercial.ExportInvoice.add(PIID));
  };
  // const moveToRevisionForm = (PIID) => {
  //   navigate(paths.dashboard.transaction.pi.revision(PIID));
  // };
  // const moveToApproverForm = (PIID) => {
  //   navigate(paths.dashboard.transaction.pi.approver(PIID));
  // };
  const moveToPDFView = (PIID) => {
    navigate(paths.dashboard.Commercial.ExportInvoice.pdf(PIID));
  };

  const deleteProformaInvoice = async () => {
    if (!selectedPIID) {
      enqueueSnackbar('Proforma ID not selected.', { variant: 'error' });
      return;
    }
    try {
      const response = await Delete(`DeleteProformaInvoice?piid=${selectedPIID}`);
      if (response.status === 200) {
        enqueueSnackbar('Proforma invoice deleted successfully', { variant: 'success' });
        fetchPis();
      } else {
        enqueueSnackbar('Failed to delete proforma invoice', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error deleting proforma invoice:', error);
      enqueueSnackbar('Error deleting proforma invoice', { variant: 'error' });
    }
  };

  // State for grid data
  const [rowData, setRowData] = useState([]);
  const [sampleData, setSampleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [searchParams, setSearchParams] = useState({
    PINo: '',
    customer: '',
    QuotationNo: '',
    opportunity: '',
    status: '',
  });

  const confirm = useBoolean();
  const [selectedPIID, setSelectedPIID] = useState(null);

  const containerStyle = useMemo(() => ({ width: '100%', height: '500px' }), []);

  const fetchPiMasterData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await Get(
        `CommercialModule/GetPIList?Org_ID=${userData?.userDetails?.orgId}&Branch_ID=${userData?.userDetails?.branchID}`
      );

      if (response.status === 200 && response.data.Success) {
        const masterData = response.data.Data || [];

        // Format the master data to match your existing structure
        const formattedData = masterData.map((pi) => ({
          ...pi,
          PINo: pi.PINo || '',
          WIC_Name: pi.WIC_Name || '',
          ValidFrom: pi.ValidFrom || '',
          ValidUntil: pi.ValidUntil || '',
          // Add any other necessary fields with default values
          Approver1_Name: pi.PreparedBy || '',
          // Set default values for approval status fields if needed
          Level1_Approve: 'Pending',
          Level2_Approve: 'Pending',
          Level3_Approve: 'Pending',
          // Add empty detail array placeholder
          ProformaDtl: [],
        }));

        setPiMasterData(formattedData);

        // Initialize detail data structure
        const initialDetailData = {};
        formattedData.forEach((pi) => {
          initialDetailData[pi.PIID] = null; // null means not loaded yet
        });
        setPiDetailData(initialDetailData);
      } else {
        setPiMasterData([]);
        enqueueSnackbar(response.data.Message || 'No PI data found', { variant: 'info' });
      }
    } catch (error) {
      console.error('Error fetching PI master data:', error);
      setPiMasterData([]);
      enqueueSnackbar('Error fetching PI data', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [userData, enqueueSnackbar]);

  // Fetch PI Detail data for a specific PI
  const fetchPiDetailData = useCallback(
    async (piId) => {
      if (piDetailData[piId] !== null && piDetailData[piId] !== undefined) {
        return; // Already loaded or loading
      }

      try {
        setLoadingDetails((prev) => ({ ...prev, [piId]: true }));

        const response = await Get(`CommercialModule/GetPIDetailsByPIID?PIID=${piId}`);

        if (response.status === 200 && response.data.Success) {
          // Use response.data.Data instead of response.data.ProformaDtl
          const detailData = response.data.Data || [];

          setPiDetailData((prev) => ({
            ...prev,
            [piId]: detailData,
          }));
        } else {
          setPiDetailData((prev) => ({
            ...prev,
            [piId]: [], // Empty array if no details found
          }));
        }
      } catch (error) {
        console.error(`Error fetching details for PI ${piId}:`, error);
        setPiDetailData((prev) => ({
          ...prev,
          [piId]: [], // Empty array on error
        }));
      } finally {
        setLoadingDetails((prev) => ({ ...prev, [piId]: false }));
      }
    },
    [piDetailData]
  );

  // Fetch PI data
  const fetchPis = useCallback(async () => {
    try {
      setLoading(true);
      const response = await Get(
        `GetAllRevisePIList?ORGID=${userData?.userDetails?.orgId}&BRANCHID=${userData?.userDetails?.branchID}&RoleID=${70}&UserID=${userData?.userDetails?.userId}`
      );

      if (response.status === 200 && response.data.Success) {
        const res = await Get(
          `getDocumentApproverByID?&ApproverID=${userData?.userDetails?.userId}&DocID=2`
        );

        let data = res?.data || [];
        if (res?.data?.Data) {
          data = res?.data?.Data || [];
        }
        const formattedData = response.data.ProformaMst.map((pi) => {
          // Find all details for this pi
          const details = response.data.ProformaDtl.filter((detail) => detail.PIID === pi.PIID);

          // For each detail, find its history
          const detailsWithHistory = details.map((detail) => ({
            ...detail,
            history: response.data.ProformaDtlHistory.filter(
              (history) => history.PIDtlID === detail.PIDtlID
            ),
          }));

          const hasApproved =
            pi?.Level1_Approve === 'A' && pi?.Level2_Approve === 'A' && pi?.Level3_Approve === 'A';
          let image1;
          let image2;
          let image3;
          if (pi.Level1_Approved_ID !== null) {
            image1 =
              pi?.Approver1_Image !== ''
                ? `${APP_API_STORAGE}${pi?.Approver1_Image}`
                : '/assets/images/dummy.jpg';
          }
          if (pi.Level2_Approved_ID !== null) {
            image2 =
              pi?.Approver2_Image !== ''
                ? `${APP_API_STORAGE}${pi?.Approver2_Image}`
                : '/assets/images/dummy.jpg';
          }
          if (pi.Level3_Approved_ID !== null) {
            image3 =
              pi?.Approver3_Image !== ''
                ? `${APP_API_STORAGE}${pi?.Approver3_Image}`
                : '/assets/images/dummy.jpg';
          }

          return {
            ...pi,
            PINo: pi?.ApplyForReapproval ? `${pi?.PINo}-R` : pi?.PINo,
            hasApproved,
            Approver1_Image: image1,
            Approver2_Image: image2,
            Approver3_Image: image3,
            Level1_Approve:
              pi?.Level1_Approve === 'A'
                ? 'Approved'
                : pi?.Level1_Approve === 'R'
                  ? 'Rejected'
                  : 'Pending',
            Level2_Approve:
              pi?.Level2_Approve === 'A'
                ? 'Approved'
                : pi?.Level2_Approve === 'R'
                  ? 'Rejected'
                  : 'Pending',
            Level3_Approve:
              pi?.Level3_Approve === 'A'
                ? 'Approved'
                : pi?.Level3_Approve === 'R'
                  ? 'Rejected'
                  : 'Pending',

            ProformaDtl: detailsWithHistory,
          };
        });

        if (data?.length > 0) {
          const updatedData = formattedData?.map((item) => {
            // Get the current approval level from data[0]
            const currentApprovalLevel = data[0]?.Approval_Lvl_ID;

            let toApprove = false;

            // Only check conditions for the current approval level
            if (currentApprovalLevel === 1) {
              toApprove = item?.Level1_Approve !== 'Approved';
            } else if (currentApprovalLevel === 2) {
              toApprove = item?.Level2_Approve !== 'Approved';
            } else if (currentApprovalLevel === 3) {
              toApprove = item?.Level3_Approve !== 'Approved';
            }

            return {
              ...item,
              ToBeApproved: toApprove,
            };
          });
          setRowData(updatedData);
        } else {
          setRowData(formattedData);
        }
      } else {
        setRowData([]);
        enqueueSnackbar(response.data.Message || 'No data found', { variant: 'info' });
      }
    } catch (error) {
      console.error(error);
      setRowData([]);
    } finally {
      setLoading(false);
    }
  }, [userData, enqueueSnackbar]);

  const fetchSampleMasterData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await Get(
        `CommercialModule/GetExportInvoiceList?Org_ID=${userData?.userDetails?.orgId}&Branch_ID=${userData?.userDetails?.branchID}`
      );

      if (response.status === 200 && response.data.Success) {
        const masterData = response.data.Data || [];

        // Format the master data to match your grid structure
        const formattedData = masterData.map((sample) => ({
          ...sample,
          PINo: sample.PINo || '',
          WIC_Name: sample.CustomerName || '-',
          ExportInvoiceNo: sample.ExportInvoiceNo || '-',
          ExportInvoiceDate: sample.ExportInvoiceDate ? sample.ExportInvoiceDate.split('T')[0] : '',
          ExportInvoiceValue: sample.ExportInvoiceValue,
          LCNo: sample.LCNo || '-',
          LCAmount: sample.LCAmount.toFixed(2) || 0.0,
          LCDate: sample.LCDate ? sample.LCDate.split('T')[0] : '',
          GoodsValue: sample.GoodsValue.toFixed(2) || 0.0,
          Commission: sample.Commission.toFixed(2) || 0.0,
          AdjustmentAmount: sample.AdjustmentAmount.toFixed(2) || 0.0,
          ExchangeRate: sample.ExchangeRate.toFixed(2) || 0.0,
          InvoiceValueInTK: sample.InvoiceValueInTK.toFixed(2) || 0.0,
          InvoiceQty: sample.InvoiceQty || '0',
          Remarks: sample.Remarks || 'N/A',
        }));

        setSampleMasterData(formattedData);

        // Initialize detail data structure
        const initialDetailData = {};
        formattedData.forEach((sample) => {
          initialDetailData[sample.ExportInvoiceID] = null; // null means not loaded yet
        });
        setSampleDetailData(initialDetailData);
      } else {
        setSampleMasterData([]);
        enqueueSnackbar(response.data.Message || 'No export invoice data found', {
          variant: 'info',
        });
      }
    } catch (error) {
      console.error('Error fetching export invoice master data:', error);
      setSampleMasterData([]);
      enqueueSnackbar('Error fetching export invoice data', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [userData, enqueueSnackbar]);

  // Fetch Sample Detail data
  const fetchSampleDetailData = useCallback(
    async (exportInvoiceId) => {
      if (
        sampleDetailData[exportInvoiceId] !== null &&
        sampleDetailData[exportInvoiceId] !== undefined
      ) {
        return; // Already loaded or loading
      }

      try {
        setSampleLoadingDetails((prev) => ({ ...prev, [exportInvoiceId]: true }));

        const response = await Get(
          `CommercialModule/GetExportInvoiceDetails?ExportInvoiceID=${exportInvoiceId}`
        );

        if (response.status === 200 && response.data.Success) {
          // Use response.data.Breakdown for sample details
          const detailData = response.data.Breakdown || [];

          setSampleDetailData((prev) => ({
            ...prev,
            [exportInvoiceId]: detailData,
          }));
        } else {
          setSampleDetailData((prev) => ({
            ...prev,
            [exportInvoiceId]: [], // Empty array if no details found
          }));
        }
      } catch (error) {
        console.error(`Error fetching details for Export Invoice ${exportInvoiceId}:`, error);
        setSampleDetailData((prev) => ({
          ...prev,
          [exportInvoiceId]: [], // Empty array on error
        }));
      } finally {
        setSampleLoadingDetails((prev) => ({ ...prev, [exportInvoiceId]: false }));
      }
    },
    [sampleDetailData]
  );

  // Fetch Sample data
  const fetchSamples = useCallback(async () => {
    try {
      setLoading(true);
      const response = await Get(
        `GetAllRevisePIList?ORGID=${userData?.userDetails?.orgId}&BRANCHID=${userData?.userDetails?.branchID}&RoleID=${70}&UserID=${userData?.userDetails?.userId}&IsSample=true`
      );

      if (response.status === 200 && response.data.Success) {
        const formattedData = response.data.ProformaMst.map((sample) => {
          // Find all details for this sample
          const details = response.data.ProformaDtl.filter((detail) => detail.PIID === sample.PIID);

          // For each detail, find its history
          const detailsWithHistory = details.map((detail) => ({
            ...detail,
            history: response.data.ProformaDtlHistory.filter(
              (history) => history.PIDtlID === detail.PIDtlID
            ),
          }));

          const hasApproved =
            sample?.Level1_Approve === 'A' &&
            sample?.Level2_Approve === 'A' &&
            sample?.Level3_Approve === 'A';

          let image1;
          let image2;
          let image3;
          if (sample.Level1_Approved_ID !== null) {
            image1 =
              sample?.Approver1_Image !== ''
                ? `${APP_API_STORAGE}${sample?.Approver1_Image}`
                : '/assets/images/dummy.jpg';
          }
          if (sample.Level2_Approved_ID !== null) {
            image2 =
              sample?.Approver2_Image !== ''
                ? `${APP_API_STORAGE}${sample?.Approver2_Image}`
                : '/assets/images/dummy.jpg';
          }
          if (sample.Level3_Approved_ID !== null) {
            image3 =
              sample?.Approver3_Image !== ''
                ? `${APP_API_STORAGE}${sample?.Approver3_Image}`
                : '/assets/images/dummy.jpg';
          }

          return {
            ...sample,
            PINo: sample?.ApplyForReapproval ? `${sample?.PINo}-S-R` : `${sample?.PINo}-S`,
            hasApproved,
            Approver1_Image: image1,
            Approver2_Image: image2,
            Approver3_Image: image3,
            Level1_Approve:
              sample?.Level1_Approve === 'A'
                ? 'Approved'
                : sample?.Level1_Approve === 'R'
                  ? 'Rejected'
                  : 'Pending',
            Level2_Approve:
              sample?.Level2_Approve === 'A'
                ? 'Approved'
                : sample?.Level2_Approve === 'R'
                  ? 'Rejected'
                  : 'Pending',
            Level3_Approve:
              sample?.Level3_Approve === 'A'
                ? 'Approved'
                : sample?.Level3_Approve === 'R'
                  ? 'Rejected'
                  : 'Pending',

            ProformaDtl: detailsWithHistory,
          };
        });
        setSampleData(formattedData);
      } else {
        setSampleData([]);
        enqueueSnackbar(response.data.Message || 'No sample data found', { variant: 'info' });
      }
    } catch (error) {
      console.error(error);
      setSampleData([]);
    } finally {
      setLoading(false);
    }
  }, [userData, enqueueSnackbar]);

  useEffect(() => {
    const fetch = async () => {
      await fetchPiMasterData();

      await fetchSampleMasterData();
      setLoading(false);
    };
    fetch();
  }, [fetchPiMasterData, fetchSampleMasterData]);

  const filteredData = useMemo(() => {
    const dataToFilter = activeTab === 0 ? piMasterData : sampleMasterData;

    return dataToFilter.filter(
      (item) =>
        item.PINo?.trim().toLowerCase().includes(searchParams?.PINo?.trim().toLowerCase()) &&
        item?.WIC_Name?.toLowerCase().includes(searchParams?.customer?.toLowerCase())
      // ... other filter conditions
    );
  }, [piMasterData, sampleMasterData, searchParams, activeTab]);

  // Action button renderers
  const editButtonRenderer = (params) =>
    activeTab === 0 ? (
      <Tooltip title="Convert to LC" arrow>
        <IconButton
          onClick={() => moveToEditForm(params.data.PIID)}
          // disabled={params.data.hasApproved}
          size="small"
          sx={{ padding: '4px' }}
        >
          <Iconify icon="streamline-plump:convert-pdf-1" width={18} />
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title="Convert to LC" arrow>
        <IconButton
          onClick={() => moveToEditForm(params.data.PIID)}
          disabled
          size="small"
          sx={{ padding: '4px' }}
        >
          <Iconify icon="streamline-plump:convert-pdf-1" width={18} />
        </IconButton>
      </Tooltip>
    );
  // const revisionButtonRenderer = (params) => (
  //   <Tooltip title="Revision" arrow>
  //     <IconButton
  //       onClick={() => moveToRevisionForm(params.data.PIID)}
  //       disabled={params.data.hasApproved}
  //       size="small"
  //       sx={{ padding: '4px' }}
  //     >
  //       <Iconify icon="ic:twotone-new-label" width={18} />
  //     </IconButton>
  //   </Tooltip>
  // );
  // const approverButtonRenderer = (params) => (
  //   <Tooltip title={params.data.ToBeApproved ? 'Vew and Approve' : 'Vew'} arrow>
  //     <IconButton
  //       onClick={() => moveToApproverForm(params.data.PIID)}
  //       size="small"
  //       sx={{ padding: '4px' }}
  //     >
  //       <Iconify icon="solar:eye-bold" width={18} />
  //     </IconButton>
  //   </Tooltip>
  // );
  // eslint-disable-next-line
  const pdfButtonRenderer = (params) => {
    return (
      <Tooltip title="View PDF" arrow>
        <IconButton
          onClick={() => moveToPDFView(params.data.PIID)}
          size="small"
          // disabled={
          //   params.data.Level1_Approve === 'Pending' ||
          //   params.data.Level2_Approve === 'Pending' ||
          //   params.data.Level3_Approve === 'Pending'
          // }
          sx={{ padding: '4px' }}
        >
          <Iconify icon="mdi:file-pdf-box" width="20" height="20" />
        </IconButton>
      </Tooltip>
    );
  };

  const deleteButtonRenderer = (params) => (
    <Tooltip title="Delete" arrow>
      <IconButton
        onClick={() => {
          setSelectedPIID(params.data.PIID);
          confirm.onTrue();
        }}
        size="small"
        disabled={
          params.data.Level1_Approve === 'Approved' ||
          params.data.Level2_Approve === 'Approved' ||
          params.data.Level3_Approve === 'Approved'
        }
        sx={{ padding: '4px' }}
      >
        <Iconify icon="solar:trash-bin-trash-bold" width="20" height="20" />
      </IconButton>
    </Tooltip>
  );

  const actionButtonsRenderer = (params) => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
      {/* {approverButtonRenderer(params)}
      {revisionButtonRenderer(params)} */}
      {editButtonRenderer(params)}

      {activeTab === 0 ? pdfButtonRenderer(params) : null}
      {/* {deleteButtonRenderer(params)} */}
    </div>
  );

  // PI Master grid column definitions
  const piColumnDefs = [
    {
      field: 'expand',
      maxWidth: 50,
      headerName: '',
      minWidth: 35,
      filter: false,
      autosize: true,
      sortable: false,
      resizable: false,
      lockPosition: 'left',
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
        suppressCount: true,
        innerRenderer: (params) => (params.value ? params.value : ''),
      },
      cellStyle: { marginTop: '2px' },
    },
    {
      field: 'PINo',
      headerName: 'Sample No',
      minWidth: 200,
      filter: 'agTextColumnFilter',
      cellStyle: { marginTop: '2px' },
    },
    {
      field: 'WIC_Name',
      headerName: 'Customer',
      minWidth: 250,
      filter: 'agTextColumnFilter',
      cellStyle: { marginTop: '2px' },
    },

    {
      field: 'Approver1_Name',
      headerName: 'Prepared By',
      minWidth: 150,
      filter: 'agTextColumnFilter',
      cellRenderer: ImageNameRender(1),
    },

    {
      field: 'ValidFrom',
      headerName: 'Valid From',
      minWidth: 120,
      valueFormatter: (params) => (params.value ? fDate(new Date(params.value)) : ''),
      cellStyle: { marginTop: '2px' },
    },
    {
      field: 'ValidUntil',
      headerName: 'Valid Until',
      minWidth: 120,
      valueFormatter: (params) => (params.value ? fDate(new Date(params.value)) : ''),
      cellStyle: { marginTop: '2px' },
    },

    {
      field: 'actions',
      headerName: '',
      maxWidth: 80,
      minWidth: 80,
      pinned: 'right',
      sortable: false,
      filter: false,
      resizable: false,
      cellRenderer: actionButtonsRenderer,
      lockPosition: 'right',
      cellStyle: { textAlign: 'right' },
    },
  ];

  // Sample Master grid column definitions
  const sampleColumnDefs = [
    {
      field: 'expand',
      maxWidth: 50,
      headerName: '',
      minWidth: 35,
      filter: false,
      autosize: true,
      sortable: false,
      resizable: false,
      lockPosition: 'left',
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
        suppressCount: true,
        innerRenderer: (params) => (params.value ? params.value : ''),
      },
      cellStyle: { marginTop: '2px' },
    },

    {
      field: 'PINo',
      headerName: 'PI No',
      minWidth: 170,
      filter: 'agTextColumnFilter',
      cellStyle: { marginTop: '2px' },
    },
    {
      field: 'WIC_Name',
      headerName: 'Customer',
      minWidth: 200,
      filter: 'agTextColumnFilter',
      cellStyle: { marginTop: '2px' },
    },
    {
      field: 'LCNo',
      headerName: 'LC No',
      minWidth: 150,
      filter: 'agTextColumnFilter',
      cellStyle: { marginTop: '2px' },
    },
    {
      field: 'ExportInvoiceDate',
      headerName: 'Invoice Date',
      minWidth: 120,
      valueFormatter: (params) => (params.value ? fDate(new Date(params.value)) : ''),
      cellStyle: { marginTop: '2px' },
    },
    {
      field: 'ExportInvoiceNo',
      headerName: 'Export Invoice No',
      minWidth: 180,
      filter: 'agTextColumnFilter',
      cellStyle: { marginTop: '2px' },
    },
    {
      field: 'LCDate',
      headerName: 'LC Date',
      minWidth: 120,
      valueFormatter: (params) => (params.value ? fDate(new Date(params.value)) : ''),
      cellStyle: { marginTop: '2px' },
    },
    {
      field: 'InvoiceQty',
      headerName: 'Qty',
      minWidth: 100,
      headerClass: 'ag-right-aligned-header',
      cellStyle: { textAlign: 'right', marginTop: '2px' },
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      valueFormatter: (params) => (params.value ? params.value.toLocaleString() : ''),
    },
    {
      field: 'GoodsValue',
      headerName: 'Goods Value',
      minWidth: 140,
      headerClass: 'ag-right-aligned-header',
      cellStyle: { textAlign: 'right', marginTop: '2px' },
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      // valueFormatter: (params) => (params.value ? `$${params.value.toFixed(2)}` : ''),
    },
    {
      field: 'Commission',
      headerName: 'Commission ',
      minWidth: 140,
      headerClass: 'ag-right-aligned-header',
      cellStyle: { textAlign: 'right', marginTop: '2px' },
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      // valueFormatter: (params) => (params.value ? `${params.value.toFixed(2)}` : '0.00'),
    },
    {
      field: 'AdjustmentAmount',
      headerName: 'Adjustment',
      minWidth: 140,
      headerClass: 'ag-right-aligned-header',
      cellStyle: { textAlign: 'right', marginTop: '2px' },
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      // valueFormatter: (params) => (params.value ? `$${params.value.toFixed(2)}` : ''),
    },
    {
      field: 'ExportInvoiceValue',
      headerName: 'Invoice Value',
      minWidth: 140,
      headerClass: 'ag-right-aligned-header',
      cellStyle: { textAlign: 'right', marginTop: '2px' },
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      // valueFormatter: (params) => (params.value ? `$${params.value.toFixed(2)}` : ''),
    },
    {
      field: 'ExchangeRate',
      headerName: 'Exchange Rate',
      minWidth: 120,
      headerClass: 'ag-right-aligned-header',
      cellStyle: { textAlign: 'right', marginTop: '2px' },
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      // valueFormatter: (params) => (params.value ? params.value.toFixed(4) : ''),
    },
    {
      field: 'InvoiceValueInTK',
      headerName: 'Value in Tk',
      minWidth: 140,
      headerClass: 'ag-right-aligned-header',
      cellStyle: { textAlign: 'right', marginTop: '2px' },
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      valueFormatter: (params) => (params.value ? `৳ ${params.value.toLocaleString()}` : ''),
    },
    {
      field: 'LCAmount',
      headerName: 'LC Amount',
      minWidth: 140,
      headerClass: 'ag-right-aligned-header',
      cellStyle: { textAlign: 'right', marginTop: '2px' },
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      // valueFormatter: (params) => (params.value ? `$${params.value.toFixed(2)}` : ''),
    },
    {
      field: 'actions',
      headerName: '',
      maxWidth: 80,
      minWidth: 80,
      pinned: 'right',
      sortable: false,
      filter: false,
      resizable: false,
      cellRenderer: actionButtonsRenderer,
      lockPosition: 'right',
      cellStyle: { textAlign: 'right' },
    },
  ];

  // PI Detail grid column definitions
  const piDetailGridOptions = {
    components: {
      statusRenderer: StatusRenderer,
    },
    columnDefs: [
      {
        field: 'expand',
        headerName: '',
        filter: false,
        autosize: true,
        sortable: false,
        resizable: false,
        lockPosition: 'left',
        maxWidth: 50,
        cellRenderer: 'agGroupCellRenderer',
        cellRendererParams: {
          suppressCount: true,
          innerRenderer: (params) => (params.value ? params.value : ''),
        },
      },
      {
        field: 'Item_Code',
        headerName: 'Item Code',
        minWidth: 200,
        filter: 'agTextColumnFilter',
      },
      {
        field: 'ProductDescription',
        headerName: 'Product Description', // Changed from 'Description'
        minWidth: 400,
        filter: 'agTextColumnFilter',
      },
      {
        field: 'Quantity',
        headerName: 'Quantity',
        minWidth: 100,
        headerClass: 'ag-right-aligned-header',
        cellStyle: { textAlign: 'right' },
        filter: 'agNumberColumnFilter',
        type: 'numericColumn',
        valueFormatter: (params) => `${fNumber(params.value)} ${params.data.UOMName} `,
      },
      // {
      //   field: 'UOMName', // Changed from 'UOMNAME'
      //   headerName: 'Unit',
      //   minWidth: 80,
      // },
      {
        field: 'UnitPrice',
        headerName: 'Unit Price',
        minWidth: 120,
        filter: 'agNumberColumnFilter',
        type: 'numericColumn',
        valueFormatter: (params) => (params.value ? `${params.value.toFixed(2)}` : ''),
      },
      {
        field: 'Total_Amount',
        headerName: 'Total Amount',
        minWidth: 140,
        filter: 'agNumberColumnFilter',
        type: 'numericColumn',
        valueFormatter: (params) => (params.value ? `${params.value.toFixed(2)}` : ''),
      },
      // Remove Revision_No field since it's not in your API response
    ],
    defaultColDef: {
      flex: 1,
      sortable: true,
      filter: true,
      resizable: true,
    },
    // Remove masterDetail and detailCellRendererParams from here since you're using single level
  };

  const sampleDetailGridOptions = {
    components: {
      statusRenderer: StatusRenderer,
    },
    columnDefs: [
      {
        field: 'expand',
        headerName: '',
        filter: false,
        autosize: true,
        sortable: false,
        resizable: false,
        lockPosition: 'left',
        maxWidth: 50,
        cellRenderer: 'agGroupCellRenderer',
        cellRendererParams: {
          suppressCount: true,
          innerRenderer: (params) => (params.value ? params.value : ''),
        },
      },
      {
        field: 'Item_Code',
        headerName: 'Item Code',
        minWidth: 200,
        filter: 'agTextColumnFilter',
      },
      {
        field: 'ProductDescription',
        headerName: 'Product Description',
        minWidth: 400,
        filter: 'agTextColumnFilter',
      },
      {
        field: 'Quantity',
        headerName: 'Quantity',
        minWidth: 100,
        headerClass: 'ag-right-aligned-header',
        cellStyle: { textAlign: 'right' },
        filter: 'agNumberColumnFilter',
        type: 'numericColumn',
      },
      {
        field: 'UOMName',
        headerName: 'Unit',
        minWidth: 80,
      },
      {
        field: 'UnitPrice',
        headerName: 'Unit Price',
        minWidth: 120,
        filter: 'agNumberColumnFilter',
        type: 'numericColumn',
        valueFormatter: (params) => (params.value ? `${params.value.toFixed(2)}` : ''),
      },
      {
        field: 'Total_Amount',
        headerName: 'Total Amount',
        minWidth: 140,
        filter: 'agNumberColumnFilter',
        type: 'numericColumn',
        valueFormatter: (params) => (params.value ? `${params.value.toFixed(2)}` : ''),
      },
    ],
    defaultColDef: {
      flex: 1,
      sortable: true,
      filter: true,
      resizable: true,
    },
  };

  // Get current column definitions based on active tab

  const currentColumnDefs = useMemo(
    // eslint-disable-next-line
    () => {
      return activeTab === 0 ? piColumnDefs : sampleColumnDefs;
    },
    // eslint-disable-next-line
    [activeTab]
  );

  // Get current detail grid options based on active tab

  const currentDetailGridOptions = useMemo(
    // eslint-disable-next-line
    () => {
      return activeTab === 0 ? piDetailGridOptions : sampleDetailGridOptions;
    },
    // eslint-disable-next-line
    [activeTab]
  );

  // Configure master-detail relationship
  const detailCellRendererParams = useMemo(
    () => ({
      detailGridOptions: currentDetailGridOptions,
      getDetailRowData: (params) => {
        params.node.setDataValue('loading', true);
        const piId = params.data.PIID;

        // If details not loaded yet, fetch them
        if (piDetailData[piId] === null) {
          fetchPiDetailData(piId);
          params.node.setDataValue('loading', false);
          params.successCallback([]); // Show empty initially
        } else {
          params.node.setDataValue('loading', false);
          params.successCallback(piDetailData[piId] || []);
        }
      },
    }),
    [currentDetailGridOptions, piDetailData, fetchPiDetailData]
  );

  const SampledetailCellRendererParams = useMemo(
    () => ({
      detailGridOptions: currentDetailGridOptions,
      getDetailRowData: (params) => {
        const exportInvoiceId = params.data.ExportInvoiceID;
        params.node.setDataValue('loading', true);
        // If details not loaded yet, fetch them
        if (sampleDetailData[exportInvoiceId] === null) {
          fetchSampleDetailData(exportInvoiceId);
          params.node.setDataValue('loading', false);
          params.successCallback([]); // Show empty initially
        } else {
          params.node.setDataValue('loading', false);
          params.successCallback(sampleDetailData[exportInvoiceId] || []);
        }
      },
    }),
    [currentDetailGridOptions, sampleDetailData, fetchSampleDetailData]
  );

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );
  const getDetailRowStyle = (params) => {
    params.node.setDataValue('loading', true);
    const id = activeTab === 0 ? params.data.PIID : params.data.ExportInvoiceID;
    const detailData = activeTab === 0 ? piDetailData : sampleDetailData;
    params.node.setDataValue('loading', false);
    if (detailData[id] === null) {
      return { opacity: 0.6, fontStyle: 'italic', color: '#999' };
    }
    return null;
  };
  const onFirstDataRendered = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  const handleSearchChange = (field) => (event) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div style={containerStyle}>
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>Proforma Invoice</span>
                <Box
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderRadius: '50%',
                    width: 20,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.55rem',
                    fontWeight: 'bold',
                  }}
                >
                  {piMasterData.length}
                </Box>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>Export Invoice</span>
                <Box
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderRadius: '50%',
                    width: 20,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.55rem',
                    fontWeight: 'bold',
                  }}
                >
                  {sampleMasterData.length}
                </Box>
              </Box>
            }
          />
        </Tabs>
      </Box>

      <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mb: 2 }}>
        <Stack direction="row" spacing={2}>
          <TextField
            label={activeTab === 0 ? 'Search PI No' : 'Search Sample No'}
            variant="outlined"
            size="small"
            value={searchParams.PINo}
            onChange={handleSearchChange('PINo')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" width={20} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Search Customer"
            variant="outlined"
            size="small"
            value={searchParams.customer}
            onChange={handleSearchChange('customer')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" width={20} />
                </InputAdornment>
              ),
            }}
          />
          {/* <TextField
            label="Search Quotation No"
            variant="outlined"
            size="small"
            value={searchParams.QuotationNo}
            onChange={handleSearchChange('QuotationNo')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" width={20} />
                </InputAdornment>
              ),
            }}
          /> */}
        </Stack>
        <Stack direction="row" spacing={2}>
          <Tooltip title="Zoom in" arrow placement="top">
            <IconButton
              color="primary"
              sx={{ border: '1px solid #eee' }}
              onClick={() => setZoomLevel((prev) => prev + 0.1)}
            >
              <Iconify icon="si:zoom-in-duotone" width={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Zoom out" arrow placement="top">
            <IconButton
              color="primary"
              sx={{ border: '1px solid #eee' }}
              onClick={() => setZoomLevel((prev) => Math.max(prev - 0.1, 0.1))}
            >
              <Iconify icon="si:zoom-out-duotone" width={20} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      <div
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'top left',
          width: `${100 / zoomLevel}%`,
          height: `${150 / zoomLevel}%`,
          overflow: 'hidden',
        }}
      >
        <Scrollbar>
          <AgGridReact
            className="ag-theme-material"
            theme={settings.themeMode === 'dark' ? themeDark : themeBalham}
            rowData={filteredData}
            columnDefs={currentColumnDefs}
            defaultColDef={defaultColDef}
            rowHeight={35}
            headerHeight={40}
            masterDetail
            detailCellRendererParams={
              activeTab === 0 ? detailCellRendererParams : SampledetailCellRendererParams
            }
            animateRows
            pagination
            getRowStyle={getRowStyle}
            paginationPageSize={50}
            domLayout="autoHeight"
            getDetailRowStyle={getDetailRowStyle}
            suppressRowClickSelection
            onFirstDataRendered={onFirstDataRendered}
          />
        </Scrollbar>

        <ConfirmDialog
          open={confirm.value}
          onClose={() => {
            confirm.onFalse();
            setSelectedPIID(null); // Clear selected PIID on close
          }}
          title="Delete"
          content="Are you sure want to delete?"
          action={
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteProformaInvoice();
                confirm.onFalse();
              }}
            >
              Delete
            </Button>
          }
        />
      </div>
    </div>
  );
};

PiGrid.propTypes = {
  superSearch: PropTypes.bool,
};

export default PiGrid;
