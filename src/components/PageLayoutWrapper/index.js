import React from "react";
import { compose } from "redux";
import { injectIntl } from "react-intl";
import Helmet from "react-helmet";

import Layout from "~/components/Layout";
import Body from "~/components/Body";

import APIDataContainer from "~/containers/api_data";
import AccountsContainer from "~/containers/accounts";

const PageLayoutWrapper = ({
  pageTitle,
  intl,
  accounts,
  apiData,
  children,
}) => {
  const { user } = accounts;

  const params = new URLSearchParams(document.location.search.substring(1));
  const locale = params.get("lang") || process.env.DEFAULT_LOCALE;

  // Define localization helpers
  const lang = localStorage.getItem("lang") || locale;
  const l = (id) => intl.formatMessage({ id });

  // Clone children and pass additional props only to custom React components
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && typeof child.type === "function") {
      return React.cloneElement(child, { l, lang, params, user, apiData });
    }
    return child;
  });

  return (
    <Layout>
      <Helmet title={pageTitle} />
      <Body>{childrenWithProps}</Body>
    </Layout>
  );
};

export default injectIntl(
  compose(APIDataContainer, AccountsContainer)(PageLayoutWrapper)
);
