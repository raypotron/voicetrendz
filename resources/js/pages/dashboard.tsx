import { useState, useEffect } from "react";
import Home from "./welcome";
import SplashScreen from "./components/SplashScreen";


export default function Landing() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return loading ? <SplashScreen /> : <Home />;
}
