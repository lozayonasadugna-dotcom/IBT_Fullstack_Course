function Dish({ name, price }) {
  return (
    <div className="Dish">
      <h3>{name}</h3>
      <p>{price} ETB</p>
    </div>
  );
}

export default Dish;