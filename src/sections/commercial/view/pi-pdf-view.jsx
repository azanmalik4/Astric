import { useParams, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import Container from '@mui/material/Container';
import { enqueueSnackbar } from 'notistack';
import { useSettingsContext } from 'src/components/settings';
import { Get } from 'src/api/apibasemethods';
import CommercialInvoice from '../CommercialInvoice';
import PiReport from '../piReport';
import { fDate } from 'src/utils/format-time';
import TruckChallan from '../TruckChallan';
import DeliveryChallan from '../DelieveryChallan';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import InspectionCertificate from '../InspectionCertificate';
import CertificateOfOrigin from '../CertificateOfOrigin';
import PackingList from '../PackingList';
import BillOfExchangePDF from '../BillOfExchangePDF';

// ----------------------------------------------------------------------

export default function PiPDFView() {
  const { ExportInvoiceID } = useParams(); // 👈 Get ID from URL
  const [searchParams] = useSearchParams(); // 👈 Get query params
  const pdfTypes = useMemo(
    () => searchParams.get('type')?.split(',') || [],
    [searchParams]
  );

  const settings = useSettingsContext();
  const [currentData, setCurrentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!ExportInvoiceID || !pdfTypes || pdfTypes.length === 0) return;

      setIsLoading(true);
      try {
        const typesArray = Array.isArray(pdfTypes)
          ? pdfTypes
          : pdfTypes.split(','); // ensure it's an array
        const results = {};
        // eslint-disable-next-line 
        for (const type of typesArray) {
          let response;

          // 🔹 Handle Commercial, TC, DC
          if (['commercial', 'TC', 'DC', 'IC', 'CO', 'packing', 'BOE'].includes(type)) {
            response = 
            // eslint-disable-next-line
            await Get(
              `CommercialModule/GetCommercialInvoicePDF?ExportInvoiceID=${ExportInvoiceID}`
            );

            if (!response.data.Success) {
              throw new Error(
                response.data.Message || 'Failed to fetch commercial invoice data'
              );
            }

            const mainInfo = response.data.Data.MainInformation;
            const goodsDetails = response.data.Data.GoodsDetails;
            const amendmentDetails = response.data.Data.AmendmentDetails;

            const totalQuantity = goodsDetails.reduce(
              (sum, item) => sum + parseFloat(item.Quantity || 0),
              0
            );
            const totalAmount = goodsDetails.reduce(
              (sum, item) => sum + parseFloat(item.Total_Amount || 0),
              0
            );

            const transformedData = {
              InvNo: mainInfo.ExportInvoiceNo,
              InvDate: fDate(mainInfo.ExportInvoiceDate),
              exportRegNo: mainInfo.ExportRegNo || 'N/A',
              ExportDate: fDate(mainInfo.ExportInvoiceDate),
              LcDetails: {
                LcNo: mainInfo.ExportLCNo,
                LcDate: fDate(mainInfo.LCDate),
                AmendmentDetails: amendmentDetails.map((amendment) => ({
                  AmendmentNo: amendment.AmendmentNo,
                  AmendmentDate: fDate(amendment.AmendmentDate),
                  AmendmentAmount: amendment.AmendmentAmount,
                })),
              },
              issuingBank: mainInfo.LC_IssuingBankName,
              HSCode: mainInfo.HSCode,
              Description: mainInfo.Description,
              ChallanNo: mainInfo?.ChallanNo,
              ChallanDate: fDate(mainInfo?.ChallanDate),
              ShippingBillDate: fDate(mainInfo?.ShippingBillDate),
              Collection:
                mainInfo.IsCollection === 'False'
                  ? 'Freight not Paid'
                  : 'Freight PrePaid',
              NegotiatingBank: mainInfo.NegotiatingBankName,
              NegotiatingbankAddress: mainInfo.NegotiatingBankAddress,
              bankAddress: mainInfo.LC_IssuingAddress,
              buyer: mainInfo.RiskName,
              NotifyName: mainInfo.NotifyName,
              acccountrisk: mainInfo.RiskAddress,
              notifyParty: mainInfo.NotifyAddress,
              POL: mainInfo.PortOfLoading,
              FinalDes: mainInfo.FinalDestination,
              Origin: 'BANGLADESH',
              DelieveryTerms: mainInfo.IncotermCode,
              NetWeight: mainInfo.NetWeight || totalQuantity.toFixed(2),
              GrossWeight:
                mainInfo.GrossWeight || (totalQuantity * 1.05).toFixed(2),
              Measurement: '34 X 25 X 12',
              ContractNo: mainInfo.ExportLCNo,
              Exporter: 'SIMCO SPINNING & TEXTILES LTD.',
              PIDetails: Array.from(
                new Map(
                  goodsDetails.map((item) => [
                    `${item.PINo}-${item.PIDate}`,
                    { PI_NO: item?.PINo, PI_Date: item.PIDate },
                  ])
                ).values()
              ),

              items: goodsDetails.map((item) => ({
                Desc: item.Description,
                UOMSymbol: item.UOMSymbol,
                Currency: item.Currency_Code || '',
                CurrencyName: item?.Currency_Name,
                Quantity: parseFloat(item.Quantity).toLocaleString(),
                Price: parseFloat(item.UnitPrice).toFixed(4),
                Amount: parseFloat(item.Total_Amount).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }),
              })),
              totalQuantity,
              totalAmount,
              totalBags: Math.ceil(totalQuantity / 100),
              totalVolume: (totalQuantity * 0.00175).toFixed(2),
            };

            results[type] = transformedData;
          }

          // 🔹 Handle PI type

        }

        // ✅ Store all results (can contain multiple pdfs)
        setCurrentData(results);
      } catch (error) {
        console.error('Error fetching PDF:', error);
        enqueueSnackbar('Failed to fetch PDF data', { variant: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [ExportInvoiceID, pdfTypes]);


  // ✅ Conditional Rendering
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="View PDF"
        links={[
          { name: 'Home', href: paths.dashboard.root },
          { name: 'Export Invoice', href: paths.dashboard.Commercial.ExportInvoice.root },
          { name: 'View' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        pdfTypes.map((type) => {
          const data = currentData?.[type];
          if (!data) return null;

          switch (type) {
            case 'commercial':
              return <CommercialInvoice key={type} currentData={data} />;
            case 'TC':
              return <TruckChallan key={type} currentData={data} />;
            case 'DC':
              return <DeliveryChallan key={type} currentData={data} />;
            case 'IC':
              return <InspectionCertificate key={type} currentData={data} />;
            case 'CO':
              return <CertificateOfOrigin key={type} currentData={data} />;
              case 'packing':
              return <PackingList key={type} currentData={data} />;
              case 'BOE':
              return <BillOfExchangePDF key={type} currentData={data} />;
            default:
              return null;
          }
        })
      )}
    </Container>
  );

}
