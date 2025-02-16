import pdfMake from "pdfmake/build/pdfmake";
import type { TDocumentDefinitions } from "pdfmake/build/pdfmake";
import type { Tenant } from "@/types/tenant";
import { formatDate } from "@/lib/utils";

// Import fonts directly from the vfs_fonts file
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Initialize pdfMake with the fonts
(pdfMake as any).vfs = (pdfFonts as any).vfs;

export const generateLeaseAgreement = async (tenant: Tenant) => {
  const documentDefinition: TDocumentDefinitions = {
    content: [
      { text: 'RESIDENTIAL LEASE AGREEMENT', style: 'header' },
      { text: '\n' },
      {
        text: [
          { text: 'THIS LEASE AGREEMENT', bold: true },
          ` is made on ${formatDate(new Date().toISOString())} between the Landlord and Tenant:`,
        ]
      },
      { text: '\n' },
      { text: 'TENANT INFORMATION', style: 'subheader' },
      {
        ul: [
          `Name: ${tenant.name}`,
          `Email: ${tenant.email}`,
          `Phone: ${tenant.phone || 'Not provided'}`,
        ]
      },
      { text: '\n' },
      { text: 'PROPERTY INFORMATION', style: 'subheader' },
      {
        ul: [
          `Property: ${tenant.properties?.name || 'Not specified'}`,
          `Unit Number: ${tenant.unit_number}`,
        ]
      },
      { text: '\n' },
      { text: 'LEASE TERMS', style: 'subheader' },
      {
        ul: [
          `Lease Start Date: ${formatDate(tenant.lease_start)}`,
          `Lease End Date: ${formatDate(tenant.lease_end)}`,
          `Monthly Rent: $${tenant.rent_amount}`,
        ]
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5]
      }
    }
  };

  return new Promise<Blob>((resolve, reject) => {
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.getBlob((blob: Blob) => {
      resolve(blob);
    }, (error: any) => {
      reject(error);
    });
  });
};