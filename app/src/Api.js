import AsyncStorage from "@react-native-community/async-storage";
//const BASE_API = 'http://10.0.2.2:3000';
const BASE_API = 'http://192.168.0.35:3000';

export default {
    checkToken: async (token) => {
        const req = await fetch(`${BASE_API}/auth/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        });
        const json = await req.json();
        return json;
    },
    signIn: async (email, senha) => {
        const req = await fetch(`${BASE_API}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });
        const json = await req.json();
        return json;
    },
    signUp: async (name, email, password) => {
        const req = await fetch(`${BASE_API}/user`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await req.json();
        return json;
    },
    logout: async (token) => {
        const req = await fetch(`${BASE_API}/auth/logout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        });
        const json = await req.json();
        return json;
    },
    getBarbers: async (token) => {
        const req = await fetch(`${BASE_API}/barbers`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        });
        const json = await req.json();
        return json;
    },
    getBarber: async (idBarbeiro, token) => {
        const req = await fetch(`${BASE_API}/barber`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },

            body: JSON.stringify({ idBarbeiro })
        });
        const json = await req.json();
        console.log(json);
        return json;
    },
    setFavorite: async (idBarbeiro) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/favorite`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },

            body: JSON.stringify({ token, idBarbeiro })
        });
        const json = await req.json();
        console.log(json);
        return json;
    },
    setAppointment: async (userId, service, selectedYear, selectedMonth, selectedDay, selectedHour) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/appointment`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },

            body: JSON.stringify({ token,id: userId, service, year: selectedYear, month: selectedMonth, day: selectedDay, hour: selectedHour })
        });
        const json = await req.json();
        console.log(json);
        return json;
    }
};