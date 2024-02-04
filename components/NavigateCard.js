import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import tw from "twrnc";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useDispatch } from "react-redux";
import navSlice, { setOrigin, setDestination } from "../slices/navSlice";
import NavFavourites from "./NavFavourites";

const NavigateCard = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <View style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            styles={{
              container: {
                flex: 0,
                backgroundColor: "white",
              },
              textInput: {
                backgroundColor: "#DDDDDF",
                borderRadius: 0,
              },
              textInputContainer: {
                padding: 20,
              },
            }}
            query={{
              key: GOOGLE_PLACES_API,
              language: "en",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            minLength={2}
            enablePoweredByContainer={false}
            fetchDetails={true}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
          />
        </View>
        <NavFavourites />
        <View style={tw`items-center`}>
          <TouchableOpacity style={tw`bg-black py-3 m-2 rounded-full w-25`}>
            <Text style={tw`text-center text-white text-lg`}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NavigateCard;
const styles = StyleSheet.create({});
