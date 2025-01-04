import { createContext, useState, useEffect } from "react";
import { food_list, acompanhamento_principal, acompanhamento_refri, acompanhamento_arroz, acompanhamento_batata } from "../assets/frontend_assets/assets"; // Certifique-se de que as listas de acompanhamentos estão corretamente exportadas

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // Inicializa o estado do carrinho
  const [cartItems, setCartItems] = useState([]);

  // Função para adicionar ao carrinho
  const addToCart = (cartItem) => {
    const existingItemIndex = cartItems.findIndex(item => item.product._id === cartItem.id);

    if (existingItemIndex !== -1) {
      // Se já existir no carrinho, apenas atualize os dados (quantidade e acompanhamentos)
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      updatedCartItems[existingItemIndex].acompanhamentos = cartItem.extras;
      setCartItems(updatedCartItems); // Atualiza o estado com os itens modificados
    } else {
      // Se não existir, adicione o item novo ao carrinho
      setCartItems(prev => [
        ...prev,
        {
          product: cartItem,
          quantity: 1,
          acompanhamentos: cartItem.extras,
        },
      ]);
    }
  };

  // Função para remover do carrinho
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex((item) => item.product._id === itemId);

      if (existingItemIndex !== -1) {
        const updatedCartItems = [...prev];
        const item = updatedCartItems[existingItemIndex];

        if (item.quantity === 1) {
          // Remove o item do carrinho se a quantidade for 1
          updatedCartItems.splice(existingItemIndex, 1);
        } else {
          // Decrementa a quantidade se for maior que 1
          updatedCartItems[existingItemIndex].quantity -= 1;
        }

        return updatedCartItems;
      }

      return prev;
    });
  };

  // Função para calcular o preço de acompanhamento
  const getAcompanhamentoPrice = (acomp) => {
    const allAcompanhamentos = [
      ...acompanhamento_principal,
      ...acompanhamento_refri,
      ...acompanhamento_arroz,
      ...acompanhamento_batata,
    ];

    const selectedAcompanhamento = allAcompanhamentos.find(
      (a) => a.name === acomp.name // Alterei para procurar pela propriedade `name` diretamente
    );
    return selectedAcompanhamento ? selectedAcompanhamento.preco : 0;
  };

  // Função para calcular o total do carrinho
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    cartItems.forEach((item) => {
      // Calcula o total do produto principal
      totalAmount += item.product.price * item.quantity;

      // Adiciona o preço dos acompanhamentos
      item.acompanhamentos.forEach((acomp) => {
        totalAmount += getAcompanhamentoPrice(acomp);
      });
    });

    return totalAmount;
  };

  // UseEffect para verificar quando o carrinho mudar
  useEffect(() => {
    console.log('Cart Items Changed:', cartItems); // Verifique o estado do carrinho sempre que ele mudar
  }, [cartItems]);

  // Contexto com todas as funções e valores
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
