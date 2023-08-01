import { View, Text, FlatList, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState, useRef } from "react";
import { Day, LoadingDay } from "../components/Day";
import { APIservice } from "../services/APIservice";
import { addDays, addWeeks, parseISO, differenceInDays, startOfWeek, add } from "date-fns";
import GS from "../styles/globalStyles";
import { MemoizedDatePicker } from "../components/DatePicker";

export default function HomePage() {
  const [teachings, setTeachings] = useState(null);
  const [teachingsDates, setTeachingsDates] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [loading, setLoading] = useState({ prevWeek: false, nextWeek: false });

  // Today's date (Format "MM/dd/yyyy")
  const [date, setDate] = useState(new Date());

  // Get data
  useEffect(() => {
    APIservice.getWeek(date.toLocaleDateString("fr-FR")).then((data) => {
      setTeachings(data);
      let tab = [];
      data?.forEach((item) => {
        tab.push(Object.keys(item)[0]);
      });
      setTeachingsDates(tab);
    });
  }, []);

  const loadNextWeek = () => {
    if (loading.nextWeek) return;
    setLoading({ ...loading, nextWeek: true });
    const newDate = addWeeks(date, 1);
    APIservice.getWeek(newDate.toLocaleDateString("fr-FR")).then((data) => {
      setTeachings((prev) => [...prev, ...data]);
      let tab = [];
      data?.forEach((item) => {
        tab.push(Object.keys(item)[0]);
      });
      setTeachingsDates(tab);
      setDate(newDate);
      setLoading({ ...loading, nextWeek: false });
    });
  };

  const loadPrevWeek = () => {
    if (loading.prevWeek) return;
    setLoading({ ...loading, prevWeek: true });
    const newDate = addWeeks(date, -1);
    APIservice.getWeek(newDate.toLocaleDateString("fr-FR")).then((data) => {
      setTeachings((prev) => [...data, ...prev]);
      let tab = [];
      let newValues = 0;
      data?.forEach((item) => {
        tab.push(Object.keys(item)[0]);
        newValues++;
      });
      setTeachingsDates((prev) => [...tab, ...prev]);
      setDate(newDate);
      setLoading({ ...loading, prevWeek: false });

      // Animation pour laisser l'utilisateur au bon index
      const offset = newValues * (GS.heights.cumulativeCardHeight + 40);
      setTimeout(() => {
        flatListRef.current.scrollToOffset({ animated: false, offset: offset });
        setTimeout(() => {
          flatListRef.current.scrollToIndex({ animated: true, index: 0 });
        }, 500);
      }, 0);
    });
  };

  const flatListRef = useRef(null);
  const currentWeekRef = useRef(currentWeek);

  useEffect(() => {
    currentWeekRef.current = currentWeek;
  }, [currentWeek]);

  const FlatListViewableItemsChanged = useRef(({ viewableItems }) => {
    if (!viewableItems[1] || !viewableItems[1].item) return;
    const key = Object.keys(viewableItems[1].item);
    const parsedDate = parseISO(key[0].split("/").reverse().join("-"));
    const startWeek = startOfWeek(parsedDate, { weekStartsOn: 1 });
    if (startWeek.toLocaleDateString("fr-FR") !== currentWeekRef.current.toLocaleDateString("fr-FR")) {
      setCurrentWeek(startWeek);
    }
  });

  const scrollToDayIndex = (id) => {
    flatListRef.current.scrollToIndex({ animated: true, index: id });
  };

  const onSelectDatePiker = (date) => {
    const formattedDate = date.toLocaleDateString("fr-FR");
    for (let i = 0; i < teachingsDates.length; i++) {
      if (formattedDate === teachingsDates[i]) {
        scrollToDayIndex(i);
        return;
      }
    }
  };

  return (
    <View style={{ height: Dimensions.get("window").height }}>
      {!teachings && <FlatList data={[1, 2, 3, 4, 5]} scrollEnabled={false} renderItem={() => <LoadingDay />} />}
      {teachings && (
        <FlatList
          ref={flatListRef}
          data={teachings}
          initialScrollIndex={1}
          initialNumToRender={teachings.length}
          onViewableItemsChanged={FlatListViewableItemsChanged.current}
          renderItem={({ item, index }) => <Day teachings={item} scrollToIndex={scrollToDayIndex} id={index} />}
          onEndReached={() => loadNextWeek()}
          ListHeaderComponent={
            <TouchableOpacity style={styles.loadPrevWeek} onPress={() => loadPrevWeek()}>
              <Text style={[GS.texts.subtitle, styles.loadPrevWeekText]}>Charger la semaine précéndente</Text>
            </TouchableOpacity>
          }
          ListFooterComponent={loading.nextWeek ? <LoadingDay loading={true} /> : <View style={{ height: 100 }} />}
        />
      )}
      <View style={styles.datePickerContainer}>
        <MemoizedDatePicker watchedWeek={currentWeek} handleSelectDate={onSelectDatePiker} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  datePickerContainer: {
    backgroundColor: GS.colors.white,
  },

  loadPrevWeek: {
    alignItems: "center",
    padding: GS.layout.contentPadding,
    marginBottom: 10,
  },

  loadPrevWeekText: {
    padding: 15,
    width: "100%",
    textAlign: "center",
    borderRadius: GS.layout.borderRadius,
    backgroundColor: GS.colors.white,
  },
});
