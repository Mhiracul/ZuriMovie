import { useState } from "react";
import MovieList from "../MovieList";
import Footer from "../component/Footer";
import Banner from "../component/Banner";

const Home = () => {
  const [notification, setNotification] = useState(null);

  return (
    <div>
      {notification && <div className="notification">{notification}</div>}
      <Banner setNotification={setNotification} />
      <MovieList
        setNotification={setNotification}

        // Pass movies as a prop
      />
      <Footer />
    </div>
  );
};

export default Home;
