import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Box, Card, TextField, InputAdornment, Tooltip, IconButton, Stack, Avatar } from '@mui/material';
import { LoadingScreen } from 'src/components/loading-screen';
import Iconify from 'src/components/iconify';
import { Get } from 'src/api/apibasemethods';





const ProductionOrderListView = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState({});
  const [zoomLevel, setZoomLevel] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Master column definitions
  const productionOrderMasterColDefs = useMemo(() => [
    {
      field: 'expand',
      headerName: '',
      maxWidth: 50,
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
        suppressCount: true,
      },
      sortable: false,
      filter: false,
      resizable: false,
      lockPosition: 'left',
    },
    {
      field: 'ProductionOrderNo',
      headerName: 'Production Order No',
      minWidth: 150,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'ProductionOrderDate',
      headerName: 'Production Order Date',
      minWidth: 150,
      valueFormatter: (params) => (params.value ? new Date(params.value).toLocaleDateString() : ''),
      filter: 'agDateColumnFilter',
    },
   
  ], []);

  // Detail column definitions
  const productionOrderDetailColDefs = useMemo(() => [
    {
      field: 'PINo',
      headerName: 'PI No',
      minWidth: 120,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'WIC_Name',
      headerName: 'Customer Name',
      minWidth: 150,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'Item_Code',
      headerName: 'Item Code',
      minWidth: 120,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'Description',
      headerName: 'Description',
      minWidth: 200,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'Unit',
      headerName: 'Unit',
      minWidth: 100,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'RequiredQty',
      headerName: 'Required Qty',
      minWidth: 130,
      type: 'numericColumn',
      cellStyle: { textAlign: 'right' },
      valueFormatter: (params) => (params.value?.toFixed(2) || '0.00'),
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'RecipeName',
      headerName: 'Recipe Name',
      minWidth: 180,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'RequiredDate',
      headerName: 'Required Date',
      minWidth: 150,
      valueFormatter: (params) => (params.value ? new Date(params.value).toLocaleDateString() : ''),
      filter: 'agDateColumnFilter',
    },
  {
  field: 'RecipePictureURL',
  headerName: 'Recipe Picture',
  minWidth: 150,
  cellRenderer: (params) => {
    if (!params.value) {
      return 'No Image';
    }
    
    return (
      
        <Avatar 
          src={params.value}
          alt="Recipe" 
           variant="square"
                sx={{
                  width: 56,
                  height: 56,
                  '& img': {
                    objectFit: 'contain',
                  }
                }}
        
        />
     
    );
  },
  autoHeight: true,
  filter: false,
  sortable: false,
  resizable: false,
},
  ], []);

  // Fetch master data
  const fetchMasterData = useCallback(async () => {
    try {
      setIsLoading(true);
      // const response = await mockMasterAPI();
      const response = await Get(`https://apicyclo.scmcloud.online/api/Production/GetProductionOrderMasterList?Org_ID=1&Branch_ID=6`)
      if (response.status === 200) {


        setRowData(response.data.Data);
        setFilteredData(response.data.Data);
      }
    } catch (error) {
      console.error('Failed to fetch master data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch detail data for a specific production order
  const fetchDetailData = useCallback(async (productionOrderId) => {
    try {
      setDetailLoading(prev => ({ ...prev, [productionOrderId]: true }));
      // const response = await mockDetailAPI(productionOrderId);
      const response = await Get(`https://apicyclo.scmcloud.online/api/Production/GetProductionOrderDetails?ProductionOrderID=${productionOrderId}`);

      if (response.status === 200) {
        setRowData(prevData => {
          const updated = [...prevData];
          const index = updated.findIndex(item => item.ProductionOrderID === productionOrderId);
          if (index !== -1) {
            updated[index] = {
              ...updated[index],
              Items: response.data.Data
            };
          }
          return updated;
        });

        setFilteredData(prevData => {
          const updated = [...prevData];
          const index = updated.findIndex(item => item.ProductionOrderID === productionOrderId);
          if (index !== -1) {
            updated[index] = {
              ...updated[index],
              Items: response.data.Data
            };
          }
          return updated;
        });
      }
    } catch (error) {
      console.error('Failed to fetch detail data:', error);
    } finally {
      setDetailLoading(prev => ({ ...prev, [productionOrderId]: false }));
    }
  }, []);

  // Load master data on component mount
  useEffect(() => {
    fetchMasterData();
  }, [fetchMasterData]);

  // Filter data based on search term
  useEffect(() => {
    if (!rowData.length) return;

    const term = searchTerm.toLowerCase();
    const filtered = rowData.filter((item) =>
      item.ProductionOrderNo.toLowerCase().includes(term)
    );

    setFilteredData(filtered);
  }, [searchTerm, rowData]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    suppressMovable: false,
    // floatingFilter: true,
  }), []);

  const detailGridOptions = useMemo(() => ({
    columnDefs: productionOrderDetailColDefs,
    defaultColDef: {
      sortable: true,
      resizable: true,
      filter: true,
    },
    headerHeight: 40,
    rowHeight: 35,
    animateRows: true,
    enableCellTextSelection: true,
    suppressRowClickSelection: true,
  }), [productionOrderDetailColDefs]);

  const detailCellRendererParams = {
  detailGridOptions: {
    columnDefs: productionOrderDetailColDefs,
    defaultColDef: { flex: 1 },
    rowHeight: 35,
  },
  getDetailRowData: async (params) => {
    const productionOrderId = params.data.ProductionOrderID;

    try {
      const response = await Get(
        `https://apicyclo.scmcloud.online/api/Production/GetProductionOrderDetails?ProductionOrderID=${productionOrderId}`
      );

      if (response.status === 200) {
        params.successCallback(response.data.Data); // ✅ pass data directly
      } else {
        params.successCallback([]); // empty fallback
      }
    } catch (error) {
      console.error("Failed to fetch detail data:", error);
      params.successCallback([]); // fallback to empty
    }
  },
};

// eslint-disable-next-line
  const isRowMaster = useCallback((dataItem) => {
    return true; // All rows can be expanded to show details
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  return (
    <Card sx={{ p: 2 }}>
      {isLoading ? (
        <LoadingScreen
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70vh',
          }}
        />
      ) : (
        <>
          <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mb: 2 }}>
            <TextField
              label="Search Production Order No"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" width={20} />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 300 }}
            />
            <Stack direction="row" spacing={1}>
              <Tooltip title="Zoom in" arrow placement="top">
                <IconButton
                  color="primary"
                  sx={{ border: '1px solid #eee' }}
                  onClick={() => setZoomLevel((prev) => Math.min(prev + 0.1, 1.5))}
                >
                  <Iconify icon="ant-design:zoom-in-outlined" width={20} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Zoom out" arrow placement="top">
                <IconButton
                  color="primary"
                  sx={{ border: '1px solid #eee' }}
                  onClick={() => setZoomLevel((prev) => Math.max(prev - 0.1, 0.7))}
                >
                  <Iconify icon="ant-design:zoom-out-outlined" width={20} />
                </IconButton>
              </Tooltip>
              {/* <Tooltip title="Reset zoom" arrow placement="top">
                <IconButton
                  color="primary"
                  sx={{ border: '1px solid #eee' }}
                  onClick={() => setZoomLevel(1)}
                >
                  <Iconify icon="mdi:zoom-reset" width={20} />
                </IconButton>
              </Tooltip> */}
            </Stack>
          </Stack>

          <Box
            sx={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'top left',
              width: `${100 / zoomLevel}%`,
              height: `${100 / zoomLevel}%`,
              overflow: 'hidden',
            }}
          >
            <div
              className="ag-theme-alpine"
              style={{
                width: '100%',
                height: '70vh',
              }}
            >
              <AgGridReact
                ref={gridRef}
                rowData={filteredData}
                columnDefs={productionOrderMasterColDefs}
                defaultColDef={defaultColDef}
                rowHeight={40}
                headerHeight={45}
                animateRows
                pagination
                paginationPageSize={10}
                onFirstDataRendered={onFirstDataRendered}
                suppressRowClickSelection
                masterDetail
                detailCellRendererParams={detailCellRendererParams}
                detailRowHeight={300}
                isRowMaster={isRowMaster}
                // suppressAggFuncInHeader
                // immutableData
                // getRowNodeId={(data) => data.ProductionOrderID}
              />
            </div>
          </Box>
        </>
      )}
    </Card>
  );
};

export default ProductionOrderListView;