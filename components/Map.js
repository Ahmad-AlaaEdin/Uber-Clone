import React, { useEffect, useRef } from "react";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin, selectDestination, setTravelTimeInformation } from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_API_KEY } from "@env";
const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const ref = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!origin || !destination) return;

    ref?.current?.fitToCoordinates(
      [
        {
          latitude: origin.location.lat,
          longitude: origin.location.lng,
        },
        {
          latitude: destination.location.lat,
          longitude: destination.location.lng,
        },
      ],
      {
        animated: true,
        edgePadding: {
          top: 150,
          right: 50,
          bottom: 50,
          left: 50,
        },
      }
    );
  }, [origin, destination]);
  useEffect(() => {

    if(!origin || !destination) return ;

    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.description}&origins=${origin.description}&units=metric&key=${DISTANCE_MATRIX_API}`
      )
        .then((res) => res.json())
        .then((data) => dispatch(setTravelTimeInformation(data.rows[0].elements[0]))) 
        .catch((error) => console.log("Error:", error));
        
    };
  
    getTravelTime();
  }, [origin, destination]);


  return (
    <MapView
      ref={ref}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAP_API}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      <Marker
        coordinate={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
        }}
        title="Origin"
        description={origin.description}
        identifier="origin"
      />
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;
