import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { icons, images } from "../constants";
import { router, usePathname } from "expo-router";
const SearchInput = ({ initialQuery }) => {
  const pathName = usePathname()
  const [query, setQuery] = useState(initialQuery || "")
  return (
    <View className="flex-row w-full h-16 px-4 bg-black-100 border-black-200 border rounded-2xl focus:border-secondary items-center space-x-4">
      <TextInput
        className="flex-1 h-full text-white font-psemibold text-base "
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor={"#CDCDE0"}
        onChangeText={(e)=> setQuery(e)}
        secureTextEntry={false}
      />
      <TouchableOpacity
        onPress={()=>{
          if(!query){
            Alert.alert('Missing query', "Please type something to search")
          }
          if(pathName.startsWith("/search")) router.setParams({query})
          else router.push(`/search/${query}`)
        }}
      >
        <Image source={icons.search} className="h-5 w-5" resizeMode="contain"/>
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
