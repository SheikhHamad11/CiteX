import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Animated, PanResponder, StyleSheet, Text } from "react-native";
const symbols = ["<", ">", ",", "(", ")", ".", "{", "}", ":", ";", "!"];

const DragableItem = ({ value, setMeasure, ref, onDrop, measure, item }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const viewRef = useRef();
  const measureRef = useRef();
  useEffect(() => {
    measureRef.current = measure;
    // console.log({ measure });
  }, [measure]);

  // const updateMeasure = () => {
  //   if (viewRef.current) {
  //     viewRef.current.measure((x, y, width, height, pageX, pageY) => {
  //       const startX = pageX;
  //       const startY = pageY;
  //       const endX = pageX + width;
  //       const endY = pageY + height;
  //       setMeasure({ startX, startY, endX, endY });
  //       // console.log({ startX, startY, endX, endY }); // Debugging
  //     });
  //   }
  // };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gestureState) => {
        // console.log("Release:", gestureState.moveX, gestureState.moveY);
        // console.log("Measurement:", measure);

        const { startX, startY, endX, endY } = measureRef.current;
        console.log({ startX, endX, startY, endY });
        console.log(gestureState.moveX, gestureState.moveY);
        if (
          measureRef.current &&
          gestureState.moveX > startX &&
          gestureState.moveX < endX &&
          gestureState.moveY > startY &&
          gestureState.moveY < endY
        ) {
          onDrop(gestureState.moveX, gestureState.moveY, value);
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      ref={viewRef}
      // onLayout={updateMeasure}
      {...panResponder.panHandlers}
      style={[pan.getLayout(), styles.box]}
    >
      <Text style={{ color: "white", fontSize: 18, marginHorizontal: 5 }}>
        {item}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FE5200",
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});

export default DragableItem;

// import React, { useEffect, useRef, useState } from "react";
// import { View, Animated, PanResponder, StyleSheet, Text } from "react-native";

// const DragableItem = ({ value, setMeasure, onDrop, measure }) => {
//   const pan = useRef(new Animated.ValueXY()).current;
//   const viewRef = useRef(null);

//   useEffect(() => {
//     updateMeasure();
//   }, []);

//   const updateMeasure = () => {
//     if (viewRef.current) {
//       viewRef.current.measure((x, y, width, height, pageX, pageY) => {
//         const startX = pageX;
//         const startY = pageY;
//         const endX = pageX + width;
//         const endY = pageY + height;
//         setMeasure({ startX, startY, endX, endY });
//         console.log({ startX, startY, endX, endY }); // Debugging
//       });
//     }
//   };

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
//         useNativeDriver: false,
//       }),
//       onPanResponderRelease: (e, gestureState) => {
//         const { startX, startY, endX, endY } = measure;
//         console.log({ measure });
//         console.log(gestureState.moveX, gestureState.moveY);
//         if (
//           measure &&
//           gestureState.moveX > startX &&
//           gestureState.moveX < endX &&
//           gestureState.moveY > startY &&
//           gestureState.moveY < endY
//         ) {
//           onDrop(gestureState.moveX, gestureState.moveY, value);
//         } else {
//           Animated.spring(pan, {
//             toValue: { x: 0, y: 0 },
//             useNativeDriver: false,
//           }).start();
//         }
//       },
//     })
//   ).current;

//   return (
//     <Animated.View
//       ref={viewRef}
//       onLayout={updateMeasure}
//       {...panResponder.panHandlers}
//       style={[pan.getLayout(), styles.box]}
//     >
//       <Text style={{ color: "white", fontSize: 18 }}>{value}</Text>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   box: {
//     width: 100,
//     height: 100,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#FE5200",
//     borderRadius: 5,
//   },
//   text: {
//     color: "white",
//     fontSize: 18,
//   },
// });

// export default DragableItem;
