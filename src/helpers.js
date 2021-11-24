const { ApolloError } = require("@apollo/client/core");

function updateStatus(text, opts) {
  const element = document.getElementById("status");

  element.innerHTML += `\n${text} ${
    opts ? JSON.stringify(opts, null, 2) : ""
  }\n`;

  element.scrollTop = element.scrollHeight;
}

function handleErrors(err) {
  if (err instanceof ApolloError) {
    if (err.networkError && err.networkError.result.errors) {
      updateStatus(
        "GraphQL network error",
        err.networkError.result.errors.map((error) => error.message).join()
      );
    }

    if (err.clientErrors.length > 0) {
      updateStatus("GraphQL client error", err.clientErrors);
    }

    if (err.graphQLErrors.length > 0) {
      updateStatus("GraphQL server error", err.graphQLErrors);
    }
  } else {
    updateStatus("Error", err);
  }

  throw err;
}

function checkSettings(ABOWIRE_TOKEN, PRODUCT_ID) {
  if (!ABOWIRE_TOKEN) {
    updateStatus("Please set an ABOWIRE_TOKEN in demo.js");
    throw new Error();
  }

  if (!PRODUCT_ID) {
    updateStatus("Please set an PRODUCT_ID in demo.js");
    throw new Error();
  }

  updateStatus("Hint: Click the buttons in order");
}

module.exports = {
  updateStatus,
  handleErrors,
  checkSettings,
};
