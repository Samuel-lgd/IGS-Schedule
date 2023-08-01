import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { FlatList, Text, View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { startOfWeek, addDays, isToday, differenceInDays } from "date-fns";
import { Entypo } from "@expo/vector-icons";
import GS from "../styles/globalStyles";

const SCREEN_WIDTH = Dimensions.get("window").width;
const PADDING = 0;
let DATE_WIDTH = (SCREEN_WIDTH - PADDING * 2) / 7;
const DATE_MARGIN = 3;

// Objectif : Créer un composant qui permet de choisir une date
export default function DatePicker({ watchedWeek, handleSelectDate }) {
  const dateFlatList = useRef();
  const [currentWatchedWeek, setCurrentWatchedWeek] = useState(watchedWeek);

  const generateWeek = useCallback((date) => {
    let week = [];
    let weekDay = startOfWeek(date, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(weekDay);
      const isTodayDate = isToday(currentDate);

      week.push({
        date: currentDate,
        isToday: isTodayDate,
      });

      weekDay = addDays(weekDay, 1);
    }

    return week;
  }, []);

  const prependData = () => {
    const firstDate = week[0].date;
    const previousWeek = generateWeek(addDays(firstDate, -2));
    setWeek([...previousWeek, ...week]);
    dateFlatList.current.scrollToIndex({ animated: false, index: 7 });
  };

  // Génère des données lorsque l'on scroll en arrière
  const handleScroll = useCallback(
    (event) => {
      const distanceFromStart = event.nativeEvent.contentOffset;
      if (distanceFromStart.x === 0) prependData();
    },
    [prependData]
  );

  //
  useEffect(() => {
    if (currentWatchedWeek.toLocaleDateString("fr-FR") != watchedWeek.toLocaleDateString("fr-FR")) {
      setCurrentWatchedWeek(watchedWeek);
      goToDate(watchedWeek);
    }
  }, [watchedWeek]);

  const today = useMemo(() => new Date(), []);
  const lastWeek = useMemo(() => generateWeek(addDays(today, -7)), [generateWeek, today]);
  const currentWeek = useMemo(() => generateWeek(today), [generateWeek, today]);
  const [week, setWeek] = useState([...lastWeek, ...currentWeek]);
  const [firstVisibleItem, setFirstVisibleItem] = useState(7); // Index du premier élément visible
  const [todayIndex, setTodayIndex] = useState(0); // Index du jour actuel

  // Mets à jour l'index du jour lorsque l'on genère de nouvelles dates
  useEffect(() => {
    if (week.length === 0) return;
    setTodayIndex(week.findIndex((item) => item.isToday));
  }, [week]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (!viewableItems[0] || !viewableItems[0].item) return;
    const firstVisibleItem = viewableItems[0].item.date.toLocaleDateString("fr-FR", { month: "long" });
    setFirstVisibleItem(firstVisibleItem);
  });

  const goToDate = (date) => {
    const index = week.findIndex((item) => item.date.toLocaleDateString("fr-FR") === date.toLocaleDateString("fr-FR"));
    const offset = differenceInDays(date, startOfWeek(date, { weekStartsOn: 1 }));
    dateFlatList.current.scrollToIndex({ animated: true, index: index - offset });
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <View style={[GS.styles.spaceBetween, { marginHorizontal: 10, flexDirection: "row" }]}>
        {firstVisibleItem && <Text style={[{ fontFamily: "PoppinsBold", fontSize: 22, textTransform: "capitalize" }]}>{firstVisibleItem}</Text>}
        <TouchableOpacity onPress={() => goToDate(new Date())} style={[GS.styles.flex, { borderRadius: 10, backgroundColor: GS.colors.white }]}>
          <Text style={[GS.texts.p, GS.styles.flex]}>
            <Entypo name="calendar" size={16} color={GS.colors.text} /> Today
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={dateFlatList}
        horizontal={true}
        data={week}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={7}
        decelerationRate={0}
        snapToInterval={DATE_WIDTH * 7}
        contentContainerStyle={{ height: DATE_WIDTH * 1.5 }}
        onEndReachedThreshold={0.5}
        getItemLayout={(data, index) => ({ length: DATE_WIDTH, offset: DATE_WIDTH * index, index })}
        onViewableItemsChanged={onViewableItemsChanged.current}
        onEndReached={() => {
          const lastDate = week[week.length - 1].date;
          const nextWeek = generateWeek(addDays(lastDate, 1));
          setWeek([...week, ...nextWeek]);
        }}
        onScroll={handleScroll}
        keyExtractor={(item) => item.date.toString()} // Utiliser une clé unique
        windowSize={3} // Rendu optimisé
        renderItem={({ item, index }) => <DateItem date={item.date} isToday={todayIndex === index} handleSelect={handleSelectDate} />}
      />
    </View>
  );
}

function DateItem({ date, isToday, handleSelect }) {
  const weekDay = useMemo(() => date.toLocaleDateString("fr-FR", { weekday: "short" }).split(" ")[0], [date]);

  const day = useMemo(() => date.toLocaleDateString("fr-FR", { day: "numeric" }), [date]);

  return (
    <View style={[style.DateItemContainer, GS.styles.flex]}>
      <TouchableOpacity onPress={() => handleSelect(date)} style={[style.DateItem, GS.styles.flex, GS.styles.shadow, isToday ? style.border : null]}>
        <Text style={[GS.texts.p, { lineHeight: 15 }]}>{weekDay}</Text>
        <Text style={[GS.texts.title, { lineHeight: 25 }]}>{day}</Text>
        <View style={{ height: 7, backgroundColor: isToday ? GS.colors.HeaderText : null, width: "100%", position: "absolute", bottom: 0, left: 0 }}></View>
      </TouchableOpacity>
    </View>
  );
}

export const MemoizedDatePicker = React.memo(DatePicker);
const style = StyleSheet.create({
  DateItemContainer: {
    width: DATE_WIDTH - DATE_MARGIN * 2,
    margin: DATE_MARGIN,
    height: DATE_WIDTH * 1.2,
  },

  DateItem: {
    height: DATE_WIDTH,
    width: "100%",
    backgroundColor: GS.colors.white,
    borderRadius: 7,
    margin: 3,
    position: "relative",
    overflow: "hidden",
  },

  border: {
    borderWidth: 2,
    borderColor: GS.colors.HeaderText,
  },
});
