import * as Yup from 'yup';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
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
  Avatar,
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
  FormControlLabel,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { DatePicker } from '@mui/x-date-pickers';

export default function ProductionAdd() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('UserData'));

  const [selectedLC, setSelectedLC] = useState(null);
  const [lcDetailsOpen, setLcDetailsOpen] = useState(false);
  const [lcDetailsData, setLcDetailsData] = useState([]);
  const [selectedLCItems, setSelectedLCItems] = useState([]); // For checkbox selection
  const [finalLCDetails, setFinalLCDetails] = useState([]); // For displaying at bottom
  const [loadingLCDetails, setLoadingLCDetails] = useState(false);

  const [colorFamilies, setColorFamilies] = useState([]);
  const [businessYear, setbusinessYear] = useState([]);
  const [lcNo, setlcNo] = useState([]);
  const [getVendor, setgetVendor] = useState([]);
  const [getTradeTerms, setgetTradeTerms] = useState([]);
  const [getEndCutomer, setgetEndCustomer] = useState([]);
  const [getInvoicePurposes, setgetInvoicePurposes] = useState([]);
  const [months, setMonths] = useState([]);
  const [Color, setColor] = useState([]);
  const [YarnCount, setYarnCount] = useState([]);
  const [YarnType, setYarnType] = useState([]);
  const [Composition, setComposition] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [purchasers, setPurchasers] = useState([]);
  const [purposes, setPurposes] = useState([]);
  const [tradeTerms, setTradeTerms] = useState([]);
  const [payTerms, setPayTerms] = useState([]);
  const [shipModes, setShipModes] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recipesByCustomer, setRecipesByCustomer] = useState({});
  const [recipesDetailsCache, setRecipesDetailsCache] = useState({});
  const [recipeDetailsByIndex, setRecipeDetailsByIndex] = useState({});
  const [piReceiveComplete, setPiReceiveComplete] = useState(false);
  const [Ind, setInd] = useState(false);
  const [Po, setPo] = useState(false);

  const ProductionOrderSchema = Yup.object().shape({
    PIId: Yup.string().required('PI Id is required'),
    PINo: Yup.string().required('PI No is required'),
    Date: Yup.date().required('Date is required'),
    supplier: Yup.object().required('Supplier is required'),
    purchaser: Yup.object().required('Purchaser is required'),
    styleNo: Yup.string(),
    purpose: Yup.object().required('Purpose is required'),
    piExpiryDate: Yup.date().required('PI Expiry Date is required'),
    supplierPO: Yup.string(),
    buyer: Yup.string(),
    currency: Yup.object().required('Currency is required'),
    itemsValue: Yup.number().min(0, 'Must be positive'),
    serviceCharge: Yup.number().min(0, 'Must be positive'),
    additionalCharge: Yup.number().min(0, 'Must be positive'),
    deductionAmount: Yup.number().min(0, 'Must be positive'),
    tradeTerm: Yup.object(),
    payTerm: Yup.object(),
    shipMode: Yup.object(),
    shipDate: Yup.date(),
    eta: Yup.date(),
    termsConditions: Yup.string(),
    BusinessYear: Yup.object().required('Business Year is required'),
    month: Yup.object().required('Month is required'),
    color: Yup.object().required('Color is required'),
    yarncount: Yup.object().required('Yarn Count is required'),
    yarntype: Yup.object().required('Yarn Type is required'),
    composition: Yup.object().required('Composition is required'),
    dataList: Yup.array()
      .of(
        Yup.object().shape({
          RecipeID: Yup.object().required('Recipe is required'),
          RequiredDate: Yup.date().required('Required Date is required'),
        })
      )
      .min(1, 'At least one production item is required'),
  });

  const methods = useForm({
    resolver: yupResolver(ProductionOrderSchema),
    defaultValues: {
      itemsValue: 0,
      serviceCharge: 0,
      additionalCharge: 0,
      deductionAmount: 0,
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

  // Calculate PI Value
  const piValue = useMemo(() => {
    const items = parseFloat(values.itemsValue || 0);
    const service = parseFloat(values.serviceCharge || 0);
    const additional = parseFloat(values.additionalCharge || 0);
    const deduction = parseFloat(values.deductionAmount || 0);
    return (items + service + additional - deduction).toFixed(4);
  }, [values.itemsValue, values.serviceCharge, values.additionalCharge, values.deductionAmount]);

  // API fetch functions
  const fetchBusinessYears = useCallback(async () => {
    try {
      const response = await Get(
        `Production/GetBusinessYears?Org_ID=${userData?.userDetails?.orgId}&Branch_ID=${userData?.userDetails?.branchID}`
      );
      setbusinessYear(response.data?.Data || []);
    } catch (error) {
      console.error('Error fetching Year:', error);
    }
  }, [userData?.userDetails?.orgId, userData?.userDetails?.branchID]);

  const fetchGetVendor = useCallback(async () => {
    try {
      const response = await Get(
        `Production/GetVendors?Org_ID=${userData?.userDetails?.orgId}&Branch_ID=${userData?.userDetails?.branchID}`
      );
      setgetVendor(response.data?.Data || []);
    } catch (error) {
      console.error('Error fetching Vendor:', error);
    }
  }, [userData?.userDetails?.orgId, userData?.userDetails?.branchID]);

  const fetchGetEndCustomer = useCallback(async () => {
    try {
      const response = await Get(
        `CommercialModule/GetEndCustomer?Org_ID=${userData?.userDetails?.orgId}&Branch_ID=${userData?.userDetails?.branchID}`
      );
      setgetEndCustomer(response.data?.Data || []);
    } catch (error) {
      console.error('Error fetching Vendor:', error);
    }
  }, [userData?.userDetails?.orgId, userData?.userDetails?.branchID]);

  const fetchGetInvoicePurposes = useCallback(async () => {
    try {
      const response = await Get(
        `CommercialModule/GetInvoicePurposes?Org_ID=${userData?.userDetails?.orgId}&Branch_ID=${userData?.userDetails?.branchID}`
      );
      setgetInvoicePurposes(response.data?.Data || []);
    } catch (error) {
      console.error('Error fetching Vendor:', error);
    }
  }, [userData?.userDetails?.orgId, userData?.userDetails?.branchID]);

  const fetchGetTradeTerms = useCallback(async () => {
    try {
      const response = await Get(
        `CommercialModule/GetTradeTerms?Org_ID=${userData?.userDetails?.orgId}&Branch_ID=${userData?.userDetails?.branchID}`
      );
      setgetTradeTerms(response.data || []);
    } catch (error) {
      console.error('Error fetching Vendor:', error);
    }
  }, [userData?.userDetails?.orgId, userData?.userDetails?.branchID]);

  const fetchGetLcNo = useCallback(async () => {
    try {
      const response = await Get(
        `CommercialModule/GetImportLCList?Org_ID=${userData?.userDetails?.orgId}&Branch_ID=${userData?.userDetails?.branchID}`
      );
      setlcNo(response.data || []);
    } catch (error) {
      console.error('Error fetching Vendor:', error);
    }
  }, [userData?.userDetails?.orgId, userData?.userDetails?.branchID]);

  const fetchLCDetails = async () => {
    if (!selectedLC) {
      enqueueSnackbar('Please select an LC first', { variant: 'warning' });
      return;
    }

    setLoadingLCDetails(true);
    try {
      const response = await Get(`CommercialModule/GetImportLCDetails?ImportLCID=${selectedLC}`);
      setLcDetailsData(response.data || []);
      setSelectedLCItems([]); // Reset checkbox selections
      setLcDetailsOpen(true);
    } catch (error) {
      console.error('Error fetching LC Details:', error);
      enqueueSnackbar('Error fetching LC details', { variant: 'error' });
    } finally {
      setLoadingLCDetails(false);
    }
  };

  const handleCheckboxChange = (detail, checked) => {
    setSelectedLCItems((prevSelected) => {
      if (checked) {
        // Check if item already exists
        const exists = prevSelected.some(
          (item) => item.ImportLCDetailID === detail.ImportLCDetailID
        );
        if (exists) {
          return prevSelected; // Don't add duplicate
        }
        return [...prevSelected, detail];
      } else {
        // Remove the item
        return prevSelected.filter((item) => item.ImportLCDetailID !== detail.ImportLCDetailID);
      }
    });
  };

  const handleAddDetails = () => {
    if (selectedLCItems.length === 0) {
      enqueueSnackbar('Please select at least one item', { variant: 'warning' });
      return;
    }

    const newItems = selectedLCItems.filter(
      (item) =>
        !finalLCDetails.find((existing) => existing.ImportLCDetailID === item.ImportLCDetailID)
    );

    setFinalLCDetails([...finalLCDetails, ...newItems]);
    enqueueSnackbar(`${newItems.length} item(s) added successfully`, { variant: 'success' });
    setLcDetailsOpen(false);
    setSelectedLCItems([]);
  };

  const handleRemoveLCDetail = (index) => {
    setFinalLCDetails(finalLCDetails.filter((_, i) => i !== index));
    enqueueSnackbar('LC Detail removed', { variant: 'info' });
  };

  const fetchBusinessMonths = useCallback(async () => {
    try {
      if (values?.BusinessYear) {
        const response = await Get(
          `Production/GetBusinessMonths?Org_ID=${userData?.userDetails?.orgId}&Branch_ID=${userData?.userDetails?.branchID}&BusinessYear=${values?.BusinessYear?.BusinessYear}`
        );
        setMonths(response.data?.Data || []);
      }
    } catch (error) {
      console.error('Error fetching Months:', error);
    }
  }, [userData?.userDetails?.orgId, userData?.userDetails?.branchID, values?.BusinessYear]);

  const fetchColors = useCallback(async () => {
    try {
      if (values?.BusinessYear && values?.month) {
        const response = await Get(
          `Production/GetColors?Org_ID=${userData?.userDetails?.orgId}&Branch_ID=${userData?.userDetails?.branchID}&Year=${values?.BusinessYear?.BusinessYear}&Month=${values?.month?.BusinessMonth}`
        );
        setColor(response.data?.Data || []);
      }
    } catch (error) {
      console.error('Error fetching Colors:', error);
    }
  }, [
    userData?.userDetails?.orgId,
    userData?.userDetails?.branchID,
    values?.month,
    values?.BusinessYear,
  ]);

  const fetchYarnCount = useCallback(async () => {
    try {
      if (values?.BusinessYear && values?.month && values?.color) {
        const response = await Get(
          `Production/GetYarnCounts?Org_ID=${userData?.userDetails?.orgId}&Branch_ID=${userData?.userDetails?.branchID}&Year=${values?.BusinessYear?.BusinessYear}&Month=${values?.month?.BusinessMonth}&ColorID=${values?.color?.ColorID}`
        );
        setYarnCount(response.data?.Data || []);
      }
    } catch (error) {
      console.error('Error fetching Yarn Count:', error);
    }
  }, [
    userData?.userDetails?.orgId,
    userData?.userDetails?.branchID,
    values?.month,
    values?.BusinessYear,
    values?.color,
  ]);

  const fetchYarnType = useCallback(async () => {
    try {
      if (values?.BusinessYear && values?.month && values?.color && values?.yarncount) {
        const response = await Get(
          `Production/GetYarnTypes?Org_ID=${userData?.userDetails?.orgId}&Branch_ID=${userData?.userDetails?.branchID}&Year=${values?.BusinessYear?.BusinessYear}&Month=${values?.month?.BusinessMonth}&ColorID=${values?.color?.ColorID}&CountID=${values?.yarncount?.Yarn_Count_ID}`
        );
        setYarnType(response.data?.Data || []);
      }
    } catch (error) {
      console.error('Error fetching Yarn Type:', error);
    }
  }, [
    userData?.userDetails?.orgId,
    userData?.userDetails?.branchID,
    values?.month,
    values?.BusinessYear,
    values?.color,
    values?.yarncount,
  ]);

  const fetchComposition = useCallback(async () => {
    try {
      if (
        values?.BusinessYear &&
        values?.month &&
        values?.color &&
        values?.yarncount &&
        values?.yarntype
      ) {
        const response = await Get(
          `Production/GetCompositions?Org_ID=${userData?.userDetails?.orgId}&Branch_ID=${userData?.userDetails?.branchID}&Year=${values?.BusinessYear?.BusinessYear}&Month=${values?.month?.BusinessMonth}&ColorID=${values?.color?.ColorID}&CountID=${values?.yarncount?.Yarn_Count_ID}&YarnTypeID=${values?.yarntype?.Yarn_Type_ID}`
        );
        setComposition(response.data?.Data || []);
      }
    } catch (error) {
      console.error('Error fetching Composition:', error);
    }
  }, [
    userData?.userDetails?.orgId,
    userData?.userDetails?.branchID,
    values?.month,
    values?.BusinessYear,
    values?.color,
    values?.yarncount,
    values?.yarntype,
  ]);

  const fetchPIdetails = useCallback(async () => {
    try {
      if (
        values?.BusinessYear &&
        values?.month &&
        values?.color &&
        values?.yarncount &&
        values?.yarntype &&
        values?.composition
      ) {
        const response = await Get(
          `Production/GetPIDetailsByComposition?Org_ID=${userData?.userDetails?.orgId}&Branch_ID=${userData?.userDetails?.branchID}&Year=${values?.BusinessYear?.BusinessYear}&Month=${values?.month?.BusinessMonth}&ColorID=${values?.color?.ColorID}&CountID=${values?.yarncount?.Yarn_Count_ID}&YarnTypeID=${values?.yarntype?.Yarn_Type_ID}&CompositionID=${values?.composition?.Composition_ID}`
        );
        setDataList(response.data?.Data || []);
      }
    } catch (error) {
      console.error('Error fetching PI Details:', error);
    }
  }, [
    userData?.userDetails?.orgId,
    userData?.userDetails?.branchID,
    values?.month,
    values?.BusinessYear,
    values?.color,
    values?.yarncount,
    values?.yarntype,
    values?.composition,
  ]);

  const fetchRecipes = useCallback(
    async (WIC_ID) => {
      try {
        const response = await Get(
          `Production/GetRecipeByCustomer?Org_ID=${userData?.userDetails?.orgId}&Branch_ID=${userData?.userDetails?.branchID}&CustomerID=${WIC_ID}`
        );
        setRecipesByCustomer((prev) => ({
          ...prev,
          [WIC_ID]: response.data?.Data || [],
        }));
      } catch (error) {
        console.error('Error fetching Recipes:', error);
      }
    },
    [userData?.userDetails?.orgId, userData?.userDetails?.branchID]
  );

  const fetchRecipesDetails = useCallback(
    async (RecipeID, index) => {
      if (recipesDetailsCache[RecipeID]) {
        setRecipeDetailsByIndex((prev) => ({
          ...prev,
          [index]: recipesDetailsCache[RecipeID],
        }));
        return recipesDetailsCache[RecipeID];
      }

      try {
        const response = await Get(
          `Production/GetRecipeDetailsByRecipeId?Org_ID=${userData?.userDetails?.orgId}&Branch_ID=${userData?.userDetails?.branchID}&RecipeID=${RecipeID}`
        );

        const recipeDetails = response.data?.Data || [];

        setRecipesDetailsCache((prev) => ({
          ...prev,
          [RecipeID]: recipeDetails,
        }));

        setRecipeDetailsByIndex((prev) => ({
          ...prev,
          [index]: recipeDetails,
        }));

        return recipeDetails;
      } catch (error) {
        console.error('Error fetching Recipe Details:', error);
      }
    },
    [userData?.userDetails?.orgId, userData?.userDetails?.branchID, recipesDetailsCache]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchGetLcNo(),
          fetchGetTradeTerms(),
          fetchGetInvoicePurposes(),
          fetchGetEndCustomer(),
          fetchGetVendor(),
          fetchBusinessYears(),
          fetchBusinessMonths(),
          fetchColors(),
          fetchYarnCount(),
          fetchYarnType(),
          fetchComposition(),
          fetchPIdetails(),
        ]);
      } catch (error) {
        enqueueSnackbar('Error loading dropdown data', { variant: 'error' });
      }
    };
    fetchData();
  }, [
    fetchGetLcNo,
    fetchGetTradeTerms,
    fetchGetInvoicePurposes,
    fetchGetEndCustomer,
    fetchGetVendor,
    fetchBusinessYears,
    fetchBusinessMonths,
    fetchColors,
    fetchYarnCount,
    fetchYarnType,
    fetchComposition,
    fetchPIdetails,
    enqueueSnackbar,
  ]);

  useEffect(() => {
    if (dataList.length > 0) {
      const uniqueWICIDs = [...new Set(dataList.map((item) => item.WIC_ID))];
      uniqueWICIDs.forEach((WIC_ID) => {
        if (!recipesByCustomer[WIC_ID]) {
          fetchRecipes(WIC_ID);
        }
      });
    }
  }, [dataList, fetchRecipes, recipesByCustomer]);

  const watchedDataList = useWatch({ control, name: 'dataList' });

  useEffect(() => {
    if (watchedDataList) {
      watchedDataList.forEach((item, index) => {
        if (item?.RecipeID) {
          const recipeId = item.RecipeID?.RecipeID || item.RecipeID;
          if (
            recipeId &&
            (!recipeDetailsByIndex[index] || recipeDetailsByIndex[index][0]?.RecipeID !== recipeId)
          ) {
            fetchRecipesDetails(recipeId, index);
          }
        }
      });
    }
  }, [watchedDataList, fetchRecipesDetails, recipeDetailsByIndex]);

  const handleOpen = async (row, index) => {
    const selectedRecipeID = watch(`dataList[${index}].RecipeID`);

    if (selectedRecipeID) {
      const recipeId = selectedRecipeID.RecipeID || selectedRecipeID;

      if (recipeDetailsByIndex[index]) {
        const detailWithQty = recipeDetailsByIndex[index].map((d) => ({
          ...d,
          PIQuantity: row.PIQty,
        }));
        setDetail(detailWithQty);
      } else {
        const data = await fetchRecipesDetails(recipeId, index);
        const detailWithQty = data.map((d) => ({
          ...d,
          PIQuantity: row.PIQty,
        }));
        setDetail(detailWithQty);
      }
      setOpen(true);
    }
  };

  const formatDateToUTC = (date) => {
    if (!date) return null;
    const dateObj = new Date(date);
    return dateObj.toISOString();
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await ProductionOrderSchema.validate(data, { abortEarly: false });

      const requestBody = {
        ProductionOrderDate: formatDateToUTC(data.Date),
        CreatedBy: userData?.userDetails?.userId || 101,
        Branch_ID: userData?.userDetails?.branchID || 1,
        Org_ID: userData?.userDetails?.orgId || 10,
        LCDetails: finalLCDetails.map((detail) => ({
          ImportLCDetailID: detail.ImportLCDetailID,
          ItemCode: detail.ItemCode,
          Description: detail.Description,
          UOM: detail.UOM,
          Quantity: detail.Quantity,
          Rate: detail.Rate,
          Amount: detail.Amount,
          PINo: detail.PINo,
        })),
        Details: data.dataList.map((item, index) => {
          const originalItem = dataList[index];
          const recipeDetails = recipeDetailsByIndex[index] || [];

          return {
            PIID: originalItem.PIID || 5000 + index,
            PIDtlID: originalItem.PIDtlID || 7000 + index,
            RecipeID: item.RecipeID?.RecipeID || item.RecipeID,
            RequiredQty: originalItem.PIQty || 0,
            RequiredDate: formatDateToUTC(item.RequiredDate),
            Remarks: `Production item ${index + 1}`,
            SubDetails: recipeDetails.map((detailItem, detailIndex) => ({
              RecipeDtlID: detailItem.RecipeDtlID || 9000 + detailIndex,
              RequiredQty: (
                ((originalItem.PIQty * detailItem.RequiredPercentage) / 100) *
                1.1
              ).toFixed(2),
            })),
          };
        }),
      };

      const response = await Post('Production/SaveProductionOrder', requestBody);

      if (response.status === 200 || response.status === 201) {
        enqueueSnackbar('Production order saved successfully', { variant: 'success' });
        navigate(paths.dashboard.RandDLab.production.root);
        reset();
      } else {
        enqueueSnackbar('Error saving production order', { variant: 'error' });
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

  useEffect(() => {
    setValue('month', null);
    setValue('color', null);
    setValue('yarncount', null);
    setValue('yarntype', null);
    setValue('composition', null);
    setDataList([]);
  }, [values.BusinessYear, setValue]);

  useEffect(() => {
    setValue('color', null);
    setValue('yarncount', null);
    setValue('yarntype', null);
    setValue('composition', null);
    setDataList([]);
  }, [values.month, setValue]);

  useEffect(() => {
    setValue('yarncount', null);
    setValue('yarntype', null);
    setValue('composition', null);
    setDataList([]);
  }, [values.color, setValue]);

  useEffect(() => {
    setValue('yarntype', null);
    setValue('composition', null);
    setDataList([]);
  }, [values.yarncount, setValue]);

  useEffect(() => {
    setValue('composition', null);
    setDataList([]);
  }, [values.yarntype, setValue]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Card sx={{ p: 3 }}>
            <Box
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              }}
              rowGap={3}
              columnGap={2}
            >
              <Box>
                <RHFTextField name="PIId" label="PI Id" size="small" />
              </Box>
              <Box>
                <RHFTextField name="supplierPO" label="Supplier's PO" size="small" />
              </Box>

              <Box>
                <RHFTextField name="PINo" label="PI No" size="small" />
              </Box>
              <Box>
                <RHFTextField name="buyer" label="Buyer" size="small" />
              </Box>

              <Box>
                <Controller
                  name="Date"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      label="PI Date"
                      format="MM/dd/yyyy"
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

                <Box display="flex" gap={1}>
                  <Box display="flex" alignItems="flex-end">
                    <FormControlLabel
                      control={
                        <Checkbox checked={Ind} onChange={(e) => setInd(e.target.checked)} />
                      }
                      label="Ind"
                    />
                  </Box>
                  <Box display="flex" alignItems="flex-end">
                    <FormControlLabel
                      control={<Checkbox checked={Po} onChange={(e) => setPo(e.target.checked)} />}
                      label="Po"
                    />
                  </Box>
                </Box>
              </Box>

              <RHFAutocomplete
                name="currency"
                label="Currency"
                size="small"
                options={[
                  { id: 1, name: 'US Dollar' },
                  { id: 2, name: 'EUR' },
                  { id: 3, name: 'PKR' },
                ]}
                getOptionLabel={(option) => option.name || ''}
              />
              <RHFAutocomplete
                name="supplier"
                label="Supplier"
                size="small"
                options={getVendor}
                getOptionLabel={(option) => option.VendorName || option.VendorID}
              />

              <RHFTextField
                name="itemsValue"
                label="Items Value"
                type="number"
                size="small"
                InputProps={{ inputProps: { step: 0.0001 } }}
              />
              <RHFAutocomplete
                name="purchaser"
                label="Purchaser"
                size="small"
                options={getEndCutomer}
                getOptionLabel={(option) => option.WIC_Name || option.WIC_ID}
              />

              <RHFTextField
                name="serviceCharge"
                label="Service Charge"
                type="number"
                size="small"
                InputProps={{ inputProps: { step: 0.0001 } }}
              />

              <RHFTextField name="styleNo" label="Style No" size="small" />

              <RHFTextField
                name="additionalCharge"
                label="Additional Charge"
                type="number"
                size="small"
                InputProps={{ inputProps: { step: 0.0001 } }}
              />
              <RHFAutocomplete
                name="purpose"
                label="Purpose"
                size="small"
                options={getInvoicePurposes}
                getOptionLabel={(option) => option.PurposeName || option.InvoicePurposeID}
              />

              <RHFTextField
                name="deductionAmount"
                label="Deduction Amount"
                type="number"
                size="small"
                InputProps={{ inputProps: { step: 0.0001 } }}
              />

              <Controller
                name="piExpiryDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="PI Expiry Date"
                    format="MM/dd/yyyy"
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
              <TextField
                label="PI Value"
                value={piValue}
                size="small"
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <Box>
                <RHFAutocomplete
                  name="lcNo"
                  label="LC NO"
                  size="small"
                  options={lcNo}
                  getOptionLabel={(option) => option.BBImportLCNo || option.ImportLCID}
                  onChange={(event, newValue) => {
                    setSelectedLC(newValue?.ImportLCID || null);
                  }}
                />
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '2fr 3fr' }} gap={3}>
              <RHFTextField
                name="termsConditions"
                label="Terms & Conditions"
                multiline
                rows={6}
                size="small"
              />

              <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
                <RHFAutocomplete
                  name="tradeTerm"
                  label="Trade Term"
                  size="small"
                  options={getTradeTerms}
                  getOptionLabel={(option) =>
                    option.TradeTermName || option.TradeTermID || option.Description
                  }
                />
                <RHFAutocomplete
                  name="payTerm"
                  label="Pay Term"
                  size="small"
                  options={[{ id: 1, name: 'EDF' }]}
                  getOptionLabel={(option) => option.name || ''}
                />

                <RHFAutocomplete
                  name="shipMode"
                  label="Ship Mode"
                  size="small"
                  options={[{ id: 1, name: 'BY ROAD' }]}
                  getOptionLabel={(option) => option.name || ''}
                />
                <Controller
                  name="shipDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Ship Date"
                      format="MM/dd/yyyy"
                      value={field.value}
                      onChange={(newValue) => field.onChange(newValue)}
                      slotProps={{
                        textField: { fullWidth: true, size: 'small' },
                      }}
                    />
                  )}
                />
                <Controller
                  name="eta"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="ETA"
                      format="MM/dd/yyyy"
                      value={field.value}
                      onChange={(newValue) => field.onChange(newValue)}
                      slotProps={{
                        textField: { fullWidth: true, size: 'small' },
                      }}
                    />
                  )}
                />

                <Box />
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Filter Section */}
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Filter Criteria
            </Typography>
            <Box
              display="grid"
              gridTemplateColumns={{ xs: '1fr', sm: 'repeat(4, 1fr)' }}
              gap={2}
              mb={3}
            >
              <RHFAutocomplete
                name="BusinessYear"
                label="Business Year"
                size="small"
                options={businessYear}
                getOptionLabel={(option) => option.BusinessYear || ''}
                value={values.BusinessYear || null}
              />

              <RHFAutocomplete
                name="month"
                label="Month"
                size="small"
                options={months}
                getOptionLabel={(option) => option.BusinessMonth || ''}
                isOptionEqualToValue={(option, value) => option.MonthNumber === value.MonthNumber}
                value={values.month || null}
              />

              <RHFAutocomplete
                name="color"
                label="Color"
                size="small"
                options={Color}
                getOptionLabel={(option) => option.Color_and_Code || ''}
                isOptionEqualToValue={(option, value) => option.ColorID === value.ColorID}
                value={values.color || null}
              />

              <RHFAutocomplete
                name="yarncount"
                label="Yarn Count"
                size="small"
                options={YarnCount}
                getOptionLabel={(option) => option.Yarn_Count_Name || ''}
                isOptionEqualToValue={(option, value) =>
                  option.Yarn_Count_ID === value.Yarn_Count_ID
                }
                value={values.yarncount || null}
              />

              <RHFAutocomplete
                name="yarntype"
                label="Yarn Type"
                size="small"
                options={YarnType}
                getOptionLabel={(option) => option.Yarn_Type || ''}
                isOptionEqualToValue={(option, value) => option.Yarn_Type_ID === value.Yarn_Type_ID}
                value={values.yarntype || null}
              />

              <RHFAutocomplete
                name="composition"
                label="Composition"
                size="small"
                options={Composition}
                getOptionLabel={(option) => option.Composition_Name || ''}
                isOptionEqualToValue={(option, value) =>
                  option.Composition_ID === value.Composition_ID
                }
                value={values.composition || null}
              />

              <RHFAutocomplete name="Part" label="Part" size="small" options={[]} />

              <Box display="flex" alignItems="flex-end">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={piReceiveComplete}
                      onChange={(e) => setPiReceiveComplete(e.target.checked)}
                    />
                  }
                  label="PI Receive Complete?"
                />
              </Box>
            </Box>

            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button
                variant="contained"
                size="small"
                sx={{ mt: 1 }}
                disabled={!selectedLC || loadingLCDetails}
                onClick={fetchLCDetails}
              >
                {loadingLCDetails ? 'Loading...' : 'Get LC Details'}
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Item Details Table */}
        <Grid xs={12}>
          <Card sx={{ p: 0 }}>
            <Box
              sx={{
                bgcolor: '#FFA726',
                px: 2,
                py: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" sx={{ color: 'white' }}>
                Item Details
              </Typography>
              <IconButton size="small" sx={{ color: 'white' }}>
                <Iconify icon="mdi:chevron-up" />
              </IconButton>
            </Box>

            {dataList.length > 0 && (
              <TableContainer sx={{ maxHeight: 400 }}>
                <Scrollbar>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Style</TableCell>
                        <TableCell>Group Item</TableCell>
                        <TableCell>Sub Group</TableCell>
                        <TableCell>Item Code</TableCell>
                        <TableCell>Item Description</TableCell>
                        <TableCell>UOM</TableCell>
                        <TableCell>PO Qty</TableCell>
                        <TableCell>PI Qty</TableCell>
                        <TableCell>Balance Qty</TableCell>
                        <TableCell>Rate</TableCell>
                        <TableCell>Recipe</TableCell>
                        <TableCell align="center">Details</TableCell>
                        <TableCell>Required Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataList.map((row, index) => {
                        const recipes = recipesByCustomer[row.WIC_ID] || [];
                        return (
                          <TableRow key={index}>
                            <TableCell>
                              <RHFAutocomplete
                                name={`dataList[${index}].style`}
                                size="small"
                                options={[{ id: 1, name: '--Select--' }]}
                                getOptionLabel={(option) => option.name || ''}
                              />
                            </TableCell>
                            <TableCell>{row.WIC_Name || 'Fiber'}</TableCell>
                            <TableCell>Fiber</TableCell>
                            <TableCell>{row.Item_Code}</TableCell>
                            <TableCell>{row.Description}</TableCell>
                            <TableCell>
                              <RHFAutocomplete
                                name={`dataList[${index}].uom`}
                                size="small"
                                options={[{ id: 1, name: row.Unit || 'kg' }]}
                                getOptionLabel={(option) => option.name || ''}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                size="small"
                                value="0.0000"
                                InputProps={{ readOnly: true }}
                                sx={{ width: 100 }}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                size="small"
                                value={row.PIQty || '0.000'}
                                InputProps={{ readOnly: true }}
                                sx={{ width: 100 }}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                size="small"
                                value="0.0"
                                InputProps={{ readOnly: true }}
                                sx={{ width: 80 }}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                size="small"
                                value="0.9500"
                                InputProps={{ readOnly: true }}
                                sx={{ width: 100 }}
                              />
                            </TableCell>
                            <TableCell sx={{ minWidth: 200 }}>
                              <RHFAutocomplete
                                name={`dataList[${index}].RecipeID`}
                                size="small"
                                options={recipes}
                                getOptionLabel={(option) => option.RecipeName || ''}
                                isOptionEqualToValue={(option, value) =>
                                  option.RecipeID === value.RecipeID
                                }
                              />
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                size="small"
                                onClick={() => handleOpen(row, index)}
                                disabled={!watch(`dataList[${index}].RecipeID`)}
                              >
                                <Iconify icon="hugeicons:property-view" />
                              </IconButton>
                            </TableCell>
                            <TableCell>
                              <Controller
                                name={`dataList[${index}].RequiredDate`}
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                  <DatePicker
                                    format="MM/dd/yyyy"
                                    value={field.value}
                                    onChange={(newValue) => field.onChange(newValue)}
                                    slotProps={{
                                      textField: {
                                        size: 'small',
                                        error: !!error,
                                        helperText: error?.message,
                                        sx: { minWidth: 150 },
                                      },
                                    }}
                                  />
                                )}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>
            )}

            <Box
              sx={{
                px: 2,
                py: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #e0e0e0',
              }}
            >
              <Box display="flex" gap={1} alignItems="center">
                <IconButton size="small">
                  <Iconify icon="mdi:chevron-left" />
                </IconButton>
                <IconButton size="small">
                  <Iconify icon="mdi:chevron-double-left" />
                </IconButton>
                <Typography variant="body2">Page</Typography>
                <TextField size="small" value="1" sx={{ width: 60 }} />
                <Typography variant="body2">of 1</Typography>
                <IconButton size="small">
                  <Iconify icon="mdi:chevron-double-right" />
                </IconButton>
                <IconButton size="small">
                  <Iconify icon="mdi:chevron-right" />
                </IconButton>
                <TextField
                  select
                  size="small"
                  value="10"
                  sx={{ width: 80 }}
                  SelectProps={{ native: true }}
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </TextField>
              </Box>
              <Typography variant="body2">View 1 - 1 of 1</Typography>
            </Box>
          </Card>
        </Grid>

        {/* Approval Section */}
        {finalLCDetails.length > 0 && (
          <Grid xs={12}>
            <Card sx={{ p: 0 }}>
              <Box
                sx={{
                  bgcolor: '#2196F3',
                  px: 2,
                  py: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" sx={{ color: 'white' }}>
                  LC Details
                </Typography>
                <IconButton size="small" sx={{ color: 'white' }}>
                  <Iconify icon="mdi:chevron-up" />
                </IconButton>
              </Box>

              <TableContainer sx={{ maxHeight: 400 }}>
                <Scrollbar>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Inv_Cat_Name</TableCell>
                        <TableCell>SubCat_Name</TableCell>
                        <TableCell>ItemDescription</TableCell>
                        <TableCell>ItemCode</TableCell>
                        <TableCell>UOMName</TableCell>
                        <TableCell>PIQty</TableCell>
                        <TableCell>Rate</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {finalLCDetails.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.ItemCode}</TableCell>
                          <TableCell>{row.Description}</TableCell>
                          <TableCell>{row.UOM}</TableCell>
                          <TableCell>{row.Quantity}</TableCell>
                          <TableCell>{row.Rate}</TableCell>
                          <TableCell>{row.Amount}</TableCell>
                          <TableCell>{row.PINo}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleRemoveLCDetail(index)}
                            >
                              <Iconify icon="mdi:delete" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>

              <Box
                sx={{
                  px: 2,
                  py: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid #e0e0e0',
                }}
              >
                <Typography variant="body2">Total Items: {finalLCDetails.length}</Typography>
              </Box>
            </Card>
          </Grid>
        )}

        {/* Action Buttons */}
        <Grid xs={12}>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" size="large">
              Save
            </Button>
            <Button variant="outlined" size="large">
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
                setFinalLCDetails([]);
                setSelectedLC(null);
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

      {/* Recipe Details Dialog */}
      <Dialog open={lcDetailsOpen} fullWidth maxWidth="lg" onClose={() => setLcDetailsOpen(false)}>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Select LC Details</Typography>
            <IconButton onClick={() => setLcDetailsOpen(false)}>
              <Iconify icon="mdi:close" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {lcDetailsData.length > 0 ? (
            <>
              <TableContainer component={Paper} sx={{ mt: 2, maxHeight: 400 }}>
                <Scrollbar>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            indeterminate={
                              selectedLCItems.length > 0 &&
                              selectedLCItems.length < lcDetailsData.length
                            }
                            checked={
                              lcDetailsData.length > 0 &&
                              selectedLCItems.length === lcDetailsData.length
                            }
                            onChange={(e) => {
                              e.stopPropagation();
                              if (e.target.checked) {
                                setSelectedLCItems([...lcDetailsData]);
                              } else {
                                setSelectedLCItems([]);
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>Item Code</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>UOM</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Rate</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>PI No</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {lcDetailsData.map((row, index) => {
                        const isSelected = selectedLCItems.some(
                          (item) => item.ImportLCDetailID === row.ImportLCDetailID
                        );
                        return (
                          <TableRow key={index} hover onClick={(e) => e.stopPropagation()}>
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isSelected}
                                onChange={(e) => {
                                  e.stopPropagation(); // Prevent event bubbling
                                  handleCheckboxChange(row, e.target.checked);
                                }}
                              />
                            </TableCell>
                            <TableCell>{row.ItemCode}</TableCell>
                            <TableCell>{row.Description}</TableCell>
                            <TableCell>{row.UOM}</TableCell>
                            <TableCell>{row.Quantity}</TableCell>
                            <TableCell>{row.Rate}</TableCell>
                            <TableCell>{row.Amount}</TableCell>
                            <TableCell>{row.PINo}</TableCell>
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
                <Typography variant="body2">{selectedLCItems.length} item(s) selected</Typography>
                <Button
                  variant="contained"
                  size="medium"
                  disabled={selectedLCItems.length === 0}
                  onClick={handleAddDetails}
                >
                  Add Details
                </Button>
              </Box>
            </>
          ) : (
            <Typography align="center" sx={{ mt: 3, mb: 3 }}>
              No LC details available
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
}
