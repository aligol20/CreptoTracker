import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {verticalScale} from 'src/utils/scale';
import Icon from 'react-native-vector-icons/Feather';

const AddCurrency = ({onNewCurrency}) => {
  return (
    <View style={styles.maintainer}>
      <TouchableOpacity style={styles.addNew} onPress={onNewCurrency}>
        <Icon name={'plus'} color={'rgb(53,83,112)'} />

        <Text style={styles.addText}>{'Add new currency'}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default AddCurrency;

const styles = StyleSheet.create({
  addNew: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  maintainer: {
    height: verticalScale(53),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: verticalScale(23),
  },
  addText: {color: 'rgb(53,83,112)'},
});
