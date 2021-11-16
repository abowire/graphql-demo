const Abowire = require("./abowire");
const {
  GET_CUSTOMERS,
  CREATE_CUSTOMER,
  SUBSCRIBE_CUSTOMER_TO_PLAN,
} = require("./abowire/graphql/customers");

const ABOWIRE_TOKEN =
  "vSVcKTAyre37K3xkNxT5xo6dctjAaA99XqEWxrwjTTs.hto5kUyC20vcHt55E4zrkgM7Eq5FZ37ZMNGSViFQ0pY";

const abowire = new Abowire(ABOWIRE_TOKEN);

async function getCustomers(page = 1) {
  const result = await abowire.query(GET_CUSTOMERS, { page });

  return result.customers.items;
}

async function createCustomer(data) {
  return abowire.mutate(CREATE_CUSTOMER, { data });
}

async function subscribe(customerId, productId) {
  return abowire.mutate(SUBSCRIBE_CUSTOMER_TO_PLAN, { customerId, productId });
}

// Demo calls
// getCustomers()
//   .then((customers) => {
//     const html = customers
//       .map((customer) => `<li>${customer.email}</li>`)
//       .join("");

//     document.getElementById("customers").innerHTML = html;
//   })
// .then(
createCustomer({ email: "mail+111@alanreid.de" })
  // )
  .catch((err) => console.error(err));
