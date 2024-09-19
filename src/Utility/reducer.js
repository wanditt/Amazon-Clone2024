import { Type } from "./actiontype";

export const initialeState = {
  basket: [], // Initialize basket as an empty array
  // Other initial state properties
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      // Check if the item exists
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );

      if (!existingItem) {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        const updatedBasket = state.basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );

        return {
          ...state,
          basket: updatedBasket,
        };
      }

    case Type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];

      // Ensure the index is valid
      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          // Decrease the amount by 1 if more than 1 exists
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          // Remove the item from the basket
          newBasket.splice(index, 1);
        }
      }

      return {
        ...state,
        basket: newBasket,
      };

    default:
      return state;
  }
};
