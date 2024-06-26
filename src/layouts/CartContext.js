import { useEffect, createContext, useState } from 'react';

export const CartContext = createContext();

function CartContextProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [isLoginWindowOpen, setLoginWindowOpen] = useState(false); 

    function addToCart(item, volume) {
        // проверка выбран ли объем, если нет, выбирается первый объем из списка
        if(volume === 0){
          volume = item.volumes[0]
        }
        
        // проверка, есть ли элемент в массиве cart
        const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id && cartItem.volume === volume);
        if (existingItemIndex === -1) {
          
          // нет элемента с таким id и volume, добавляется новый
          const newItem = {
            ...item,
            volume: volume,
            inBasket: 1
          };
          
          setCart(cart.concat([newItem]));
          
        } else {
          // найден элемент с таким id и volume, увеличивается его количество
          const updatedCart = cart.map((cartItem, index) => {
            if (index === existingItemIndex) {
              return { ...cartItem, 
                inBasket: cartItem.inBasket + 1 };
              }
              return cartItem;
            });
            
            setCart(updatedCart);
          }
    }

    useEffect(() => {
    localStorage.setItem('items', JSON.stringify(cart));
    }, [cart]);
 
    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, isLoginWindowOpen, setLoginWindowOpen}} >
            { children }
        </CartContext.Provider>
    )
}

export default CartContextProvider;