import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import Constants from "expo-constants";
import tw from "twrnc";
import NavOptions from "../components/NavOptions";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import {useDispatch } from "react-redux";
import navSlice, { setOrigin, setDestination } from "../slices/navSlice";
import NavFavourites from "../components/NavFavourites";

const statusBarHeight = Constants.statusBarHeight;
const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <AutocompleteDropdownContextProvider>
      <View style={[{ paddingTop: statusBarHeight, flex: 1 }]}>
        <View style={tw`p-5`}>
          <Image
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain",
            }}
            source={{
              uri: "https://links.papareact.com/gzs",
            }}
          />
          <GooglePlacesAutocomplete
            placeholder="Where From?"
            styles={{
              container: {
                flex: 0,
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
                setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              dispatch(setDestination(null));
            }}
          />

          <NavOptions />
          <NavFavourites/>
        </View>
      </View>
    </AutocompleteDropdownContextProvider>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({});
