import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navibar from "./components/Navibar";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Userdashboard from "./components/Userdashboard";
import OrderPosting from "./components/Orderposting";
import Employees from "./components/Employees";
import Services from "./components/Services";
import Settings from "./components/Settings";
import ContactUs from "./components/ContactUs";
import FAQs from "./components/FAQs";
import ReEmployees from "./components/ReEmployees";
import Orders from "./components/Orders";
import Footer from "./components/Footer";

function App() {
  const [userId, setUserId] = useState(null);

  const handleUserAuthenticated = (userId) => {
    setUserId(userId);
  };

  return (
    <div className="vh-100">
      <BrowserRouter basename="/MajorProject">
        <Navibar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/signin/userdashboard/*"
            element={
              <Signin onUserAuthenticated={handleUserAuthenticated}>
                <Userdashboard userId={userId}>
                  <OrderPosting />
                  <Orders />
                  <ReEmployees />
                  <Employees />
                  <Services />
                  <Settings />
                  <ContactUs />
                  <FAQs />
                </Userdashboard>
              </Signin>
            }
          />
          {/* for other pages 404 */}
          <Route
            path="*"
            element={
              <h1 style={{ textAlign: "center" }}>
                Error 404 - Page Not Found!
              </h1>
            }
          />
        </Routes>
      </BrowserRouter>
        <Footer />
    </div>
  );
}

export default App;
