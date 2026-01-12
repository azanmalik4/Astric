import * as Yup from 'yup';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Divider from '@mui/material/Divider';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import { Get, Post } from 'src/api/apibasemethods';
import { useNavigate } from 'react-router';
import { paths } from 'src/routes/paths';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Checkbox,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { DatePicker } from '@mui/x-date-pickers';

export default function ImportLCBillPayment() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('UserData'));

  // States
  const [openBanks, setOpenBanks] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [pendingInvoicesOpen, setPendingInvoicesOpen] = useState(false);
  const [pendingInvoices, setPendingInvoices] = useState([]);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [finalSelectedInvoices, setFinalSelectedInvoices] = useState([]);
  const [loadingInvoices, setLoadingInvoices] = useState(false);

  const PaymentSchema = Yup.object().shape({
    importPaymentId: Yup.string().required('Import Payment ID is required'),
    openBank: Yup.object().required('Open Bank is required'),
    paymentDate: Yup.date().required('Payment Date is required'),
    totalInvoiceValue: Yup.number()
      .min(0, 'Must be positive')
      .required('Total Invoice Value is required'),
    currency: Yup.object().required('Currency is required'),
  });

  const methods = useForm({
    resolver: yupResolver(PaymentSchema),
    defaultValues: {
      totalInvoiceValue: 20000.0,
    },
  });

  const {
    setValue,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  // Calculate totals
  const totalSum = useMemo(() => {
    return finalSelectedInvoices
      .reduce((sum, invoice) => sum + parseFloat(invoice.InvoiceValue || 0), 0)
      .toFixed(4);
  }, [finalSelectedInvoices]);

  const paidAmountSum = useMemo(() => {
    return finalSelectedInvoices
      .reduce((sum, invoice) => sum + parseFloat(invoice.PaidAmount || 0), 0)
      .toFixed(4);
  }, [finalSelectedInvoices]);

  // API fetch functions
  const fetchOpenBanks = useCallback(async () => {
    try {
      const response = await Get(
        `CommercialModule/GetBankList?Org_ID=${userData?.userDetails?.orgId}&Branch_ID=${userData?.userDetails?.branchID}`
      );
      setOpenBanks(response.data?.Data || response.data || []);
      console.log('Open Banks Response:', response.data);
    } catch (error) {
      console.error('Error fetching Open Banks:', error);
    }
  }, [userData?.userDetails?.orgId, userData?.userDetails?.branchID]);

  const fetchCurrencies = useCallback(async () => {
    try {
      const response = await Get(
        `CommercialModule/GetCurrencies?Org_ID=${userData?.userDetails?.orgId}&Branch_ID=${userData?.userDetails?.branchID}`
      );
      setCurrencies(response.data?.Data || response.data || []);
      console.log('Currencies Response:', response.data);
    } catch (error) {
      console.error('Error fetching Currencies:', error);
    }
  }, [userData?.userDetails?.orgId, userData?.userDetails?.branchID]);

  const fetchPendingInvoices = async () => {
    setLoadingInvoices(true);
    try {
      const response = await Get(
        `CommercialModule/GetPendingInvoices?Org_ID=${userData?.userDetails?.orgId}&Branch_ID=${userData?.userDetails?.branchID}`
      );
      setPendingInvoices(response.data || []);
      setSelectedInvoices([]);
      setPendingInvoicesOpen(true);
    } catch (error) {
      console.error('Error fetching Pending Invoices:', error);
      enqueueSnackbar('Error fetching pending invoices', { variant: 'error' });
    } finally {
      setLoadingInvoices(false);
    }
  };

  const handleCheckboxChange = (invoice, checked) => {
    setSelectedInvoices((prevSelected) => {
      if (checked) {
        const exists = prevSelected.some((item) => item.InvoiceID === invoice.InvoiceID);
        if (exists) {
          return prevSelected;
        }
        return [...prevSelected, invoice];
      } else {
        return prevSelected.filter((item) => item.InvoiceID !== invoice.InvoiceID);
      }
    });
  };

  const handleAddInvoices = () => {
    if (selectedInvoices.length === 0) {
      enqueueSnackbar('Please select at least one invoice', { variant: 'warning' });
      return;
    }

    const newInvoices = selectedInvoices.filter(
      (item) => !finalSelectedInvoices.find((existing) => existing.InvoiceID === item.InvoiceID)
    );

    setFinalSelectedInvoices([...finalSelectedInvoices, ...newInvoices]);
    enqueueSnackbar(`${newInvoices.length} invoice(s) added successfully`, { variant: 'success' });
    setPendingInvoicesOpen(false);
    setSelectedInvoices([]);
  };

  const handleRemoveInvoice = (index) => {
    setFinalSelectedInvoices(finalSelectedInvoices.filter((_, i) => i !== index));
    enqueueSnackbar('Invoice removed', { variant: 'info' });
  };

  // Initial data load
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchOpenBanks(), fetchCurrencies()]);
      } catch (error) {
        enqueueSnackbar('Error loading dropdown data', { variant: 'error' });
      }
    };
    fetchData();
  }, [fetchOpenBanks, fetchCurrencies, enqueueSnackbar]);

  const formatDateToUTC = (date) => {
    if (!date) return null;
    const dateObj = new Date(date);
    return dateObj.toISOString();
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await PaymentSchema.validate(data, { abortEarly: false });

      const requestBody = {
        ImportPaymentID: data.importPaymentId,
        PaymentDate: formatDateToUTC(data.paymentDate),
        OpenBankID: data.openBank?.BankID,
        TotalInvoiceValue: data.totalInvoiceValue,
        CurrencyID: data.currency?.CurrencyID,
        CreatedBy: userData?.userDetails?.userId || 101,
        Branch_ID: userData?.userDetails?.branchID || 1,
        Org_ID: userData?.userDetails?.orgId || 10,
        Invoices: finalSelectedInvoices.map((invoice) => ({
          InvoiceID: invoice.InvoiceID,
          InvoiceNo: invoice.InvoiceNo,
          InvoiceDate: invoice.InvoiceDate,
          BankRefNo: invoice.BankRefNo,
          BankRefDate: invoice.BankRefDate,
          InvoiceValue: invoice.InvoiceValue,
          AcceptanceValue: invoice.AcceptanceValue,
          AdvancedPaid: invoice.AdvancedPaid,
          AlreadyPaid: invoice.AlreadyPaid,
          Payable: invoice.Payable,
          PaidAmount: invoice.PaidAmount,
          ConversionRate: invoice.ConversionRate,
          CompanyID: invoice.CompanyID,
          SupplierID: invoice.SupplierID,
          SupplierCode: invoice.SupplierCode,
        })),
      };

      const response = await Post('CommercialModule/SaveImportLCBillPayment', requestBody);

      if (response.status === 200 || response.status === 201) {
        enqueueSnackbar('Payment saved successfully', { variant: 'success' });
        navigate(paths.dashboard.Converter.importLCBillPayment.root);
        reset();
        setFinalSelectedInvoices([]);
      } else {
        enqueueSnackbar('Error saving payment', { variant: 'error' });
      }
    } catch (error) {
      console.error('Submission error:', error);

      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((validationError) => {
          enqueueSnackbar(validationError.message, { variant: 'error', autoHideDuration: 5000 });
        });
      } else {
        enqueueSnackbar(error.message || 'Error submitting form', {
          variant: 'error',
          autoHideDuration: 5000,
        });
      }
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {/* Header Section */}
        <Grid xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, color: '#E3F2FD', fontWeight: 600 }}>
              BB / Import LC Bill Payment
            </Typography>

            <Box
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
              rowGap={3}
              columnGap={2}
            >
              <RHFTextField name="importPaymentId" label="Import payment Id" size="small" />
              <RHFAutocomplete
                name="openBank"
                label="Open Bank"
                size="small"
                options={openBanks}
                getOptionLabel={(option) => option.BankName || option.BankID}
              />
              <RHFTextField
                name="totalInvoiceValue"
                label="Total Invoice Value"
                type="number"
                size="small"
                InputProps={{ inputProps: { step: 0.01 } }}
              />

              <Controller
                name="paymentDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Payment Date"
                    format="dd-MM-yy"
                    value={field.value}
                    onChange={(newValue) => field.onChange(newValue)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: 'small',
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                  />
                )}
              />

              <RHFAutocomplete
                name="currency"
                label="Currency"
                size="small"
                options={currencies}
                getOptionLabel={(option) => option.Currency_Name || option.Currency_ID}
              />

              <Box display="flex" alignItems="center" gap={1}>
                <Checkbox
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => e.stopPropagation()}
                />
                <Typography variant="body2">Show Pending Invoices</Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ ml: 2 }}
                  disabled={loadingInvoices}
                  onClick={(e) => {
                    e.stopPropagation();
                    fetchPendingInvoices();
                  }}
                >
                  {loadingInvoices ? 'Loading...' : 'Invoices'}
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Selected Invoices Table */}
        {finalSelectedInvoices.length > 0 && (
          <Grid xs={12}>
            <Card sx={{ p: 0 }}>
              <Box
                sx={{
                  bgcolor: '#FFF3E0',
                  px: 2,
                  py: 1,
                  borderBottom: '2px solid #FFB74D',
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Selected Invoice
                </Typography>
              </Box>

              <TableContainer sx={{ maxHeight: 400 }}>
                <Scrollbar>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Select</TableCell>
                        <TableCell>Invoice No</TableCell>
                        <TableCell>Invoice Date</TableCell>
                        <TableCell>BankRefNo</TableCell>
                        <TableCell>BankRefDate</TableCell>
                        <TableCell>Invoice Value</TableCell>
                        <TableCell>Acceptance Value</TableCell>
                        <TableCell>AdvancedPaid</TableCell>
                        <TableCell>AlreadyPaid</TableCell>
                        <TableCell>Payable</TableCell>
                        <TableCell>Paid Amount</TableCell>
                        <TableCell>Conversion Rate</TableCell>
                        <TableCell>Company ID</TableCell>
                        <TableCell>Supplier</TableCell>
                        <TableCell>SupplierCode</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {finalSelectedInvoices.map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{ bgcolor: index === 0 ? '#E3F2FD' : 'white' }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              checked
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => e.stopPropagation()}
                            />
                          </TableCell>
                          <TableCell>{row.InvoiceNo}</TableCell>
                          <TableCell>{row.InvoiceDate}</TableCell>
                          <TableCell>{row.BankRefNo}</TableCell>
                          <TableCell>{row.BankRefDate}</TableCell>
                          <TableCell>{parseFloat(row.InvoiceValue || 0).toFixed(4)}</TableCell>
                          <TableCell>{parseFloat(row.AcceptanceValue || 0).toFixed(4)}</TableCell>
                          <TableCell>{parseFloat(row.AdvancedPaid || 0).toFixed(4)}</TableCell>
                          <TableCell>{parseFloat(row.AlreadyPaid || 0).toFixed(4)}</TableCell>
                          <TableCell>{parseFloat(row.Payable || 0).toFixed(4)}</TableCell>
                          <TableCell>{parseFloat(row.PaidAmount || 0).toFixed(4)}</TableCell>
                          <TableCell>{parseFloat(row.ConversionRate || 0).toFixed(4)}</TableCell>
                          <TableCell>{row.CompanyID}</TableCell>
                          <TableCell>{row.SupplierID}</TableCell>
                          <TableCell>{row.SupplierCode}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleRemoveInvoice(index)}
                            >
                              <Iconify icon="mdi:delete" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                      {/* Summary Row */}
                      <TableRow sx={{ bgcolor: '#FFFDE7' }}>
                        <TableCell colSpan={5} align="right">
                          <Typography variant="body2" fontWeight={600}>
                            Sum =
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {totalSum}
                          </Typography>
                        </TableCell>
                        <TableCell colSpan={4} />
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            Sum = {paidAmountSum}
                          </Typography>
                        </TableCell>
                        <TableCell colSpan={5} />
                      </TableRow>
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>
            </Card>
          </Grid>
        )}

        {/* Payment Details Section */}
        <Grid xs={12}>
          <Card sx={{ p: 0 }}>
            <Box
              sx={{
                bgcolor: '#FFF3E0',
                px: 2,
                py: 1,
                borderBottom: '2px solid #FFB74D',
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Payment Details
              </Typography>
            </Box>
            <Box sx={{ p: 2, minHeight: 100 }}>
              {/* Payment details content can be added here */}
            </Box>
          </Card>
        </Grid>

        {/* Action Buttons */}
        
        <Grid xs={12}>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <LoadingButton variant="outlined" size="large" type="submit" loading={isSubmitting}>
              Save
            </LoadingButton>
            <Button variant="outlined" size="large" onClick={() => reset()}>
              Refresh
            </Button>
            <Button variant="outlined" size="large">
              Report
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                reset();
                setFinalSelectedInvoices([]);
              }}
            >
              Clear
            </Button>
            <Button variant="outlined" size="large" color="error">
              Delete
            </Button>
          </Stack>
        </Grid>
      </Grid>

      {/* Pending Invoices Dialog */}
      <Dialog
        open={pendingInvoicesOpen}
        fullWidth
        maxWidth="xl"
        onClose={() => setPendingInvoicesOpen(false)}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Select Pending Invoices</Typography>
            <IconButton onClick={() => setPendingInvoicesOpen(false)}>
              <Iconify icon="mdi:close" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {pendingInvoices.length > 0 ? (
            <>
              <TableContainer component={Paper} sx={{ mt: 2, maxHeight: 500 }}>
                <Scrollbar>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            indeterminate={
                              selectedInvoices.length > 0 &&
                              selectedInvoices.length < pendingInvoices.length
                            }
                            checked={
                              pendingInvoices.length > 0 &&
                              selectedInvoices.length === pendingInvoices.length
                            }
                            onChange={(e) => {
                              e.stopPropagation();
                              if (e.target.checked) {
                                setSelectedInvoices([...pendingInvoices]);
                              } else {
                                setSelectedInvoices([]);
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>Invoice No</TableCell>
                        <TableCell>Invoice Date</TableCell>
                        <TableCell>BankRefNo</TableCell>
                        <TableCell>BankRefDate</TableCell>
                        <TableCell>Invoice Value</TableCell>
                        <TableCell>Acceptance Value</TableCell>
                        <TableCell>AdvancedPaid</TableCell>
                        <TableCell>AlreadyPaid</TableCell>
                        <TableCell>Payable</TableCell>
                        <TableCell>Paid Amount</TableCell>
                        <TableCell>Conversion Rate</TableCell>
                        <TableCell>Company ID</TableCell>
                        <TableCell>Supplier</TableCell>
                        <TableCell>SupplierCode</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pendingInvoices.map((row, index) => {
                        const isSelected = selectedInvoices.some(
                          (item) => item.InvoiceID === row.InvoiceID
                        );
                        return (
                          <TableRow key={index} hover onClick={(e) => e.stopPropagation()}>
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isSelected}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  handleCheckboxChange(row, e.target.checked);
                                }}
                              />
                            </TableCell>
                            <TableCell>{row.InvoiceNo}</TableCell>
                            <TableCell>{row.InvoiceDate}</TableCell>
                            <TableCell>{row.BankRefNo}</TableCell>
                            <TableCell>{row.BankRefDate}</TableCell>
                            <TableCell>{row.InvoiceValue}</TableCell>
                            <TableCell>{row.AcceptanceValue}</TableCell>
                            <TableCell>{row.AdvancedPaid}</TableCell>
                            <TableCell>{row.AlreadyPaid}</TableCell>
                            <TableCell>{row.Payable}</TableCell>
                            <TableCell>{row.PaidAmount}</TableCell>
                            <TableCell>{row.ConversionRate}</TableCell>
                            <TableCell>{row.CompanyID}</TableCell>
                            <TableCell>{row.SupplierID}</TableCell>
                            <TableCell>{row.SupplierCode}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>

              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2">
                  {selectedInvoices.length} invoice(s) selected
                </Typography>
                <Button
                  variant="contained"
                  size="medium"
                  disabled={selectedInvoices.length === 0}
                  onClick={handleAddInvoices}
                >
                  Add Invoices
                </Button>
              </Box>
            </>
          ) : (
            <Typography align="center" sx={{ mt: 3, mb: 3 }}>
              No pending invoices available
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
}
