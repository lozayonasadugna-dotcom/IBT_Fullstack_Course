import { useState } from "react";

function OrderForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole"
  });

  // Validates TeleBirr numbers starting with 09... or +2519...
  const isPhoneValid = /^(?:\+2519|09)\d{8}$/.test(form.phone);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Order submitted for ${form.name} in ${form.area}!`);
  }

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <h3>Delivery Details</h3>
      <div>
        <label>Name: </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          required
        />
      </div>

      <div>
        <label>TeleBirr Phone: </label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="0911223344 or +251911223344"
        />
        {form.phone && !isPhoneValid && (
          <p className="error">Enter a valid TeleBirr number (09... or +2519...)</p>
        )}
      </div>

      <div>
        <label>Area: </label>
        <select name="area" value={form.area} onChange={handleChange}>
          <option value="Bole">Bole</option>
          <option value="Kazanchis">Kazanchis</option>
          <option value="Piassa">Piassa</option>
          <option value="CMC">CMC</option>
        </select>
      </div>

      <button type="submit" disabled={!isPhoneValid || !form.name}>
        Pay with TeleBirr
      </button>
    </form>
  );
}

export default OrderForm;