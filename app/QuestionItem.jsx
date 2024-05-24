import React, { useCallback, useEffect, useRef, useState } from "react";
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
  const [measure, setMeasure] = useState({});
  const [measure2, setMeasure2] = useState({});

  const viewRef = useRef();
  const view2Ref = useRef();

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.measure((x, y, width, height, pageX, pageY) => {
        const startX = pageX;
        const startY = pageY;
        console.log(pageY);
        const endX = pageX + width;
        const endY = pageY + height;
        setMeasure({ startX, startY, endX, endY });
      });
    }
    if (view2Ref.current) {
      view2Ref.current.measure((x, y, width, height, pageX, pageY) => {
        const startX = pageX;
        const startY = pageY;
        const endX = pageX + width;
        const endY = pageY + height;
        setMeasure2({ startX, startY, endX, endY });
      });
    }
  }, []);

  const handleDrop = (x, y, value) => {
    console.log(value, x, y); // Debugging

    const { startX, startY, endX, endY } = measure;
    const {
      startX: startX2,
      startY: startY2,
      endX: endX2,
      endY: endY2,
    } = measure2;

    if (
      !(x > startX && x < endX && y > startY && y < endY) ||
      !(x > startX2 && x < endX2 && y > startY2 && y < endY2)
    ) {
      setDroppedValue(value);
    }
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
            // setMeasure={setMeasure}
            onDrop={handleDrop}
          />
        ))}

        <View ref={viewRef} style={styles.dropZone}>
          <Text style={styles.dropZoneText}>Drop Here1</Text>
        </View>
        <View ref={view2Ref} style={styles.dropZone}>
          <Text style={styles.dropZoneText}>Drop Here2</Text>
        </View>
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
        style={[styles.textContainer]}
        className="flex-row justify-center  flex-wrap"
      >
        {data?.blank?.map((item, index) => (
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
        ))}
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
  textContainer: {},
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
