import { create } from "zustand";
import { CartApollo } from "../apollo/cart.apollo";
import { initializeApollo } from "../apollo/apolloClient";

interface ICartStore {
	cart: any;
	updateCart: (item: any) => void;
	cartLoading: boolean;
}

export const useCartStore = create<ICartStore>()((set) => ({
	cart: {},
	updateCart: (item) => set({ cart: item }),
	cartLoading: true,
}));

const apolloClient = initializeApollo();
apolloClient.query({ query: CartApollo.GET_CART }).then((result) => {
	useCartStore.setState({ cart: result.data, cartLoading: false });
});
