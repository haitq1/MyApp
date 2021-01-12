import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Home = () => {
  const [response, setResponse] = React.useState(null);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
      <View>
        <Text>Res: {JSON.stringify(response)}</Text>
      </View>

      {response && (
        <View>
          <Image
            style={{width: 200, height: 200}}
            source={{uri: response.uri}}
          />
        </View>
      )}
      <TouchableOpacity
        onPress={() => {
          launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 200,
              maxWidth: 200,
            },
            (response) => {
              setResponse(response);
            },
          );
        }}>
        <Text>Chọn ảnh</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="title"
        style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 80}}
      />
    </View>
  );
};
export default Home;
