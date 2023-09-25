import styled from 'styled-components';
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Divider
} from '@mui/material';
import accountBalance from '../mock-data/ta-2002222222-balance-response.json';
import accountTransactions from '../mock-data/ta-2002222222-transactions-response.json';

interface AccountDetail {
  currency: string,
  id: string,
  identification: {
    iban: string,
    otherAccountNumber: string,
  },
  name: string,
  product: string,
  servicer: {
    bankCode: string,
    bic: string,
    countryCode: string,
  }
};

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#426eff',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  textDecoration: 'none',
  '&:nth-of-type(odd)': {
    backgroundColor: '#474747',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const AccountDetailPage: React.FC<AccountDetail> = ({
  currency,
  id,
  identification,
  name,
  product,
  servicer,
}) => {
  const CZKoruna = new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
  });

  const DateFormater = (date: string) => {
    const newDate = new Date(date)
    return new Intl.DateTimeFormat('cs-CZ', {
      dateStyle: 'short',
    }).format(newDate);
  };

  return (
    <>
      <Typography component='h3' variant='h3' align='center' marginBottom={3}>
        Transparentní účet {name}
      </Typography>

      <Typography component='h4' variant='h4' align='center' marginBottom={3}>
        {identification.otherAccountNumber}/{servicer.bankCode}
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                Transparentní účet
              </TableCell>

              <TableCell align='center'>
                Majitel transparentního účtu
              </TableCell>

              <TableCell align='right'>
                Celkový zůstatek na běžném účtu
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {identification.otherAccountNumber}/{servicer.bankCode}
              </TableCell>

              <TableCell align='center' component="th" scope="row">
                {name}
              </TableCell>

              <TableCell align='right' component="th" scope="row">
                {CZKoruna.format(accountBalance.amount.value)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ marginTop: 3, marginBottom: 3}} light/>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">
                Datum
              </StyledTableCell>

              <StyledTableCell align="center">
                Název účtu<br />
                Poznámka
              </StyledTableCell>

              <StyledTableCell align="center">
                Valuta<br />
                Typ
              </StyledTableCell>

              <StyledTableCell align="center">
                Variabilní symbol<br />
                Specifický symbol
              </StyledTableCell>

              <StyledTableCell align="center">
                Částka
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>

          <TableBody>
            {accountTransactions.map((item) => (
              <StyledTableRow
                key={item.id}
              >
                <StyledTableCell component="th" scope="row" align="center">
                  {DateFormater(item.bookingDate)}
                </StyledTableCell>

                <StyledTableCell component="th" scope="row" align="center">
                  {item.counterPartyAccount.accountName}<br />
                  {item.details.detail1}
                </StyledTableCell>

                <StyledTableCell component="th" scope="row" align="center">
                  {item.amount.currency}<br />
                  {item.transactionType}
                </StyledTableCell>
                
                <StyledTableCell component="th" scope="row" align="center">
                  {item.variableSymbol}<br />
                  {item.specificSymbol}
                </StyledTableCell>
                
                <StyledTableCell component="th" scope="row" align="center">
                  {CZKoruna.format(item.amount.value)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
