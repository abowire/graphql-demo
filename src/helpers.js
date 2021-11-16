function renderCustomerList(customers) {
  const html = customers
    .map((customer) => `<li>${customer.email}</li>`)
    .join("");

  document.getElementById("customers").innerHTML = html;
}

module.exports = {
  renderCustomerList,
};
