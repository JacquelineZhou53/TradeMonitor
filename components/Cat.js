import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

const Cat = (props) => {
  const [isHungry, setIsHungry] = useState(true);
  const [text, setText] = useState(props.name);

  return (
    <View style={{padding:40,margin:20,border: 'thick solid blue'}}>
      <Text>
        I am {text}, and I am {isHungry ? "hungry" : "full"}!
      </Text>
      <Button
        onPress={() => {
          setIsHungry(false);
        }}
        disabled={!isHungry}
        title={isHungry ? "Pour me some milk, please!" : "Thank you!"}
      />
      <TextInput
        style={{height: 40}}
        placeholder="Rename me!"
        onChangeText={text => {setText(text),setIsHungry(true)}}
        defaultValue={'rename me'}
      />
    </View>
  );
}

export default Cat;
