import { createContext, useEffect, useState } from "react";
import { food_list, acompanhamento_principal, acompanhamento_refri, acompanhamento_arroz, acompanhamento_batata } from "../assets/frontend_assets/assets"; // Certifique-se de que as listas de acompanhamentos estão corretamente exportadas

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({}); // Inicializa o estado do carrinho

  // Função para adicionar ao carrinho
  const addToCart = (itemId, selectedItems) => {
    const itemInfo = food_list.find((product) => product._id === itemId); // Obtém os detalhes completos do produto usando o itemId

    if (itemInfo) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: {
          product: itemInfo, // Armazena as informações completas do produto
          quantity: (prev[itemId]?.quantity || 0) + 1, // Incrementa a quantidade
          acompanhamentos: selectedItems, // Armazena os acompanhamentos selecionados
        },
      }));
    }
  };

  // Função para remover do carrinho
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId]?.quantity === 1) {
        const { [itemId]: _, ...rest } = prev; // Remove o item do carrinho
        return rest;
      }
      return {
        ...prev,
        [itemId]: {
          ...prev[itemId],
          quantity: prev[itemId].quantity - 1, // Diminui a quantidade
        },
      };
    });
  };

  // Calcular o valor total do carrinho
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    console.log('Current Cart Items:', cartItems); // Verifica os itens no carrinho

    for (const itemId in cartItems) {
      const itemInfo = food_list.find((product) => product._id === String(itemId)); // Certifique-se que itemId seja uma string

      if (itemInfo) {
        // Calcula o total do produto principal
        totalAmount += itemInfo.price * cartItems[itemId].quantity;

        // Adiciona o preço dos acompanhamentos selecionados
        cartItems[itemId].acompanhamentos.forEach((acomp) => {
          if (acomp.acompanhamento_principal_name) {
            const acompanhamento = acompanhamento_principal.find(
              (a) => a.acompanhamento_principal_name === acomp.acompanhamento_principal_name
            );
            if (acompanhamento) {
              totalAmount += acompanhamento.preco;
            }
          } else if (acomp.acompanhamento_name) {
            const acompanhamento = acompanhamento_refri.find(
              (a) => a.acompanhamento_name === acomp.acompanhamento_name
            );
            if (acompanhamento) {
              totalAmount += acompanhamento.preco;
            }
          } else if (acomp.acompanhamento_arroz_name) {
            const acompanhamento = acompanhamento_arroz.find(
              (a) => a.acompanhamento_arroz_name === acomp.acompanhamento_arroz_name
            );
            if (acompanhamento) {
              totalAmount += acompanhamento.preco;
            }
          } else if (acomp.acompanhamento_batata_name) {
            const acompanhamento = acompanhamento_batata.find(
              (a) => a.acompanhamento_batata_name === acomp.acompanhamento_batata_name
            );
            if (acompanhamento) {
              totalAmount += acompanhamento.preco;
            }
          }
        });
      }
    }

    console.log('Calculated Total Amount:', totalAmount); // Verifique o valor calculado
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
    getTotalCartAmount, // Usando nome correto da função
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
