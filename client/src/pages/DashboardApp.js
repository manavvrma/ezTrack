import { useEffect, useState, useCallback } from "react";
import { Navigate } from "react-router-dom";
import Page from "../components/Page";
import { Container, IconButton, Snackbar } from "@mui/material";
import AddNewTracker from "../components/AddNewTracker";
import AllTracks from "../components/AllTracks";
import "../components/styles/dashboardapp.css";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useUserData } from "@nhost/react";

const App = () => {
  const user = useUserData();

  // Logging the user data to check if it's correctly fetched
  console.log("User data:", user);

  const [items, setItems] = useState([]);
  const [toast, setToast] = useState({
    open: false,
    message: "",
  });

  // Wrapping getItems with useCallback to ensure stability
  const getItems = useCallback(async () => {
    try {
      console.log("Fetching items for user:", user.email); // Log the email being passed
      const { data } = await axios.get(`/api/tracks/user/${user.email}`);
      console.log("Received data:", data); // Log the response data
      setItems(data);
    } catch (error) {
      console.log("Error fetching items:", error); // Log any errors during the fetch
    }
  }, [user.email]); // Dependency on user.email to fetch correct data

  useEffect(() => {
    if (user) {
      console.log("User is available, calling getItems"); // Log when user is available
      getItems();
    }
  }, [user, toast, getItems]); // Now getItems is stable and can be added as a dependency

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() => setToast({ message: "", open: false })}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  if (!user) {
    console.log("No user, redirecting to login"); // Log if there's no user
    return <Navigate to="/" />;
  }

  return (
    <Page title="App">
      <Container>
        <AddNewTracker
          toast={setToast}
          className={items.length === 0 && `center`}
        />
        {items.length !== 0 && (
          <AllTracks items={items} setItems={setItems} toast={setToast} />
        )}
        <Snackbar
          open={toast.open}
          autoHideDuration={6000}
          onClose={() => setToast({ message: "", open: false })}
          message={toast.message}
          action={action}
        />
      </Container>
    </Page>
  );
};

export default App;

// import { useUserData } from "@nhost/react"; // Use Nhost's hook to get user data
// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import Page from "../components/Page";
// import { Container, IconButton, Snackbar } from "@mui/material";
// import AddNewTracker from "../components/AddNewTracker";
// import AllTracks from "../components/AllTracks";
// import "../components/styles/dashboardapp.css";
// import CloseIcon from "@mui/icons-material/Close";
// import axios from "axios";

// const App = () => {
//   const user = useUserData(); // Fetching user data from Nhost
//   const [items, setItems] = useState([]);
//   const [toast, setToast] = useState({
//     open: false,
//     message: "",
//   });

//   useEffect(() => {
//     if (user) {
//       getItems(); // Fetch items only if user is available
//     }
//   }, [user, toast]);

//   const getItems = async () => {
//     try {
//       const { data } = await axios.get(`/api/tracks/user/${user.email}`);
//       setItems(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const action = (
//     <IconButton
//       size="small"
//       aria-label="close"
//       color="inherit"
//       onClick={() => setToast({ message: "", open: false })}
//     >
//       <CloseIcon fontSize="small" />
//     </IconButton>
//   );

//   if (!user) {
//     return <Navigate to="/" />; // Redirect to login if no user
//   }

//   return (
//     <Page title="App">
//       <Container>
//         <AddNewTracker
//           toast={setToast}
//           className={items.length === 0 && `center`}
//         />
//         {items.length !== 0 && (
//           <AllTracks items={items} setItems={setItems} toast={setToast} />
//         )}
//         <Snackbar
//           open={toast.open}
//           autoHideDuration={6000}
//           onClose={() => setToast({ message: "", open: false })}
//           message={toast.message}
//           action={action}
//         />
//       </Container>
//     </Page>
//   );
// };

// export default App;
