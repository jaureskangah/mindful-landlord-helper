import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Payment {
  amount: number;
  status: string;
  payment_date: string;
}

interface PaymentHistoryProps {
  payments: Payment[];
}

export const PaymentHistory = ({ payments }: PaymentHistoryProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment, index) => (
            <TableRow key={index}>
              <TableCell>
                {format(new Date(payment.payment_date), 'PPP', { locale: fr })}
              </TableCell>
              <TableCell>${payment.amount.toLocaleString()}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    payment.status === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : payment.status === 'late'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {payment.status === 'paid' ? 'Payé' : payment.status === 'late' ? 'En retard' : 'En attente'}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};