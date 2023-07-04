import React from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback, Animated } from "react-native";
import { useState, useEffect, useRef } from "react";
import GS from "../styles/globalStyles";

export const Day = ({ teachings, id, opened, handleOpen }) => {
  // Get the date of the day
  const date = Object.keys(teachings)[0];
  const dayTeachings = teachings[date];

  // Format the date to FR format mm/dd/yyyy => "dd/mm/yyyy"
  const options = { weekday: "long", day: "numeric", month: "long" };
  const formattedDate = new Date(date.split("/").reverse().join("-")).toLocaleDateString("fr-FR", options);
  const [weekday, day, month] = formattedDate.split(" ");

  // const [opened, setOpened] = useState(false);

  const zoom = useRef(new Animated.Value(1)).current;
  const height = useRef(new Animated.Value(GS.heights.cumulativeCardHeight)).current;
  const margin = 40; // Espacement entre les cartes fermées

  const onPress = () => {
    Animated.timing(zoom, {
      toValue: 0.91,
      duration: 110,
      useNativeDriver: false,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(zoom, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    // Animation de la hauteur du jour (pousse les autres vers le bas)
    if (opened) {
      Animated.timing(height, {
        toValue: GS.heights.cumulativeCardHeight * (dayTeachings.length + 1),
        duration: 250,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(height, {
        toValue: GS.heights.cumulativeCardHeight + margin,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  }, [opened]);

  return (
    <Animated.View style={{ transform: [{ scale: zoom }], padding: GS.layout.contentPadding, height: height }}>
      <TouchableWithoutFeedback onPressIn={() => onPress()} onPressOut={() => onPressOut()} onPress={() => handleOpen(id)}>
        <View style={style.cardDay}>
          <Text style={{ textTransform: "capitalize" }}>{[weekday + " " + day + " " + month]}</Text>
        </View>
      </TouchableWithoutFeedback>

      {dayTeachings.map((teaching, i) => (
        <Teaching teaching={teaching} key={i} pos={i + 1} maxPos={dayTeachings.length} opened={opened} />
      ))}
    </Animated.View>
  );
};

export const Teaching = ({ teaching, pos, opened, maxPos }) => {
  const scaleFactor = 0.98; // Facteur d'échelle initial de la première carte arrière
  const scaleDifference = 0.07; // Différence de facteur d'échelle entre les cartes
  const cardOffset = 7; // Décalage entre les cartes
  const cardOut = -5; // Dépassage des cartes arrières en dessous de la carte principale
  const cardOpacity = 0.5; // Opacité des cartes arrières

  const calculateScale = (pos) => {
    return scaleFactor - (pos - 1) * scaleDifference;
  };

  // Animation de la carte, valeurs par défaut > carte fermée
  const posY = useRef(new Animated.Value(GS.layout.cardHeight * pos - cardOffset * pos - cardOut)).current;
  const scale = useRef(new Animated.Value(calculateScale(pos))).current;
  const opacity = useRef(new Animated.Value(cardOpacity)).current;
  const duration = 300;

  // Animation trigger
  useEffect(() => {
    if (!opened) {
      // Fermeture de la carte
      Animated.timing(posY, {
        toValue: GS.layout.cardHeight * pos - cardOffset * pos - cardOut,
        duration: duration,
        useNativeDriver: false,
      }).start();

      Animated.timing(scale, {
        toValue: calculateScale(pos),
        duration: duration,
        useNativeDriver: false,
      }).start();

      Animated.timing(opacity, {
        toValue: cardOpacity,
        duration: duration,
        useNativeDriver: false,
      }).start();
    } else {
      // Ouverture de la carte
      Animated.timing(posY, {
        toValue: 0,
        duration: duration,
        useNativeDriver: false,
      }).start();

      Animated.timing(scale, {
        toValue: 1,
        duration: duration,
        delay: (75 * pos) / 2, // Délai entre chaque carte
        useNativeDriver: false,
      }).start();

      Animated.timing(opacity, {
        toValue: 1,
        duration: duration / 2,
        delay: (100 * pos) / 2,
        useNativeDriver: false,
      }).start();
    }
  }, [opened]);

  console.log("pos", pos, "maxPos", maxPos);

  return (
    <Animated.View
      style={[
        style.cardTeaching,
        {
          opacity: opacity,
          transform: [{ scale: scale }],
          bottom: posY,
          zIndex: -pos,
          borderBottomRightRadius: opened ? (pos === 1 ? GS.layout.bordelSmallRadius : GS.layout.borderRadius) : GS.layout.borderRadius,
          borderBottomLeftRadius: opened ? (pos === 1 ? GS.layout.bordelSmallRadius : GS.layout.borderRadius) : GS.layout.borderRadius,
          borderTopLeftRadius: pos === maxPos ? GS.layout.bordelSmallRadius : GS.layout.borderRadius,
          borderTopRightRadius: pos === maxPos ? GS.layout.bordelSmallRadius : GS.layout.borderRadius,
        },
      ]}
    >
      <Text>{teaching.name}</Text>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  cardDay: {
    height: GS.layout.cardHeight,
    padding: GS.layout.innerPadding,
    marginBottom: GS.layout.margin,
    borderRadius: GS.layout.borderRadius,
    backgroundColor: GS.colors.white,
  },

  cardTeaching: {
    height: GS.layout.cardHeight,
    padding: GS.layout.innerPadding,
    margin: GS.layout.margin,
    marginTop: 0,
    marginBottom: GS.layout.margin / 2,
    borderRadius: GS.layout.borderRadius,
    backgroundColor: GS.colors.white,
  },
});
