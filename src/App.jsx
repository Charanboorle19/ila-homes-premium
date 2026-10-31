import { useState, useEffect } from "react";
import FeaturedProperties from "./components/FeaturedProperties";
import Hero from "./components/Hero";
import PastPresentFuture from "./components/PastPresentFuture";
import PropertyMapExplorer from "./components/PropertyMapExplorer";
import ConnectivityExplorer from "./components/ConnectivityExplorer";
import ExploreDevelopments from "./components/ExploreDevelopments";
import CuratedCollections from "./components/CuratedCollections";
import HeroFooter from "./components/HeroFooter";
import PropertyDetailsPage from "./components/PropertyDetailsPage";
import DevelopmentsMapPage from "./components/DevelopmentsMapPage";
import LayoutProperties3DPage from "./components/LayoutProperties3DPage";
import AccountDashboardPage from "./components/AccountDashboardPage";
import PropertyListingPage from "./components/PropertyListingPage";
import PropertyDiscoveryPage from "./components/PropertyDiscoveryPage";

export default function App() {
  const [currentHash, setCurrentHash] = useState(() => window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Separate page route for property details
  if (currentHash === "#property-details") {
    return <PropertyDetailsPage />;
  }

  // Separate page route for property discovery & search
  if (
    currentHash === "#discover" ||
    currentHash === "#search" ||
    currentHash === "#property-discovery" ||
    currentHash === "#find"
  ) {
    return <PropertyDiscoveryPage />;
  }

  // Separate page route for developments & properties map explorer
  if (
    currentHash === "#properties" ||
    currentHash === "#developments" ||
    currentHash === "#developments-map"
  ) {
    return <DevelopmentsMapPage />;
  }

  // Separate page route for 3D Layout Properties
  if (
    currentHash === "#explore-developments-all" ||
    currentHash === "#3d-layout-properties" ||
    currentHash === "#explore-3d"
  ) {
    return <LayoutProperties3DPage />;
  }

  // Separate page route for My Account Dashboard / Sign In / Sign Up
  if (
    currentHash === "#account" ||
    currentHash === "#dashboard" ||
    currentHash === "#signin" ||
    currentHash === "#signup" ||
    currentHash === "#my-account"
  ) {
    return <AccountDashboardPage />;
  }

  // Separate page route for List Your Property
  if (
    currentHash === "#list-property" ||
    currentHash === "#list" ||
    currentHash === "#post-property"
  ) {
    return <PropertyListingPage />;
  }

  return (
    <main id="top">
      <Hero />
      <FeaturedProperties />
      <PropertyMapExplorer />
      <PastPresentFuture />
      <ConnectivityExplorer />
      <ExploreDevelopments />
      <CuratedCollections />
      <HeroFooter />
    </main>
  );
}



