import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DragableItem from "./DragableItem";

const { width } = Dimensions.get("window");
// const symbols = ["<", ">", ",", "(", ")", ".", "{", "}", ":", ";", "!"];
const symbols = ["<", ">", ","];

export default function QuestionItem({ data }) {
  const [droppedValue, setDroppedValue] = useState(null);
  const [measure, setMeasure] = useState([]);
  const viewRefs = useRef([]);
  const viewRefs2 = useRef([]);

  useEffect(() => {
    // Initialize the refs array based on the length of data.blank
    if (data?.blank) {
      viewRefs2.current = data.blank.map((_, i) => 
        {
          if(viewRefs.current[i]) 
            return viewRefs.current[i]

        }
    );
    }
    console.log(viewRefs2.current)
    // Measure the positions
    viewRefs.current.forEach((ref, i) => {
      if (ref.current) {
        ref.current.measure((x, y, width, height, pageX, pageY) => {
          const startX = pageX;
          const startY = pageY;
          const endX = pageX + width;
          const endY = pageY + height;
          setMeasure((prev) => [
            ...prev,
            { index: i, startX, startY, endX, endY },
          ]);
        });
      }
    });
  }, [data?.blank]);

  const handleDrop = (x, y, value) => {
    console.log(value, x, y); // Debugging
    measure.forEach(({ startX, startY, endX, endY }) => {
      if (x > startX && x < endX && y > startY && y < endY) {
        setDroppedValue(value);
      }
    });
  };

  return (
    <View style={{ width: width }}>
      <Text
        style={{
          marginHorizontal: 10,
          textAlign: "justify",
          color: "white",
          marginTop: 10,
        }}
      >
        {data?.question}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 15,
          marginTop: 3,
        }}
      >
        {symbols.map((item) => (
          <DragableItem
            key={item}
            item={item}
            value="Drag Me one more time!"
            measure={measure}
            onDrop={handleDrop}
          />
        ))}
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 3,
          width: width,
        }}
      >
        {data.options.map((item) => (
          <TouchableOpacity
            key={item}
            style={{
              elevation: 3,
              alignSelf: "center",
              backgroundColor: "#088DAA",
              margin: 10,
              justifyContent: "center",
              paddingHorizontal: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                marginVertical: 1,
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={styles.textContainer}
      >
        {data?.blank?.map((item, index) => {
          if (item.indexOf("_") !== -1) {
            return (
              <Text
                key={index}
                ref={viewRefs.current[index]}
                style={{
                  color: "white",
                  marginHorizontal: 10,
                  textAlign: "justify",
                  marginTop: 10,
                }}
              >
                {item}
              </Text>
            );
          }
          return (
            <Text
              key={index}
              style={{
                color: "white",
                marginHorizontal: 10,
                textAlign: "justify",
                marginTop: 10,
              }}
            >
              {item}
            </Text>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 3,
    width: width,
  },
  dropZone: {
    width: 50,
    height: 50,
    backgroundColor: "lightgray",
    marginTop: 50,
    alignSelf: "center",
  },
  dropZoneText: {
    fontSize: 16,
    color: "black",
  },
  droppedText: {
    fontSize: 20,
    color: "green",
    marginTop: 20,
  },
});
