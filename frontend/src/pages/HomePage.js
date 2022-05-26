import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

// components
import TopMenu from "../components/TopHeader/TopMenu";
import NavigationMenu from "../components/TopHeader/Navigation/NavigationMenu";
import ShowCustomer from "../components/HomeComponent/ShowCustomer";
import Footer from "../components/Footer";

function HomePage() {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    console.log("currentUser: ", currentUser);
    return <Redirect to="/" />;
  }

  return (
    <div>
      <TopMenu />
      <NavigationMenu />
      <ShowCustomer />
      <Footer />
    </div>
  );
}

export default HomePage;
