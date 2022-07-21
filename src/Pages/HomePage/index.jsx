import React, { Suspense } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Banner from "../../Components/Banner/Banner";
// import CoinsTable from "../../Components/CoinsTable"
const CoinsTable = React.lazy(() => import("../../Components/CoinsTable"));

const HomePage = () => {
  return (
    <div>
      <Banner />
      <Suspense fallback={<LinearProgress />}>
        <CoinsTable />
      </Suspense>
    </div>
  );
};

export default HomePage;
