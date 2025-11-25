import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const GOOGLE_PLACES_API_KEY = "";

export default function App() {
  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);


      // ****I WILL NOT BE USING THIS API AS IT REQUIRES A PAYMENT ACCOUNT AND I DO NOT FEEL COMFORTABLE PUTTING IN MY PAYMENT INFORMATION****

      // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${loc.coords.latitude},${loc.coords.longitude}&radius=1000&type=restaurant&key=${GOOGLE_PLACES_API_KEY}`;
      
      // try {
      //   const response = await fetch(url);
      //   const data = await response.json();
      //   setRestaurants(data.results);
      // } catch (error) {
      //   console.error(error);
      // }
    })();
  }, []);

  
  if (errorMsg) return <Text>{errorMsg}</Text>;
  if (!location) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  
//  Example of retuarant marker
  const restaurant = {
    name: "Joe's Pizza",
    description: "Best pizza in town!",
    latitude: location.latitude + 0.0015, // slightly north
    longitude: location.longitude + 0.0015, // slightly east
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
        followsUserLocation
      >
        {/* Example of resturant marker */}
        <Marker
          coordinate={{
            latitude: restaurant.latitude,
            longitude: restaurant.longitude,
          }}
          title={restaurant.name}
          description={restaurant.description}
          pinColor="orange"
        />
        {/* {restaurants.map((r) => (
          <Marker
            key={r.place_id}
            coordinate={{
              latitude: r.geometry.location.lat,
              longitude: r.geometry.location.lng,
            }}
            title={r.name}
            description={r.vicinity}
            pinColor="orange"
          />
        ))} */}
      </MapView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, marginVertical: 150, marginHorizontal: 50, },
  map: { flex: 1 },
});
