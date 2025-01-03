import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Content/StoreContent';
import './PagesDetails.css';
import { 
  acompanhamento_refri, 
  acompanhamento_arroz, 
  acompanhamento_batata, 
  acompanhamento_principal 
} from '../../assets/frontend_assets/assets';

const PagesDetails = () => {
  const { addToCart, food_list } = useContext(StoreContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (food_list && food_list.length > 0) {
      const foundProduct = food_list.find((item) => item._id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
      setLoading(false);
    }
  }, [food_list, id]);
  
  const handleCheckboxChange = (event, item) => {
    const itemName = item.acompanhamento_name || item.acompanhamento_arroz_name || item.acompanhamento_batata_name || item.acompanhamento_principal_name;
    const itemPrice = item.preco;
  
    if (event.target.checked) {
      setSelectedItems((prevSelected) => [...prevSelected, { name: itemName, price: itemPrice }]);
    } else {
      setSelectedItems((prevSelected) => prevSelected.filter(selectedItem => selectedItem.name !== itemName));
    }
  };

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        id: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image || '/default-image.jpg',
        extras: selectedItems,
        total: product.price + selectedItems.reduce((sum, item) => sum + item.price, 0),
      };

      addToCart(cartItem);
      setModalVisible(true);
      setTimeout(() => {
        navigate('/Cart');
      }, 2000);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!product) {
    return <p>Produto não encontrado</p>;
  }

  return (
    <div className="product-details">
      <div className="product-image-container">
        <img src={product.image || '/default-image.jpg'} alt={product.name} className="product-details-image" />
      </div>
   
      <div className="product-info">
        <h1>Detalhes da compra</h1>
        <p className="product-name">{product.name}</p>
        <p className="product-description">{product.description}</p>
        <p className="product-category">{product.category}</p>
        <div className="product-price">
          <p><strong>Preço:</strong> ${product.price}</p>
        </div>
      </div>

      <div className="Cardapio">
        <h1>Cardápio</h1>
        <p className="title-cardapio">Escolha o Refrigerante</p>
        <div className="acompanhamentos-container">
          {acompanhamento_refri.map((item, index) => (
            <div key={index} className="explore-menu-list-coca">
              <img src={item.acompanhamento_image} alt={item.acompanhamento_name} className="acompanhamento-image" />
              <p>{item.acompanhamento_name}</p>
              <p className='preco'><strong>Preço:</strong> {item.preco}</p>
              <input
                type="checkbox"
                onChange={(e) => handleCheckboxChange(e, item)}
                checked={selectedItems.some(selected => selected.name === item.acompanhamento_name)}
              />
            </div>
          ))}
        </div>

        <p className="title-cardapio">Escolha o Arroz</p>
        <div className="acompanhamentos-container">
          {acompanhamento_arroz.map((item, index) => (
            <div key={index} className="explore-menu-list-coca">
              <img src={item.acompanhamento_arroz_image} alt={item.acompanhamento_arroz_name} className="acompanhamento-image" />
              <p>{item.acompanhamento_arroz_name}</p>
              <p className='preco'><strong>Preço:</strong> {item.preco}</p>
              <input
                type="checkbox"
                onChange={(e) => handleCheckboxChange(e, item)}
                checked={selectedItems.some(selected => selected.name === item.acompanhamento_arroz_name)}
              />
            </div>
          ))}
        </div>

        <p className="title-cardapio">Escolha a Batata</p>
        <div className="acompanhamentos-container">
          {acompanhamento_batata.map((item, index) => (
            <div key={index} className="explore-menu-list-coca">
              <img src={item.acompanhamento_batata_image} alt={item.acompanhamento_batata_name} className="acompanhamento-image" />
              <p>{item.acompanhamento_batata_name}</p>
              <p className='preco'><strong>Preço:</strong> {item.preco}</p>
              <input
                type="checkbox"
                onChange={(e) => handleCheckboxChange(e, item)}
                checked={selectedItems.some(selected => selected.name === item.acompanhamento_batata_name)}
              />
            </div>
          ))}
        </div>

        <p className="title-cardapio">Escolha o Principal</p>
        <div className="acompanhamentos-container">
          {acompanhamento_principal.map((item, index) => (
            <div key={index} className="explore-menu-list-coca">
              <img src={item.acompanhamento_pricipal_image} alt={item.acompanhamento_principal_name} className="acompanhamento-image" />
              <p>{item.acompanhamento_principal_name}</p>
              <p className='preco'>Preço: {item.preco}</p>
              <input
                type="checkbox"
                onChange={(e) => handleCheckboxChange(e, item)}
                checked={selectedItems.some(selected => selected.name === item.acompanhamento_principal_name)}
              />
            </div>
          ))}
        </div>
      </div>

      <button className="add-to-cart-button" onClick={handleAddToCart}>Adicionar ao Carrinho</button>

      {modalVisible && (
        <div className="custom-alert-modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>×</span>
            <h2>Produto Adicionado ao Carrinho</h2>
            <p>
              O produto <strong>{product.name}</strong> com os acompanhamentos{' '}
              <strong>{selectedItems.map(item => item.name).join(', ')}</strong> foi adicionado ao carrinho.
            </p>
            <p><strong>Total:</strong> R${product.price + selectedItems.reduce((sum, item) => sum + item.price, 0)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PagesDetails;
