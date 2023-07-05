import { View, FlatList } from "react-native";
import { useEffect, useState, useRef } from "react";
import { Day } from "../components/Day";
import { APIservice } from "../services/APIservice";

export default function HomePage() {
  const [teachings, setTeachings] = useState(null);
  const [openedTab, setOpenedTab] = useState(null);

  // Today's date (Format "MM/dd/yyyy")
  const date = new Date().toLocaleDateString("en-US");

  useEffect(() => {
    APIservice.getWeek(date).then((data) => {
      setTeachings(data);
      setOpenedTab(new Array(data.length).fill(false));
    });
  }, []);

  const ref = useRef(null);

  const openItem = (id) => {
    const tab = openedTab;

    // Close all other tabs
    for (let i = 0; i < tab.length; i++) {
      if (i === id) {
        tab[i] = !tab[i];
      } else {
        tab[i] = false;
      }
    }

    tab[id] == true ? ref.current.scrollToIndex({ animated: true, index: id }) : null;
    // now re render the flatlist
    setOpenedTab([...tab]);
  };

  return (
    <View>
      {openedTab && <FlatList ref={ref} data={teachings} renderItem={({ item, index }) => <Day teachings={item} id={index} opened={openedTab[index]} handleOpen={openItem} />} />}
    </View>
  );
}
