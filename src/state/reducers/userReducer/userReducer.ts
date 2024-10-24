const initialUserState = {
    USER_LOGGED: null,
};

export const userReducer = (state = initialUserState, action: any) => {
    switch (action.type) {
        case 'SET_USER':
            return { USER_LOGGED: true, ...action.payload };
        case 'CLEAR_USER':
            return initialUserState;
        default:
            return state;
    }
};
