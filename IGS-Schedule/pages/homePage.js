import { Text, View, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
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
      const tab = new Array(data.length).fill(false);
      setOpenedTab(tab);
    });
  }, []);

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
    // now re render the flatlist
    setOpenedTab([...tab]);
  };

  return (
    <View>{openedTab && <FlatList data={teachings} renderItem={({ item, index }) => <Day teachings={item} id={index} opened={openedTab[index]} handleOpen={openItem} />} />}</View>
  );
}
