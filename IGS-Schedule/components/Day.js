import React from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback, Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";
import GS from "../styles/globalStyles";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export const LoadingDay = () => {
  const data = ["Loading... ", "Loading..."];
  return (
    <View style={{ padding: GS.layout.contentPadding, marginBottom: 16 }}>
      <View style={[style.cardDay, GS.styles.shadow]}>
        {/* Card Name */}
        <View style={[GS.styles.spaceBetween, { flexDirection: "row", marginBottom: 5 }]}>
          <Text style={GS.texts.title}>Loading...</Text>
          <View style={[GS.styles.shadow, style.button]}>
            <Entypo name="chevron-down" size={24} color={GS.colors.blackOpacity20} />
          </View>
        </View>
        {/* Card Content */}
        <View style={{ flex: 1, display: "flex", flexDirection: "row", gap: 10 }}>
          <View style={{ display: "flex", justifyContent: "center", gap: 5, justifyContent: "flex-end" }}>
            {data.map((d, i) => (
              <View
                style={[
                  {
                    borderTopRightRadius: i === 0 ? 10 : 10 / 3,
                    borderTopLeftRadius: i === 0 ? 10 : 10 / 3,
                    borderBottomLeftRadius: i === 1 ? 10 : 10 / 3,
                    borderBottomRightRadius: i === 1 ? 10 : 10 / 3,
                    flexDirection: "row",
                    backgroundColor: GS.colors.eventColorsLight[i],
                    overflow: "hidden",
                  },
                ]}
                key={i}
              >
                <View style={[{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", height: 30 }]}>
                  {/* Barre colorée  */}
                  <View style={[style.bar, { backgroundColor: GS.colors.eventColors[i] }]}></View>
                  <Text key={i} numberOfLines={1} style={[GS.texts.p, { width: "100%", padding: 5 }]}>
                    {d}
                  </Text>
                </View>
                {/* <Text style={[GS.texts.p, { color: GS.colors.textOpacity }]}>{teaching.classroom}</Text> */}
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export const Day = ({ teachings, id, opened, handleOpen }) => {
  // Get the date of the day
  const date = Object.keys(teachings)[0];
  const dayTeachings = teachings[date];
  const todayDate = new Date().toLocaleDateString("fr-FR");
  const isToday = date == todayDate;

  // Format the date to FR format mm/dd/yyyy => "dd/mm/yyyy"
  const options = { weekday: "long", day: "numeric", month: "long" };
  const formattedDate = new Date(date.split("/").reverse().join("-")).toLocaleDateString("fr-FR", options);
  const [weekday, day, month] = formattedDate.split(" ");

  const zoomDepth = 0.9;
  const zoomDuration = 150;
  const margin = 40; // Espacement entre les cartes fermées
  const spinValue = useRef(new Animated.Value(0)).current;
  const zoom = useRef(new Animated.Value(1)).current;
  const height = useRef(new Animated.Value(GS.heights.cumulativeCardHeight + margin)).current;

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const generateColor = (name) => {
    if (!name) return "#000000";
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash += name.charCodeAt(i);
    }
    return hash % GS.colors.eventColors.length;
  };

  const teachingsLength = dayTeachings.length - 1;
  const teachingRadius = 10;

  const onPress = () => {
    Animated.timing(zoom, {
      toValue: zoomDepth,
      duration: zoomDuration,
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
      // Ouverture
      Animated.timing(height, {
        toValue: GS.heights.cumulativeCardHeight * (dayTeachings.length + 1),
        duration: 250,
        useNativeDriver: false,
      }).start();
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }).start();
      Animated.timing(zoom, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      //Fermeture
      Animated.timing(height, {
        toValue: GS.heights.cumulativeCardHeight + margin,
        duration: 250,
        useNativeDriver: false,
      }).start();
      Animated.timing(spinValue, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
      Animated.timing(zoom, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [opened]);

  return (
    <Animated.View style={{ transform: [{ scale: zoom }], padding: GS.layout.contentPadding, height: height }}>
      <TouchableWithoutFeedback onPressIn={() => onPress()} onPressOut={() => onPressOut()} onPress={() => handleOpen(id)}>
        <View style={[style.cardDay, GS.styles.shadow]}>
          {/* Card Name */}
          <View style={[GS.styles.spaceBetween, { flexDirection: "row", marginBottom: 5 }]}>
            <Text style={[GS.texts.title, { textTransform: "capitalize" }]}>{isToday ? "Aujourd'hui" : [weekday + " " + day + " " + month]}</Text>
            <View style={[GS.styles.shadow, style.button]}>
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <Entypo name="chevron-down" size={24} color={GS.colors.blackOpacity20} />
              </Animated.View>
            </View>
          </View>
          {/* Card Content */}
          <View style={{ flex: 1, display: "flex", flexDirection: "row", gap: 10 }}>
            <View style={{ display: "flex", justifyContent: "center", gap: 5, justifyContent: "flex-end" }}>
              {dayTeachings.map((teaching, i) => (
                <View
                  style={[
                    {
                      borderTopRightRadius: i === 0 ? teachingRadius : teachingRadius / 3,
                      borderTopLeftRadius: i === 0 ? teachingRadius : teachingRadius / 3,
                      borderBottomLeftRadius: i === teachingsLength ? teachingRadius : teachingRadius / 3,
                      borderBottomRightRadius: i === teachingsLength ? teachingRadius : teachingRadius / 3,
                      flexDirection: "row",
                      backgroundColor: GS.colors.eventColorsLight[generateColor(teaching.id)],
                      overflow: "hidden",
                    },
                  ]}
                  key={i}
                >
                  <View style={[{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", height: 30 }]}>
                    {/* Barre colorée  */}
                    <View style={[style.bar, { backgroundColor: GS.colors.eventColors[generateColor(teaching.id)] }]}></View>
                    <Text key={i} numberOfLines={1} style={[GS.texts.p, { width: "100%", padding: 5 }]}>
                      {teaching.name}
                    </Text>
                  </View>
                  {/* <Text style={[GS.texts.p, { color: GS.colors.textOpacity }]}>{teaching.classroom}</Text> */}
                </View>
              ))}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {dayTeachings.map((teaching, i) => (
        <Teaching teaching={teaching} colorIndex={generateColor(teaching.id)} key={i} pos={i + 1} maxPos={dayTeachings.length} opened={opened} />
      ))}
    </Animated.View>
  );
};

export const Teaching = ({ teaching, pos, opened, maxPos, colorIndex }) => {
  const scaleFactor = 0.98; // Facteur d'échelle initial de la première carte arrière
  const scaleDifference = 0.07; // Différence de facteur d'échelle entre les cartes
  const cardOffset = 7; // Décalage entre les cartes
  const cardOut = -5; // Dépassage des cartes arrières en dessous de la carte principale
  const cardOpacity = 0.5; // Opacité des cartes arrières

  // réduit la taille des cartes plus elles sont éloignées
  const calculateScale = (pos) => {
    return scaleFactor - (pos - 1) * scaleDifference;
  };

  // Animation de la carte, valeurs par défaut > carte fermée
  const posY = useRef(new Animated.Value(GS.layout.cardHeight * pos - cardOffset * pos - cardOut)).current;
  const scale = useRef(new Animated.Value(calculateScale(pos))).current;
  const opacity = useRef(new Animated.Value(cardOpacity)).current;
  const duration = 300;

  // Valeurs pour animer la barre à gauche
  const lineRange = useRef(new Animated.Value(0)).current;
  const lineHeight = lineRange.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "120%"],
  });

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

      Animated.timing(lineRange, {
        toValue: 0,
        duration: 150,
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
      Animated.timing(lineRange, {
        toValue: 1,
        delay: 150 + 200 * (pos - 1),
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [opened]);

  return (
    <Animated.View
      style={[
        style.cardTeaching,
        GS.styles.shadow,
        {
          backgroundColor: GS.colors.white,
          borderColor: GS.colors.white,
          opacity: opacity,
          transform: [{ scale: scale }],
          bottom: posY,
          zIndex: -pos,
        },
      ]}
    >
      {/* Barre */}
      <Animated.View style={[GS.styles.absolute, { height: lineHeight, width: 8, borderRadius: 10, backgroundColor: GS.colors.eventColors[colorIndex] }]} />
      {/* Content */}
      <View style={{ marginLeft: 5 }}>
        {/* TITLE */}
        <Text style={[GS.texts.subtitle]} numberOfLines={2}>
          <Text style={[GS.texts.subtitle]}>{teaching.name}</Text>
          <Text style={[GS.texts.subtitle]}> - {teaching.id}</Text>
        </Text>
        <View style={{ flex: 1 }}></View>

        {/* Teaching infos */}
        <View style={style.alignIcon}>
          <Feather name="map-pin" size={15} color={GS.colors.text} style={style.icon} />
          <Text style={GS.texts.p}>{teaching.place == "DISTANCIEL" ? "DISTANCIEL" : teaching.classroom + " (" + teaching.place + ")"}</Text>
        </View>
        <View style={style.alignIcon}>
          <FontAwesome5 name="user" size={15} color={GS.colors.text} style={style.icon} />
          <Text style={[GS.texts.p, { textTransform: "capitalize" }]}>{teaching.teacher}</Text>
        </View>
        <View style={style.alignIcon}>
          <FontAwesome5 name="clock" size={15} color={GS.colors.text} style={style.icon} />
          <Text style={GS.texts.p}>
            {teaching.startTime} - {teaching.endTime}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  cardDay: {
    height: GS.layout.cardHeight,
    padding: GS.layout.contentPadding,
    marginBottom: GS.layout.margin,
    borderRadius: GS.layout.borderRadius,
    backgroundColor: GS.colors.white,
  },

  cardTeaching: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    height: GS.layout.cardHeight,
    padding: GS.layout.innerPadding / 2,
    margin: GS.layout.margin,
    marginTop: 0,
    marginBottom: GS.layout.margin / 2,
    borderRadius: GS.layout.borderRadius,
    backgroundColor: GS.colors.white,
    overflow: "hidden",
  },

  bar: {
    width: 5,
    height: "100%",
  },

  button: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: GS.colors.white,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  alignIcon: {
    display: "flex",
    alignItems: "center",
    height: 20,
    flexDirection: "row",
    marginBottom: 3,
  },

  icon: {
    width: 22,
    display: "flex",
    justifyContent: "center",
  },
});
