const Abowire = require("./abowire");
const { renderCustomerList } = require("./helpers");

// Get this token from the backend
const ABOWIRE_TOKEN = "";

// Create Abowire GraphQL Client
const abowire = new Abowire(ABOWIRE_TOKEN);

async function onCreateCustomerClick() {
  // Create a customer
  const customer = await abowire.createCustomer({
    locale: "en_UK",
    email: "test+gql@abowire.com",
    personProfile: {
      firstName: "john",
      lastName: "doe",
    },
    billingProfile: {
      country: "ES",
      address: "Test 123",
      city: "Valencia",
      postalCode: "234234",
    },
  });

  // Subscribe the customer to a product
  const subscription = await abowire.subscribe(customer.id, productId);

  // Attach the wire transfer payment method
  await abowire.addPaymentMethod("wire-transfer", {
    subscriptionId: subscription.id,
  });

  // Get a list of the invoices
  const invoices = await abowire.getCustomerInvoices(customer.id);

  console.log(invoices);

  // Reload the customer list
  await loadCustomerList();
}

async function loadCustomerList() {
  const customers = await abowire.getCustomers();

  renderCustomerList(customers);
}

// Load the initial list
(async () => {
  await loadCustomerList();

  document
    .getElementById("create-customer")
    .addEventListener("click", onCreateCustomerClick);
})();
