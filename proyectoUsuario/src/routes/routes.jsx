import { createBrowserRouter} from "react-router-dom";
import { App } from "../App";

import { ChangePassword, CheckCode, Dashboard, FormProfile, Login, Profile,ForgotPassword, Home  } from "../pages";
import { Register } from "../pages/Register/Register";
import { Protected } from "../components/ProtectedRoute/Protected";
import ProtectedCheckChildren from "../components/ProtectedRoute/ProtectedCheckChildren";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    
      ,
      {
        path: "/register",
        element: <Register />,
      },
      ,
      {
        path: "/login",
        element: <Login />,
      },
   
      {
        path: "/dashboard",
        element: (
          <Protected>
            <Dashboard />
          </Protected>
        ),
      },
     
      {
        path: "/profile",
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
        children: [
          {
            path: "/profile/changePassword",
            element: (
              <Protected>
                <ChangePassword />
              </Protected>
            ),
          },
          {
            path: "/profile/",
            element: (
              <Protected>
                <FormProfile />
              </Protected>
            ),
          },
        ],
      },
      {
        path: "/forgotPassword",
        element: <ForgotPassword />,
      },

      {
        path: "/verifyCode",
        element: 
        //primero pasa por el componente padre y accede al hijo si cumple
        <ProtectedCheckChildren>
        <CheckCode />
      </ProtectedCheckChildren>
        
      },
    ],
  },
  
]);

