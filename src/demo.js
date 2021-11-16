const Abowire = require("./abowire");
const { renderCustomerList } = require("./helpers");

// Get this token from the backend
const ABOWIRE_TOKEN = "";

// Create Abowire GraphQL Client
const abowire = new Abowire(ABOWIRE_TOKEN);

// Demo calls
abowire
  .getCustomers()
  .then((customers) => renderCustomerList(customers))
  .catch((err) => console.error(err));
