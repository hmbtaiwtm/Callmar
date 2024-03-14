import { Route, Routes } from "react-router-dom";
import { Home } from "./home/home";
//UserAccount
import { SignIn } from "./sign-in/sign-in";
import { Register } from "./register/register";
import { SendEmail } from "./send-email/send-email";
import { RessetPass } from "./ress-pass/ress-pass";


export const Pages = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<SignIn/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/sendEmail" element={<SendEmail/>}></Route>
          <Route path="/ressetPass/:id" element={<RessetPass/>}></Route>
        </Routes>
    </div>
  )
}
