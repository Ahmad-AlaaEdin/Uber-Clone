import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import tw from "twrnc";
import { Icon } from "@rneui/themed";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "1",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "2",
    title: "Scooter",
    multiplier: 0.6,
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_400,h_250/v1696608495/assets/97/d3e455-c9f3-499a-b7ad-56ae11c80287/original/UberMotorcycle.png",
  },
  {
    id: "3",
    title: "UberXL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  }
];
const PER_KM_FEE = 3;
const PER_MINUTE_FEE = 0.45;
const BASE_FARE=8;
const RideOptionsCard = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
const travelTimeInformation = useSelector(selectTravelTimeInformation);
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          style={tw`absolute top-3 left-3 p-2 z-50`}
          onPress={() => navigation.navigate("NavigateCard")}
        >
          <Icon type="fontawesome" name="chevron-left" />
        </TouchableOpacity>
        <Text style={tw`text-center p-5 text-lg`}>Select a Ride - {travelTimeInformation?.distance.text}</Text>
      </View>
      <View style={tw`flex-1`}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            style={tw`flex-row items-center justify-between px-8 ${id === selected?.id  ? "bg-gray-200" : ""}`}
            onPress={() => setSelected(item)}
          >
            <View>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "contain",
                  marginLeft: id === "2" ? -10 : 0,
                  marginRight: id === "2" ? 10 : 0,
                }}
                source={{ uri: image }}
              />
            </View>

            <View>
              <Text style={tw`text-lg font-bold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration.text}</Text>
            </View>
            <Text style={tw`text-xl`}>EGB{
            Math.round(((travelTimeInformation?.duration.value/60)*PER_MINUTE_FEE+(travelTimeInformation?.distance.value/1000)*PER_KM_FEE+8)*multiplier)}
            </Text>
          </TouchableOpacity>
        )}
      />
      </View>
      
      
      <View>
        <TouchableOpacity
         disabled={!selected}
          style={tw`bg-black py-3 m-2 rounded-full ${!selected ? "bg-gray-300" : ""}`}>
          <Text style={tw`text-center text-white text-lg`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
};

export default RideOptionsCard;
const styles = StyleSheet.create({});
