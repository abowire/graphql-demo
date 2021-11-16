const { ApolloClient, InMemoryCache } = require("@apollo/client/core");
const {
  CREATE_CUSTOMER,
  GET_CUSTOMERS,
  SUBSCRIBE_CUSTOMER_TO_PLAN,
} = require("./graphql/customers");

class Abowire {
  constructor(accessToken) {
    this.accessToken = accessToken;

    this.client = new ApolloClient({
      uri: "https://graphql.abowire.com",
      cache: new InMemoryCache(),
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async query(query, pagination = { page: 1, itemsPerPage: 10 }) {
    const result = await this.client.query({
      query,
      variables: {
        pagination,
      },
    });

    return result.data;
  }

  async mutate(mutation, variables = {}) {
    const result = await this.client.mutate({
      mutation,
      variables,
    });

    return result.data;
  }

  async getCustomers(page = 1) {
    const result = await this.query(GET_CUSTOMERS, { page });

    return result.customers.items;
  }

  async createCustomer(data) {
    return this.mutate(CREATE_CUSTOMER, { data });
  }

  async subscribe(customerId, productId) {
    return this.mutate(SUBSCRIBE_CUSTOMER_TO_PLAN, {
      customerId,
      productId,
    });
  }
}

module.exports = Abowire;
