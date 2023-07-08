import { View, FlatList, Dimensions } from "react-native";
import { useEffect, useState, useRef, memo } from "react";
import { Day, LoadingDay } from "../components/Day";
import { APIservice } from "../services/APIservice";
import GS from "../styles/globalStyles";
import DatePicker from "../components/DatePicker";
import { set } from "date-fns";

const MemoizedDatePicker = memo(DatePicker);

export default function HomePage() {
  const [teachings, setTeachings] = useState(null);
  const [openedTab, setOpenedTab] = useState(null);

  // Today's date (Format "MM/dd/yyyy")
  const date = new Date().toLocaleDateString("en-US");

  // Get data
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
        // On change le status de la carte cliquée
        tab[i] = !tab[i];
        // Si la carte est ouverte, on scroll jusqu'à elle
        if (tab[i] === true) {
          ref.current.scrollToIndex({ animated: true, index: id });
        }
        // On met a jour les données pour que le FlatList se re-renders
        setOpenedTab([...tab]);
      }
    }
  };

  return (
    <View style={{ height: Dimensions.get("window").height }}>
      <MemoizedDatePicker />
      {!teachings && <FlatList ref={ref} data={[1, 2, 3, 4, 5]} scrollEnabled={false} renderItem={() => <LoadingDay />} />}

      {openedTab && <FlatList ref={ref} data={teachings} renderItem={({ item, index }) => <Day teachings={item} id={index} opened={openedTab[index]} handleOpen={openItem} />} />}
    </View>
  );
}
