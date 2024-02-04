import React from "react";
import { Text, StyleSheet, View } from "react-native";
import tw from "twrnc";
import Map from "../components/Map";
import { createStackNavigator } from "@react-navigation/stack";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";

const MapScreen = ({ navigation }) => {
  const Stack = createStackNavigator();
  return (
    <View>
      <View style={tw`h-2/5`}>
        <Map />
      </View>
      <View style={tw`h-3/5`}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;
const styles = StyleSheet.create({});
