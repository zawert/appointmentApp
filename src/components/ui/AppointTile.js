import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../constants/color';

const AppointTile = ({status, seller, date, onPress}) => {
  const dateObject = new Date(date);
  const formattedDate = dateObject.toLocaleString();
  return (
    <View style={{...styles.container, ...{borderColor: Colors[status]}}}>
        <View style={styles.body}>
          <View style={styles.statusContainer}>
            <Text style={{...styles.status, color: Colors[status]}}>{status}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
          <Text numberOfLines={1} style={styles.name}>
            {seller.name} ({seller.email})
          </Text>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    shadowColor: Colors.border,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: Colors.white,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: 2,
    marginHorizontal: 10,
  },
  body: {
    width: '90%',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 16,
  },
  name: {
    fontSize: 14,
  },
  date: {
    width: '85%',
    textAlign: 'right',
    fontSize: 11,
    
  },
});

export default AppointTile;
