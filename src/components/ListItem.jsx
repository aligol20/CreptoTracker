import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import fixNumber from 'src/utils/fixNumber';
import {scale} from 'src/utils/scale';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import {ICON_API} from 'src/consts/api';

const DURATION = 500;
const NATIVE_DRIVER = false;

const ListItem = ({item, editMode, onRemoveItem}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const widthAnim = useRef(new Animated.Value(0)).current;

  const fadeAnimItem = useRef(new Animated.Value(1)).current;
  const heightAnimItem = useRef(new Animated.Value(scale(79))).current;

  const {market_data, symbol, slug} = item || {};
  const {percent_change_btc_last_24_hours, price_usd} = market_data || {};

  /**
   *
   * @param {Object} item - An item that shoul be removed!
   * here we create a simple animation for removing the item
   * before removing it from the redux.
   */
  const onRemove = item => {
    Animated.parallel([
      Animated.timing(heightAnimItem, {
        toValue: 0,
        duration: DURATION,
        useNativeDriver: NATIVE_DRIVER,
      }),
      Animated.timing(fadeAnimItem, {
        toValue: 0,
        duration: DURATION,
        useNativeDriver: NATIVE_DRIVER,
      }),
    ]).start();
    setTimeout(() => {
      onRemoveItem(item);
    }, DURATION + 50);
  };

  /**
   * by Changing the editMode, an animation will play
   * to showing/hiding the trash icon
   */
  useEffect(() => {
    switch (editMode) {
      case true:
        Animated.parallel([
          Animated.timing(widthAnim, {
            toValue: 50,
            duration: DURATION,
            useNativeDriver: NATIVE_DRIVER,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: DURATION,
            useNativeDriver: NATIVE_DRIVER,
          }),
        ]).start();
        break;
      case false:
        Animated.parallel([
          Animated.timing(widthAnim, {
            toValue: 0,
            duration: DURATION,
            useNativeDriver: NATIVE_DRIVER,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: DURATION,
            useNativeDriver: NATIVE_DRIVER,
          }),
        ]).start();
        break;
    }
  }, [editMode]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: heightAnimItem,
          opacity: fadeAnimItem,
        },
      ]}>
      <View style={styles.item}>
        <Image
          style={styles.logo}
          source={{
            uri: `${ICON_API}${symbol.toLowerCase()}/200`,
            cache: 'force-cache',
          }}
        />
        <View style={styles.main}>
          <View style={styles.name}>
            <Text style={styles.symbol}>{symbol}</Text>

            <Text style={styles.slug}>{slug}</Text>
          </View>
          <View style={styles.price}>
            {price_usd && (
              <Text style={styles.priceText}>{`$${Number.parseFloat(price_usd)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}</Text>
            )}
            <View style={styles.percent}>
              <Icon
                name={
                  percent_change_btc_last_24_hours > 0
                    ? 'arrow-up-right'
                    : 'arrow-down-left'
                }
                color={percent_change_btc_last_24_hours > 0 ? 'green' : 'red'}
              />
              <Text
                style={
                  percent_change_btc_last_24_hours > 0
                    ? styles.increase
                    : styles.decrease
                }>
                {fixNumber(percent_change_btc_last_24_hours)}
              </Text>
            </View>
          </View>
        </View>

        <Animated.View // Special animatable View
          style={{
            height: 30,
            maxWidth: widthAnim,
            opacity: fadeAnim, // Bind opacity to animated value
          }}>
          <TouchableOpacity
            onPress={() => {
              onRemove(item);
            }}>
            <Icon name={'trash-2'} color={'red'} size={scale(23)} />
          </TouchableOpacity>
        </Animated.View>
      </View>
      <View style={styles.seperator} />
    </Animated.View>
  );
};
export default ListItem;

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  editMode: PropTypes.bool,
  onRemoveItem: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  increase: {color: 'green'},
  decrease: {
    color: 'red',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: scale(13),
    paddingVertical: scale(13),
  },
  addNew: {
    height: 40,
    width: '100%',
    backgroundColor: 'purple',
  },
  logo: {
    width: scale(60),
    height: scale(60),
    borderRadius: 3,
    backgroundColor: '#ffffff',
  },
  seperator: {
    height: 1,
    width: '80%',
    backgroundColor: 'grey',
    marginVertical: 7,
  },
  name: {
    flexDirection: 'column',
  },
  price: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: scale(13),
    color: 'black',
  },
  main: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexGrow: 1,
    paddingHorizontal: scale(17),
  },
  percent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },
  symbol: {
    fontWeight: 'bold',
    fontSize: scale(17),
    color: 'black',
  },
  slug: {
    color: 'grey',
    fontSize: scale(15),
    fontWeight: 'normal',
  },
});
