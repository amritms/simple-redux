let state = {};

//action types
const UPDATE_USER = "UPDATE_USER";
const UPDATE_CONTACT = "UPDATE_CONTACT";

class Store {
  constructor(reducer, initialState) {
    this.reducer = reducer;
    this.state = initialState;
  }

  getState() {
    return this.state;
  }

  dispatch(update) {
    this.state = this.reducer(this.state, update);
  }
}

// action creators
const updateUser = update => ({
  type: UPDATE_USER,
  payload: update
});

const addContact = newContact => ({
  type: UPDATE_CONTACT,
  payload: newContact
});

const DEFAULT_STATE = { user: {}, contacts: [] };

const merge = (prev, next) => Object.assign({}, prev, next);

const contactReducer = (state, action) => {
  if (action.type === UPDATE_CONTACT) {
    return [...state, action.payload];
  }
  return state;
};

const userReducer = (state, action) => {
  if (action.type === UPDATE_USER) {
    return merge(state, action.payload);
  }
  return state;
};

// const reducer = (state, action) => {
//   if (action.type === "UPDATE_USER") {
//     return merge(state, { user: userReducer(state.user, action.payload) });
//   }

//   if (action.type === "UPDATE_CONTACT") {
//     return merge(state, {
//       contacts: contactReducer(state.contacts, action.payload)
//     });
//   }

//   return state;
// };

const reducer = (state, action) => ({
  user: userReducer(state, user, action),
  contacts: contactReducer(state.contacts, action)
});

const store = new Store(reducer, DEFAULT_STATE);

store.dispatch(updateUser({ foo: "foo" }));
store.dispatch(updateUser({ bar: "bar" }));
store.dispatch(updateUser({ foo: "baz" }));
store.dispatch(addContact({ name: "Amrit", number: "2312312" }));
store.dispatch(addContact({ name: "Amrit", number: "2312312" }));
console.log(store.getState());
