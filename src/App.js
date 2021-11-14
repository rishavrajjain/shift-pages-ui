

import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './pages/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignupComplete from './components/auth/SignupComplete';
import VerifyUser from './components/auth/VerifyUser';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import PagesList from './components/shift-pages/PagesList';
import CreatePage from './components/shift-pages/CreatePage';
import Page from './components/shift-pages/Page';
import ViewPage from './components/shift-pages/ViewPage';
import EditPage from './components/shift-pages/EditPage';
import PaymentSuccess from './components/payment/PaymentSuccess';
import PaymentError from './components/payment/PaymentError';
import ViewBuyers from './components/shift-pages/ViewBuyers';
import CreateInvoice from './components/invoices/CreateInvoices';
import InvoiceList from './components/invoices/InvoiceList';
import InvoicePaymentError from './components/payment/InvoicePaymentError';
import InvoicePaymentSuccess from './components/payment/InvoicePaymentSuccess';
import Wallet from './components/wallet/Wallet';
import Disburse from './components/wallet/Disburse';
import Transfer from './components/wallet/TransferMoney';
import Account from './components/auth/Account';
import ResendEmail from './components/auth/ResendEmail';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
    <ToastContainer />

    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/signup" component={Signup}></Route>
      <Route exact path="/signup/complete" component={SignupComplete}></Route>
      <Route exact path="/user/verify/:id" component={VerifyUser}></Route>
      <Route exact path="/user/resend/mail" component={ResendEmail}></Route>
      <Route exact path="/page/:id" component={Page}></Route>
      <Route exact path="/:id/payment/complete" component={PaymentSuccess}></Route>
      <Route exact path="/:id/payment/error" component={PaymentError}></Route>
      <Route exact path="/:id/invoice/complete" component={InvoicePaymentSuccess}></Route>
      <Route exact path="/:id/invoice/error" component={InvoicePaymentError}></Route>
      <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
      <PrivateRoute exact path="/pages" component={PagesList}></PrivateRoute>
      <PrivateRoute exact path="/create/page" component={CreatePage}></PrivateRoute>
      <PrivateRoute exact path="/page/view/:id" component={ViewPage}></PrivateRoute>
      <PrivateRoute exact path="/page/edit/:id" component={EditPage}></PrivateRoute>
      <PrivateRoute exact path="/buyers/:id" component={ViewBuyers}></PrivateRoute>
      <PrivateRoute exact path="/invoice/create" component={CreateInvoice}></PrivateRoute>
      <PrivateRoute exact path="/invoices" component={InvoiceList}></PrivateRoute>
      <PrivateRoute exact path="/wallet" component={Wallet}></PrivateRoute>
      <PrivateRoute exact path="/settle" component={Disburse}></PrivateRoute>
      <PrivateRoute exact path="/transfer" component={Transfer}></PrivateRoute>
      <PrivateRoute exact path="/account" component={Account}></PrivateRoute>
    </Switch>
    
    <Footer/>
    
    </Router>
  );
}

export default App;
