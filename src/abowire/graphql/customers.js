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
      billingProfile {
        type
      }
      metadata
      locale
      createdAt
      updatedAt
    }
  }
`;

const CREATE_WIRE_TRANSFER = gql`
  mutation subscriptionAddWireTransferReference($id: SubscriptionID!) {
    subscriptionAddWireTransferReference(id: $id) {
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

const GET_CUSTOMER_INVOICES = gql`
  query getCustomerInvoices($id: CustomerID!) {
    id
    email
    name
    invoices {
      id
      subscription {
        id
      }
      createdAt
    }
  }
`;

module.exports = {
  GET_CUSTOMERS,
  CREATE_CUSTOMER,
  CREATE_WIRE_TRANSFER,
  SUBSCRIBE_CUSTOMER_TO_PLAN,
  GET_CUSTOMER_INVOICES,
};
