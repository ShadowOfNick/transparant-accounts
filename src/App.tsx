import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layout';
import { AccountDetailPage, AccountsListPage } from './pages';
import accountsList from './mock-data/ta-accounts-response.json'

export interface AccountDetail {
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

const AccountsListSlicer = (accountsList: AccountDetail[]): AccountDetail => {
  return accountsList[0]
};

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path='/' element={<AccountsListPage items={accountsList} />}></Route>
          <Route path='/account-detail/:id' element={<AccountDetailPage {...AccountsListSlicer(accountsList)} />}></Route>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
