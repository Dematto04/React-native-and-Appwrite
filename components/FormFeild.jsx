import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import {icons, images} from '../constants'
const FormFeild = ({
  title,
  value,
  handleChangeText,
  placeholder,
  otherStyles,
  ...props
}) => {
    const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="flex-row w-full h-16 px-4 bg-black-100 border-black-200 border rounded-2xl focus:border-secondary items-center">
        <TextInput
          className="flex-1 h-full text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />
        {title === "Password" && (
            <TouchableOpacity onPress={()=> setShowPassword(!showPassword)}>
                <Image className="w-6 h-6" resizeMode="contain" source={!showPassword ? icons.eye : icons.eyeHide}/>
            </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormFeild;
