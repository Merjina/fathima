import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Footer from "./components/Footer";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Users from "./components/Users";
import Feedback from "./components/Feedback";
import ChittyScheme from "./components/ChittyScheme";
import LoanRequest from "./components/LoanRequest";
import AuctionManagement from "./components/AuctionManagement";
import BranchManagement from "./components/BranchManagement";
import Payment from "./components/Payment";
import LoanRegistration from "./components/LoanRegistration";
import ChittyplanHome from "./components/ChittyplanHome";
import Feedbacklist from "./components/Feedbacklist";
import Profilepage from "./components/Profilepage";
import Pay from "./components/Pay";
import Notify from "./components/Notify";
import AssignChittyForm from "./components/AssignChittyForm";
import LoanPay from "./components/LoanPay";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/user" element={<Users />} />
          <Route path="/chittyscheme" element={<ChittyScheme />} />
          <Route path="/loan" element={<LoanRequest />} />
          <Route path="/auction" element={<AuctionManagement />} />
          <Route path="/branch" element={<BranchManagement />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/loanreg" element={<LoanRegistration />} />
          <Route path="/chittyhome" element={<ChittyplanHome />} />
          <Route path="/feedbacklist" element={<Feedbacklist />} />
          <Route path="/profilepage" element={<Profilepage />} />
          <Route path="/feedbacklist" element={<Feedbacklist />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/notify" element={<Notify />} />
          <Route path="/assign" element={<AssignChittyForm />} />
          <Route path="/loanpay" element={<LoanPay />} />
         
          <Route path="/payment" element={<Payment />} />
  
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
