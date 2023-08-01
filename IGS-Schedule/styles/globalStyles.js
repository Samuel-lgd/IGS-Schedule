import { StyleSheet } from "react-native";

const colors = {
  white: "#FFFFFF",
  black: "#000000",
  blackOpacity20: "rgba(0, 0, 0, 0.6)",
  HeaderText: "#343a82",
  HeaderText20: "rgba(52, 58, 130, 0.2)",
  text: "#4b4364",
  textOpacity: "#3a354a99",
  eventColors: [
    "rgb(255, 99, 132)",
    "rgb(54, 162, 235)",
    "rgb(237, 213, 116)",
    "rgb(75, 192, 192)",
    "rgb(255, 159, 64)",
    "rgb(153, 102, 255)",
    "rgb(240, 128, 128)", // Nouvelle couleur
    "rgb(135, 206, 235)", // Nouvelle couleur
    "rgb(255, 215, 0)", // Nouvelle couleur
    "rgb(109, 209, 128)",
  ],
  eventColorsLight: [
    "rgba(255, 99, 132, 0.4)",
    "rgba(54, 162, 235, 0.4)",
    "rgba(237, 213, 116, 0.4)",
    "rgba(75, 192, 192, 0.4)",
    "rgba(255, 159, 64, 0.4)",
    "rgba(153, 102, 255, 0.4)",
    "rgba(240, 128, 128, 0.4)", // Nouvelle couleur
    "rgba(135, 206, 235, 0.4)", // Nouvelle couleur
    "rgba(255, 215, 0, 0.4)", // Nouvelle couleur
    "rgba(109, 209, 128, 0.4)",
  ],
};

const texts = {
  title: {
    fontSize: 20,
    fontFamily: "PoppinsBold",
    color: colors.HeaderText,
  },

  subtitle: {
    fontSize: 15,
    fontFamily: "PoppinsBold",
    color: colors.text,
  },

  p: {
    fontSize: 13,
    fontFamily: "Poppins",
    color: colors.text,
  },
};

const layout = {
  contentPadding: 15,
  innerPadding: 20,
  margin: 10,
  borderRadius: 20,
  bordelSmallRadius: 7,
  cardHeight: 145,
};

const heights = {
  cumulativeCardHeight: layout.cardHeight + layout.margin * 2,
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

    elevation: 6,
  },

  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});

const GS = { colors, texts, layout, heights, styles };

export default GS;

// export default { Colors, fonts, layout };
