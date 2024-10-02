import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import FormFeild from "../../components/FormFeild";
import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import * as ImagePicker from 'expo-image-picker';
const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });
  //choose file
  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ?  ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
    //  else {
    //     setTimeout(() => {
    //       Alert.alert("Document picked", JSON.stringify(result, null, 2));
    //     }, 100);
    //   }
  };
  //form submit
  const submit = async () => {
    if (!form.prompt || !form.title || !form.video || !form.thumbnail) {
      Alert.alert("Please fill in all the fields");
    }
    setUploading(true);
    try {
      await createVideo({ ...form, userId: user.$id });

      Alert.alert("Success", "Post successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
      setUploading(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView className="px-4 space-y-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>
        <FormFeild
          title={"Video title"}
          value={form.title}
          placeholder={"Give your video a catch title"}
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles={"mt-10"}
        />
        <View className="mt-7 space-y-2">
          <Text className="text-gray-100 font-pmedium text-base">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
                shouldPlay={true}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-psemibold">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View
                className="w-full h-20 
              rounded-2xl  justify-center items-center 
              border-2 border-black-200 space-x-2 py-3"
              >
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-1/2 h-1/2"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormFeild
          title={"AI Prompt"}
          value={form.prompt}
          placeholder={"The prompt to create video"}
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles={"mt-7"}
        />
        <CustomButton
          title={"Submit & Publish"}
          containerStyles={"mt-10"}
          handlePress={submit}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
