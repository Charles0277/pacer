import React, { useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  IconButton,
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  useTheme,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FC5200",
  },
};

export default function App() {
  const [pace, setPace] = useState({ minutes: 6, seconds: 0 });
  const [height, setHeight] = useState(155);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePressIn = (action: () => void) => {
    action();
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(action, 100);
    }, 500);
  };

  const handlePressOut = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const incrementPace = () => {
    setPace((prevPace) => {
      if (prevPace.seconds === 59) {
        return { minutes: prevPace.minutes + 1, seconds: 0 };
      }
      return { ...prevPace, seconds: prevPace.seconds + 1 };
    });
  };

  const decrementPace = () => {
    setPace((prevPace) => {
      if (prevPace.minutes === 0 && prevPace.seconds === 0) {
        return prevPace;
      }
      if (prevPace.seconds === 0) {
        return { minutes: prevPace.minutes - 1, seconds: 59 };
      }
      return { ...prevPace, seconds: prevPace.seconds - 1 };
    });
  };

  const incrementHeight = () => setHeight((h) => h + 1);
  const decrementHeight = () => setHeight((h) => h - 1);

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <View style={styles.paceSection}>
          <IconButton
            mode="contained"
            style={[
              styles.iconButton,
              { borderWidth: 1, borderColor: theme.colors.primary },
            ]}
            icon="menu-up"
            size={35}
            onPressIn={() => handlePressIn(incrementPace)}
            onPressOut={handlePressOut}
            containerColor={"#fff"}
          ></IconButton>
          <Text>
            {pace.minutes}:{pace.seconds.toString().padStart(2, "0")} /km
          </Text>
          <IconButton
            mode="contained"
            style={[
              styles.iconButton,
              { borderWidth: 1, borderColor: theme.colors.primary },
            ]}
            icon="menu-down"
            size={35}
            onPressIn={() => handlePressIn(decrementPace)}
            onPressOut={handlePressOut}
            containerColor={"#fff"}
          ></IconButton>
        </View>
        <View style={styles.middleSection}>
          <IconButton
            mode="contained"
            style={[
              styles.iconButton,
              { borderWidth: 1, borderColor: theme.colors.primary },
            ]}
            icon={running ? "pause" : "play"}
            size={40}
            onPress={() => setRunning(!running)}
            containerColor={"#fff"}
          ></IconButton>
        </View>
        <View style={styles.heightSection}>
          <IconButton
            mode="contained"
            style={[
              styles.iconButton,
              { borderWidth: 1, borderColor: theme.colors.primary },
            ]}
            icon="menu-up"
            size={35}
            onPressIn={() => handlePressIn(incrementHeight)}
            onPressOut={handlePressOut}
            containerColor={"#fff"}
          ></IconButton>
          <Text>{height}cm</Text>
          <IconButton
            mode="contained"
            style={[
              styles.iconButton,
              { borderWidth: 1, borderColor: theme.colors.primary },
            ]}
            icon="menu-down"
            size={35}
            onPressIn={() => handlePressIn(decrementHeight)}
            onPressOut={handlePressOut}
            containerColor={"#fff"}
          ></IconButton>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  iconButton: {
    margin: 10,
  },
  paceSection: {
    alignItems: "center",
    justifyContent: "center",
  },
  middleSection: {
    alignItems: "center",
    justifyContent: "flex-end",
    alignSelf: "stretch",
    paddingBottom: 50,
  },
  heightSection: {
    alignItems: "center",
    justifyContent: "center",
  },
});
