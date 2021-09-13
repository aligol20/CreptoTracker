import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import fetchCryptoAction from 'src/redux/actions/fetchCryptoAction';
import setSymbolAction from 'src/redux/actions/setSymbolAction';
import {verticalScale} from 'src/utils/scale';

const AddCrypto = () => {
  const {symbol, isFetching} = useSelector(state => ({
    symbol: state.crypto.symbol,
    isFetching: state.crypto.isFetching,
  }));
  const dispatch = useDispatch();

  const onSymbolChanges = event => {
    dispatch(setSymbolAction(event));
  };
  const onAdd = () => {
    console.log(symbol, 'symbol symbol');
    dispatch(fetchCryptoAction(symbol));
  };
  return (
    <View style={styles.maintainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{'Add a Cryptocurrency'}</Text>
        <TextInput
          style={styles.input}
          value={symbol}
          clearButtonMode="always"
          placeholder={'Use a name or ticker symbol'}
          onChangeText={onSymbolChanges}
        />
        <TouchableOpacity
          disabled={!symbol}
          style={styles.addButton}
          onPress={onAdd}>
          {isFetching ? (
            <ActivityIndicator
              color={'black'}
              size={19}
              style={styles.indicator}
            />
          ) : (
            <Text style={symbol ? styles.addText : styles.addTextDisabled}>
              {'Add'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddCrypto;

const styles = StyleSheet.create({
  maintainer: {
    backgroundColor: 'rgb(255,255,255)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: 'rgb(251,210,76)',
    borderRadius: 3,
    width: '40%',
    marginTop: 13,
    alignSelf: 'flex-end',
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 19,
    paddingHorizontal: 23,
    paddingVertical: 13,
    textAlign: 'center',
  },
  indicator: {
    paddingHorizontal: 23,
    paddingVertical: 13,
  },
  addTextDisabled: {
    color: 'grey',
    fontWeight: '500',
    fontSize: 19,
    paddingHorizontal: 23,
    paddingVertical: 13,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 13,
    borderRadius: 3,
    borderColor: 'grey',
    width: '100%',
  },
  title: {
    fontWeight: '700',
    color: 'black',
    fontSize: 23,
    textAlign: 'left',
    width: '100%',
    marginBottom: 23,
  },
});
