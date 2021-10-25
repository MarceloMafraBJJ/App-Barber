import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Platform, RefreshControl } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';

import Api from '../../Api';



import {
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,
    SearchButton,

    LocationArea,
    LocationInput,
    LocationFinder,

    LoadingIcon,
    ListArea

} from './styles';

import BarberItem from "../../components/BarberItem";

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';

export default () => {


    const navigation = useNavigation();

    const [locationText, setLocationText] = useState('');
    const [coords, setCoods] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const handleLocationFinder = async () => {
        setCoods(null);
        let result = await request(
            Platform.OS === 'ios' ?
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                :
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );

        if (result === 'granted') {
            /*  const successCallback = (info) => { console.log(info)}; 
                        const errorCallback = (info) => { console.log(info)}; 
                        
                        const configuration = {
                            timeout: 30,
                            maximumAge: 5000,
                            desiredAccuracy: 10
                        };
                        Geolocation.getCurrentPosition(configuration, successCallback, errorCallback); */
            setLoading(true);
            setLocationText('');
            setList([]);

            getBarbers();

        }
    }
    const getBarbers = async () => {
        setLoading(true);
        setList([]);

        const token = await AsyncStorage.getItem('token');
        let res = await Api.getBarbers(token);
        console.log(res);
        // if (res.error == '') {
          /*  if(res.loc) {
               setLocationText(res.loc);
           } */
             setList(res.data);

      /*  }  else {
            alert("Erro: " + res.error);
        } */

        setLoading(false);
    }

     useEffect(() => {
         getBarbers();
     }, []);

     const onRefresh = () => {
        setRefreshing(false);
        getBarbers();
     }

     /* const handleLocationSearch = () => {
         setCoods({});
         getBarbers();
     }
 */
    return (
        <Container>
            <Scroller refreshControl= {
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>

                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre o seu barbeiro favorito</HeaderTitle>
                    <SearchButton onPress={() => navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#FFFFFF" />
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput
                        placeholder="Onde você está?"
                        placeholderTextColor="#FFFFFF"
                        value={locationText}
                        onChangeText={t => setLocationText(t)}
                        //onEndEditing={handleLocationSearch}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#FFFFFF" />
                    </LocationFinder>
                </LocationArea>


                {loading &&
                    <LoadingIcon size="large" color="#FFFFFF" />
                }
                <ListArea>
                    {list.map((item, k) => (
                        <BarberItem key={k} data={item} />
                    ))}
                </ListArea>

            </Scroller>
        </Container>
    );
}