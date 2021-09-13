import React, {useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AddCurrency from 'src/components/AddCurrency';
import ListItem from 'src/components/ListItem';
import removeSingleCryptoAction from 'src/redux/actions/removeSingleCryptoAction';
import updateSelectedCurrenciesAction from 'src/redux/actions/updateSelectedCurrenciesAction';

const Home = ({navigation}) => {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);

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
  const onEdit = () => {
    setEditMode(!editMode);
  };
  const onNewCurrency = () => {
    navigation.navigate('AddCrypto', {});
  };

  const onRemoveItem = item => {
    dispatch(removeSingleCryptoAction(item));
  };
  const onRefresh = () => {
    console.log('onRefresh***');

    dispatch(updateSelectedCurrenciesAction());
  };

  return (
    <View style={styles.container}>
      {console.log(isFetching, 'isFetching***')}
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
