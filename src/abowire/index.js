const { ApolloClient, InMemoryCache } = require("@apollo/client/core");

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
}

module.exports = Abowire;
