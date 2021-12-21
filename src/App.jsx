import logo from "./logo.svg";
import { GiphyFetch } from "@giphy/js-fetch-api";
import NameForm from "./components/NameForm";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);
  const fetchGifs = (search) => gf.search(search, { limit: 1 });
  const [name, setName] = useState("");
  const [image, setImage] = useState({});
  const [notification, setNotification] = useState("");

  const handleNotification = (message) => {
    if (message) {
      setNotification(message);
      setTimeout(() => {
        setNotification("");
      }, 5000);
    }
  };

  const handleSubmit = async () => {
    if (name) {
      setImage("");
      const nameGify = await fetchGifs(name);

      try {
        if ((nameGify.meta.status = 200)) {
          if (nameGify.data.length >= 1) {
            setImage({
              url: nameGify.data[0].images.original.url,
              width: nameGify.data[0].images.original.width,
              height: nameGify.data[0].images.original.height,
            });
          } else {
            handleNotification("we cant fount anything about this name");
          }
        } else {
          handleNotification("something went wrong");
        }
      } catch (error) {
        handleNotification("You Out Of Internet");
      }
    } else {
      handleNotification("please dont leave your name field empty");
    }
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <>
        <AnimatePresence exitBeforeEnter>
          {notification && (
            <motion.div
              initial={{ y: "-36px" }}
              animate={{ y: 0 }}
              exit={{ y: "-36px" }}
              className="absolute top-0 left-0 right-0 h-10 k text-center leading-10 text-white font-light text-lg bg-gradient-to-r from-red-500 to-pink-500 capitalize"
            >
              {notification}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="container mx-auto pt-20"
        >
          <h1 className="text-center text-white font-black text-5xl">GiphiT</h1>
          <p className="text-center text-slate-300 mt-4 font-medium">
            Type Your Name And Lets See What Will Appear
          </p>
          <div className="flex flex-col gap-5 items-center mt-24">
            <NameForm
              name={name}
              setName={setName}
              handleSubmit={handleSubmit}
            />
            {Object.keys(image).length == 3 && (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={image.url}
                width={image.width}
                height={image.height}
              />
            )}
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}

export default App;
