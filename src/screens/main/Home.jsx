import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AddCurrency from 'src/components/AddCurrency';
import ListItem from 'src/components/ListItem';
import removeSingleCryptoAction from 'src/redux/actions/removeSingleCryptoAction';
import updateSelectedCurrenciesAction from 'src/redux/actions/updateSelectedCurrenciesAction';

const Home = ({navigation}) => {
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();

  // refetching the cryptoCurrency changes when component didMount
  useEffect(async () => {
    dispatch(updateSelectedCurrenciesAction());
  }, []);

  const {selectedCurrencies, isFetching} = useSelector(state => ({
    selectedCurrencies: state.crypto.selectedCurrencies,
    isFetching: state.crypto.isFetching,
  }));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onEdit}>
          <Text type={'bold'} style={{color: 'white'}}>
            {'Edit'}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [editMode]);

  // enable Edit Mode
  const onEdit = () => {
    setEditMode(!editMode);
  };
  // navigates to add a new CryptoCurrency
  const onNewCurrency = () => {
    navigation.navigate('AddCrypto', {});
  };

  // will called when user touches trash icon on each item
  const onRemoveItem = item => {
    dispatch(removeSingleCryptoAction(item));
  };
  // force to reFetch crypto changes
  const onRefresh = () => {
    dispatch(updateSelectedCurrenciesAction());
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'rgb(56,87,117)'} />
      <FlatList
        data={selectedCurrencies}
        refreshing={isFetching}
        onRefresh={onRefresh}
        ListFooterComponent={<AddCurrency onNewCurrency={onNewCurrency} />}
        renderItem={({item}) => (
          <ListItem
            editMode={editMode}
            onRemoveItem={onRemoveItem}
            item={item}
          />
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
});
