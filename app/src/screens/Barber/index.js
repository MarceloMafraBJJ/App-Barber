import React, { useState, useLayoutEffect } from 'react';
import { Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Swiper from 'react-native-swiper';

import Stars from '../../components/Stars';
import BarberModal from '../../components/BarberModal';

import FavoriteFullIcon from '../../assets/favorite_full.svg';
import FavoriteIcon from '../../assets/favorite.svg';
import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';


import {
    Container,
    Scroller,
    PageBody,
    BackButtom,
    LoadingIcon,

    SwipeDot,
    SwipeDotActive,
    SwipeItem,
    SwipeImage,
    FakeSwiper,

    UserInfoArea,
    UserAvatar,
    UserInfo,
    UserInfoName,
    UserFavButtom,

    ServiceArea,
    ServicesTitle,
    ServiceItem,
    ServiceInfo,
    ServiceName,
    ServicePrice,
    ServiceChooseButton,
    ServiceChooseBtnText,

    TestimonialArea,
    TestimonialItem,
    TestimonialInfo,
    TestimonialName,
    TestimonialBody,

} from './styles';

import Api from '../../Api';

export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        idBarbeiro: route.params.idBarbeiro,
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars,
    });
    const [loading, setLoading] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const [selectedService, setSelectedService] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [available, setAvailable] = useState({});

    useLayoutEffect(() => {
        (
            async () => {
                setLoading(true);

                const token = await AsyncStorage.getItem('token');
                let json = await Api.getBarber(userInfo.idBarbeiro, token);
                // if (json.error == '') {
                setUserInfo(json.agendamento);
                setFavorited(json.agendamento.favorited);
                setAvailable(json.agendamento.available.date);

                /* } else {
                    alert("Erro: " + json.error);
                } */

                setLoading(false);
                //  }
                //getBarberInfo();
            })();
    }, []);

    const handleBackButtom = () => {
        navigation.goBack();
    }

    const handleFavClick = () => {
        setFavorited(!favorited);
        Api.setFavorite(userInfo.email);
    }

    const handleServiceChoose = (servico) => {
        setSelectedService(servico);
        setShowModal(true);
    }

    return (
        // <Text>Barbeiro: {userInfo.avatar}</Text>
        <Container>
            <Scroller>
                {userInfo.photos && userInfo.photos.length > 0 ?
                    <Swiper
                        style={{ height: 240 }}
                        dot={<SwipeDot />}
                        activeDot={<SwipeDotActive />}
                        paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
                        autoplay={true}
                    >
                        {userInfo.photos.map((urlFoto, key) => (

                            <SwipeItem key={key}>
                                <SwipeImage source={{ uri: urlFoto }} resizeMode="cover" />
                            </SwipeItem>
                        ))}
                    </Swiper>
                    :
                    <FakeSwiper></FakeSwiper>
                }
                <PageBody>
                    <UserInfoArea>
                        <UserAvatar source={{ uri: userInfo.avatar }} />
                        <UserInfo>
                            <UserInfoName> {userInfo.name} </UserInfoName>
                            <Stars stars={userInfo.stars} showNumber={true} />

                        </UserInfo>
                        <UserFavButtom onPress={handleFavClick}>
                            {favorited ?
                                <FavoriteFullIcon width="24" height="24" fill="#FF0000" />
                                :
                                <FavoriteIcon width="24" height="24" fill="#FF0000" />
                            }
                        </UserFavButtom>
                    </UserInfoArea>

                    {loading &&
                        <LoadingIcon size="large" color="#000000" />
                    }

                    {userInfo.services &&

                        <ServiceArea>
                            <ServicesTitle> Lista de serviços </ServicesTitle>

                            {userInfo.services.map((servico, key) => (
                                <ServiceItem key={key}>
                                    <ServiceInfo>
                                        <ServiceName> {servico.name} </ServiceName>
                                        <ServicePrice>R$ {servico.price} </ServicePrice>
                                    </ServiceInfo>
                                    <ServiceChooseButton onPress={() => handleServiceChoose(servico)}>
                                        <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                                    </ServiceChooseButton>
                                </ServiceItem>
                            ))}
                        </ServiceArea>
                    }

                    {userInfo.testimonials && userInfo.testimonials.length > 0 &&
                        <TestimonialArea>
                            <Swiper
                                style={{ height: 110 }}
                                showsPagination={false}
                                showsButtons={true}
                                prevButton={<NavPrevIcon width="35" height="35" fill="#000000" />}
                                nextButton={<NavNextIcon width="35" height="35" fill="#000000" />}
                            >

                                {userInfo.testimonials.map((item, key) => (
                                    <TestimonialItem key={key}>
                                        <TestimonialInfo>
                                            <TestimonialName> {item.name} </TestimonialName>
                                            <Stars stars={item.rate} showNumber={false} />
                                        </TestimonialInfo>
                                        <TestimonialBody>{item.avaliacao}</TestimonialBody>
                                    </TestimonialItem>
                                ))}
                            </Swiper>
                        </TestimonialArea>
                    }
                </PageBody>
            </Scroller>
            <BackButtom onPress={handleBackButtom}>
                <BackIcon width="44" height="44" fill="#FFFFFF" />
            </BackButtom>

            <BarberModal
                show={showModal}
                setShow={setShowModal}
                user={userInfo}
                service={selectedService}
            />

        </Container>
    );
}