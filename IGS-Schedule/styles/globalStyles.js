import { StyleSheet } from "react-native";

const colors = {
  // background: "linear-gradient(50deg, rgb(85, 63, 181) 0%, rgb(56, 72, 161) 100%)",
  background: "rgb(56, 72, 161)",
  primary: "#3F51B5",
  secondary: "#FF4081",
  white: "#FFFFFF",
  black: "#000000",
};

const fonts = {};

const layout = {
  contentPadding: 10,
  innerPadding: 20,
  margin: 10,
  borderRadius: 20,
  bordelSmallRadius: 7,
  cardHeight: 130,
};

const heights = {
  // cumulativeCardHeight: layout.cardHeight + layout.margin * 2 + layout.padding * 2,
  cumulativeCardHeight: layout.cardHeight + layout.contentPadding * 2,
};

const GS = { colors, fonts, layout, heights };

export default GS;

// export default { Colors, fonts, layout };
