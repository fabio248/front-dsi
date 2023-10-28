import React from 'react'
import { Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

export function FactureSeeData({ facture }) {
    console.log(facture)
  return (
    <>
    <div>
      <Typography variant="h4">Detalles de la factura</Typography>
<br />
      {/* Client Information */}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6">Información del cliente:</Typography>
        <Typography>{facture.client.email ? (
                  <div>
                 <b>Cliente: </b>
                {facture.client.firstName} {facture.client.lastName}
             </div> ) : null}</Typography>
        <Typography>{facture.client.email ? (
                  <div>
                 <b>Email: </b>
                {facture.client.email}
             </div> ) : null}</Typography>
        <Typography>{facture.client.dui ? (
                  <div>
                 <b>Documento: </b>
                {facture.client.dui}
             </div> ) : null}</Typography>
        <Typography>{facture.client.dui ? (
                  <div>
                 <b>Dirección: </b>
                {facture.client.direction}
             </div> ) : null}</Typography>
        <Typography>{facture.client.phone ? (
                  <div>
                 <b>Phone: </b>
                {facture.client?.phone}
             </div> ) : null}</Typography>
      </Paper>

      {/* Bill Details */}
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h6">Detalles de la factura:</Typography>
        <TableContainer component={Paper} style={{ maxHeight: '300px', overflow: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Descripción</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Precio Unitario</TableCell>
                <TableCell>Sub Totales</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {facture.billsDetails.map((bill, index) => (
                <TableRow key={index}>
                  <TableCell>{bill.description}</TableCell>
                  <TableCell>{bill.quantity}</TableCell>
                  <TableCell>$ {bill.unitPrice.toFixed(2)}</TableCell>
                  <TableCell>$ {bill.taxableSales.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <br />
                <TableCell></TableCell><br />
                <TableCell style={{ textAlign:"left"}}><b>Total: $ {facture.totalSales}</b></TableCell>
              </TableRow>
              
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  
    
    </>
  )
}
