const { gql } = require("@apollo/client/core");

const GET_CUSTOMERS = gql`
  query GetCustomers($pagination: PageQuery) {
    customers(pagination: $pagination) {
      items {
        id
        email
        name
        metadata
        locale
        createdAt
        updatedAt
      }

      meta {
        currentPage
        itemCount
        itemsPerPage
        totalItems
        totalPages
      }
    }
  }
`;

const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($data: CustomerCreateDTO) {
    customerCreate(data: $data) {
      id
      email
      name
    }
  }
`;

const SUBSCRIBE_CUSTOMER_TO_PLAN = gql`
  mutation customerSubscribe($customerId: CustomerID!, $productId: ProductID!) {
    customerSubscribe(customerId: $customerId, productId: $productId) {
      id
      name
      price
      usage
      status
      currentPeriodStart
      currentPeriodEnd
      currentPeriod
      createdAt
    }
  }
`;

module.exports = {
  GET_CUSTOMERS,
  CREATE_CUSTOMER,
  SUBSCRIBE_CUSTOMER_TO_PLAN,
};
