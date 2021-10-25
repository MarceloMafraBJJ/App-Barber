import { startDetecting } from "react-native/Libraries/Utilities/PixelRatio";

export const initialState = {
    avatar: '',
    favorites: [],
    appointments: []
};

export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'setAvatar':
            return { ...state, avatar: action.payload.avatar };
        break;
        default:
            return state;
    }

}
