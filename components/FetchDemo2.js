import React, { useEffect, useState } from 'react';
import {  FlatList, Text, View, Button } from 'react-native';

const FetchDemo2 = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://reactnative.dev/movies.json')
      .then((response) => response.json())
      .then((json) => setData(json.movies))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (<Text>Loading</Text>) : (
        <View>
          <Text>Recent Movies</Text>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>{item.title}, {item.releaseYear}</Text>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default FetchDemo2
