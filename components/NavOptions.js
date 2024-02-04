import React from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';
const data = [
  {
    id: "1",
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen"
  },
  {
    id: "2",
    title: "Order food",
    image: "https://links.papareact.com/28w",
    screen: "EatsScreen"
  }
];

const NavOptions = () => {

  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-100 m-2 w-40`}
          onPress={() => {
            navigation.navigate(item.screen);
          }}
          disabled={!origin}
        >
          <View style={tw`${!origin ? "opacity-20 " : ""}`}>
            <Image
              style={{ width: 120, height: 120, resizeMode: 'contain' }}
              source={{ uri: item.image }}
            />
          </View>

          <Text style={tw`text-lg font-medium`}>{item.title}</Text>
          <Icon
            style={tw`bg-black rounded-full w-10 p-2 mt-4`}
            type='antdesign'
            color='white'
            name='arrowright'
          />
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;