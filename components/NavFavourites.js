import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import tw from "twrnc";
import { Icon } from '@rneui/themed';

const data = [
  {
    id: "1",
    icon: "home",
    location: "Home",
    destination: "Cairo",
  },
  {
    id: "2",
    icon: "briefcase",
    location: "Work",
    destination: "Giza",
  },
];
const NavFavourites = ({ navigation }) => {
  return (
    <FlatList
    data={data}
    keyExtractor={(item) => item.id}
    ItemSeparatorComponent={() => (
        <View
        style={[tw`bg-gray-300`, {height:0.5}]}
        />
    )}
    renderItem={({item: {location, destination, icon}}) => (
        <TouchableOpacity style={tw`flex-row items-center p-5`}>
            <Icon
            style={tw`mr-4 rounded-full bg-gray-400 p-3`}
            type="ionicon"
            name={icon}
            color="white"
            size={18}
            />
            <View>
                <Text style={tw` text-lg`}>{location}</Text>
                <Text style={tw`text-gray-500`}>{destination}</Text>
            </View>
        </TouchableOpacity>
    )}
    />
  );
};

export default NavFavourites;
const styles = StyleSheet.create({});
