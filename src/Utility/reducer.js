import { Type } from "./actiontype"; // Adjust the path if necessary

export const initialeState = {
  basket: [], // Initialize basket as an empty array
  user: null, // Initial state for user
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );

      if (!existingItem) {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      }

      return {
        ...state,
        basket: state.basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item
        ),
      };

    case Type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex((item) => item.id === action.id);
      if (index < 0) {
        console.warn(`Item with id ${action.id} not found in basket!`);
        return state;
      }

      let newBasket = [...state.basket];

      if (newBasket[index].amount > 1) {
        newBasket[index] = {
          ...newBasket[index],
          amount: newBasket[index].amount - 1,
        };
      } else {
        newBasket.splice(index, 1);
      }

      return {
        ...state,
        basket: newBasket,
      };
    case Type.EMPTY_BASKET:
      return {
        ...state,
        basket: [],
      };

    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};
