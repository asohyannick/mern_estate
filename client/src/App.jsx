import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  SignIn,
  SignUp,
  About,
  Profile,
} from "./pages/index";
import { Header, PrivateRoute } from "./components/index";
import {CreateListing} from './pages/index';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
