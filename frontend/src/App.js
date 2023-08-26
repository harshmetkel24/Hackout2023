import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, AllocationPage } from "./pages";
import { UserContextProvider } from "./UserContext";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/allocation" element={<AllocationPage />} />
          {/* <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/myproblems" element={<MyProblemsPage />} />
          <Route path="/SingleProblem/:id" element={<SingleProblem />} />
          <Route path="/addProblem" element={<AddProblemForm />} />
          <Route path="/AllSubmissions/:id" element={<AllSubmissionPage />} /> */}
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
