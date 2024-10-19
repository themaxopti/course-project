const initialUserState = {
    name: 'Guest',
    age: null,
};

export const userReducer = (state = initialUserState, action: any) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, ...action.payload };
        case 'CLEAR_USER':
            return initialUserState;
        default:
            return state;
    }
};
