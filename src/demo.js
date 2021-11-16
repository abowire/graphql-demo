const Abowire = require("./abowire");
const {
  GET_CUSTOMERS,
  CREATE_CUSTOMER,
  SUBSCRIBE_CUSTOMER_TO_PLAN,
} = require("./abowire/graphql/customers");

// Get this token from the backend
const ABOWIRE_TOKEN = "";

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
