import React, { useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton, PaperProvider } from "react-native-paper";

export default function App() {
  const [pace, setPace] = useState({ minutes: 6, seconds: 0 });
  const [height, setHeight] = useState(155);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handlePressIn = (action: () => void) => {
    action();
    intervalRef.current = setInterval(action, 100);
  };

  const handlePressOut = () => {
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
    <PaperProvider>
      <View style={styles.container}>
        <IconButton
          mode="contained"
          style={styles.iconButton}
          icon="menu-up-outline"
          onPressIn={() => handlePressIn(incrementPace)}
          onPressOut={handlePressOut}
        ></IconButton>
        <Text>
          {pace.minutes}:{pace.seconds.toString().padStart(2, "0")} /km
        </Text>
        <IconButton
          mode="contained"
          style={styles.iconButton}
          icon="menu-down-outline"
          onPressIn={() => handlePressIn(decrementPace)}
          onPressOut={handlePressOut}
        ></IconButton>
        <IconButton
          mode="contained"
          style={styles.iconButton}
          icon="menu-up-outline"
          onPressIn={() => handlePressIn(incrementHeight)}
          onPressOut={handlePressOut}
        ></IconButton>
        <Text>{height}cm</Text>
        <IconButton
          mode="contained"
          style={styles.iconButton}
          icon="menu-down-outline"
          onPressIn={() => handlePressIn(decrementHeight)}
          onPressOut={handlePressOut}
        ></IconButton>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  iconButton: {
    margin: 10,
  },
});
