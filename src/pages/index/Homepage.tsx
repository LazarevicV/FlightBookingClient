import { useNavigate } from "@tanstack/react-router";
import { PageSection } from "../PageSection";
import FlightForm from "./components/FlightForm";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

function Homepage() {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  // console.log(isAuth);

  useEffect(() => {
    if (!isAuth) {
      navigate({ to: "/login" });
    }
  }, [isAuth]);

  return (
    <div className="mb-5">
      <h1>Homepage</h1>
      <FlightForm />
    </div>
  );
}

export default Homepage;
