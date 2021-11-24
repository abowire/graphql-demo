const Abowire = require("./abowire");
const { updateStatus, handleErrors, checkSettings } = require("./helpers");

// Get this token from the backend
const ABOWIRE_TOKEN = "";

// A predefined Product ID to subscribe a customer to
const PRODUCT_ID = "";

// Check that the if required settings are defined
checkSettings(ABOWIRE_TOKEN, PRODUCT_ID);

// Create Abowire GraphQL Client
const abowire = new Abowire(ABOWIRE_TOKEN);

let customer;
let subscription;

// Event handler for the "get customers" button
async function onGetCustomersClick() {
  try {
    updateStatus("Retrieving customer list...");
    updateStatus("Retrieved customer list", await abowire.getCustomers());
  } catch (err) {
    handleErrors(err);
  }
}

// Event handler for the "create customers" button
async function onCreateCustomerClick() {
  try {
    updateStatus("Creating customer...");

    // Create a customer
    customer = await abowire.createCustomer({
      locale: "en_UK",
      personProfile: {
        email: "test+gql2@abowire.com",
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

    updateStatus("Created customer", customer);
  } catch (err) {
    handleErrors(err);
  }
}

// Event handler for the "subscribe" button
async function onSubscribeClick() {
  if (!customer || !PRODUCT_ID) {
    return;
  }

  try {
    updateStatus("Creating subscription...");

    subscription = await abowire.subscribe(customer.id, PRODUCT_ID);

    updateStatus("Created subscription", subscription);
  } catch (err) {
    handleErrors(err);
  }
}

// Event handler for the "attache payment method" button
async function onPaymentMethodClick() {
  if (!customer) {
    return;
  }

  try {
    updateStatus("Attaching payment method...");

    const paymentMethod = await abowire.addPaymentMethod("wire-transfer", {
      subscriptionId: subscription.id,
    });

    updateStatus("Attached payment method", paymentMethod);
  } catch (err) {
    handleErrors(err);
  }
}

// Event handler for the "list invoices" button
async function onInvoicesClick() {
  if (!customer) {
    return;
  }

  try {
    updateStatus("Retrieving invoices...");
    updateStatus(
      "Retrieved invoices",
      await abowire.getCustomerInvoices(customer.id)
    );
  } catch (err) {
    handleErrors(err);
  }
}

// Attach the event listeners for each button
(async () => {
  document
    .getElementById("get-customers")
    .addEventListener("click", onGetCustomersClick);

  document
    .getElementById("create-customer")
    .addEventListener("click", onCreateCustomerClick);

  document
    .getElementById("subscribe-customer")
    .addEventListener("click", onSubscribeClick);

  document
    .getElementById("customer-payment-method")
    .addEventListener("click", onPaymentMethodClick);

  document
    .getElementById("customer-invoices")
    .addEventListener("click", onInvoicesClick);
})();
