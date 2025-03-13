// import React from "react";
// import { View, StyleSheet } from "react-native";
// import MapView, { Marker } from "react-native-maps";

// const MapScreen = ({ latitude = 37.7749, longitude = -122.4194 }) => {
//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude,
//           longitude,
//           latitudeDelta: 0.01, // Controls zoom level
//           longitudeDelta: 0.01,
//         }}
//       >
//         <Marker coordinate={{ latitude, longitude }} title="Location" />
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: { width: "100%", height: "100%" },
// });

// export default MapScreen;
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ latitude = 37.7749, longitude = -122.4194 }) => {
  const [region, setRegion] = useState({
    latitude,
    longitude,
    latitudeDelta: 0.01, 
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    // Update region when latitude and longitude change
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  }, [latitude, longitude]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}  // Use `region` instead of `initialRegion`
      >
        <Marker coordinate={{ latitude, longitude }} title="Selected Location" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
});

export default MapScreen;
