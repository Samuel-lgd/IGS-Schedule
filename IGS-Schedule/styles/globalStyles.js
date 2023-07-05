import { StyleSheet } from "react-native";

const colors = {
  // background: "linear-gradient(50deg, rgb(85, 63, 181) 0%, rgb(56, 72, 161) 100%)",
  background: "rgb(56, 72, 161)",
  primary: "#3F51B5",
  secondary: "#FF4081",
  white: "#FFFFFF",
  grey: "#F5F5F5",
  whiteOpacity80: "rgba(255, 255, 255, 0.7)",
  whiteOpacity90: "rgba(255, 255, 255, 0.8)",
  black: "#000000",
  blackOpacity20: "rgba(0, 0, 0, 0.6)",
  HeaderText: "#343a82",
  text: "#4b4364",
  textOpacity: "#3a354a99",
};

const texts = {
  title: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
    color: colors.HeaderText,
  },

  p: {
    fontSize: 12,
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
  cardHeight: 150,
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
});

const GS = { colors, texts, layout, heights, styles };

export default GS;

// export default { Colors, fonts, layout };
