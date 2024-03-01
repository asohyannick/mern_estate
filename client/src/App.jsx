import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  SignIn,
  SignUp,
  About,
  Profile,
  CreateListing,
  UpdateListing,
  Listing,
} from "./pages/index";
import { Header, PrivateRoute } from "./components/index";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:listingId" element={<Listing />}/>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />}/>
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
