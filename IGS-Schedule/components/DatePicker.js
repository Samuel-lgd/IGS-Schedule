import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { FlatList, Text, View, Dimensions } from "react-native";
import { startOfWeek, addDays, isToday, set } from "date-fns";
import GS from "../styles/globalStyles";

const SCREEN_WIDTH = Dimensions.get("window").width;
const DATE_WIDTH = SCREEN_WIDTH / 7;

// Objectif : Créer un composant qui permet de choisir une date
export default function DatePicker() {
  console.log("render DatePicker");
  const dateFlatList = useRef();

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

  const handleScroll = useCallback(
    (event) => {
      const distanceFromStart = event.nativeEvent.contentOffset;
      if (distanceFromStart.x === 0) prependData();
    },
    [prependData]
  );

  const today = useMemo(() => new Date(), []);
  const lastWeek = useMemo(() => generateWeek(addDays(today, -7)), [generateWeek, today]);
  const currentWeek = useMemo(() => generateWeek(today), [generateWeek, today]);
  const [week, setWeek] = useState([...lastWeek, ...currentWeek]);

  return (
    <View>
      <FlatList
        ref={dateFlatList}
        horizontal={true}
        data={week}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={7}
        decelerationRate={0}
        snapToInterval={DATE_WIDTH * 7}
        onEndReachedThreshold={0.5}
        getItemLayout={(data, index) => ({ length: DATE_WIDTH, offset: DATE_WIDTH * index, index })}
        onEndReached={() => {
          const lastDate = week[week.length - 1].date;
          const nextWeek = generateWeek(addDays(lastDate, 1));
          setWeek([...week, ...nextWeek]);
        }}
        onScroll={handleScroll}
        keyExtractor={(item, index) => item.date.toString()} // Utiliser une clé unique
        windowSize={3} // Rendu optimisé
        renderItem={({ item }) => <DateItem date={item.date} isToday={item.isToday} />}
      />
    </View>
  );
}

function DateItem({ date, isToday }) {
  console.log("render DateItem");
  const weekDay = useMemo(() => date.toLocaleDateString("fr-FR", { weekday: "short" }).split(" ")[0], [date]);

  const month = useMemo(() => date.toLocaleDateString("fr-FR", { month: "short" }), [date]);

  const day = useMemo(() => date.toLocaleDateString("fr-FR", { day: "numeric" }), [date]);

  return (
    <View style={[GS.styles.flex, { width: DATE_WIDTH }]}>
      <Text style={[GS.texts.p]}>{weekDay}</Text>
      <Text style={[GS.texts.title]}>{day}</Text>
      <Text style={[GS.texts.p]}>{month}</Text>
    </View>
  );
}
