import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';
import { AccountDetail } from '../App';

interface AccountsListProps {
  items: AccountDetail[];
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

export const AccountsListPage: React.FC<AccountsListProps> = ({
  items,
}) => {
  return (
    <>
      <Typography component='h3' variant='h3' align='center' marginBottom={3}>
        Transparentní účty
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Majitel účtu</StyledTableCell>
              <StyledTableCell align="right">Číslo účtu</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <StyledTableRow
                key={item.id}
                component={Link}
                to={`/account-detail/${item.id}`}
              >
                <StyledTableCell component="th" scope="row">
                  {item.name}
                </StyledTableCell>

                <StyledTableCell align="right">
                  {item.identification.otherAccountNumber}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
