import PropTypes from "prop-types";
import React from "react";
import Helmet from "react-helmet";
import { injectIntl } from "react-intl";
import { compose } from "redux";
// components
import Body from "~/components/Body";
import Layout from "~/components/Layout";
import AccountsContainer from "~/containers/accounts";
// containers
import APIContainer from "~/containers/api_data";
import NonUserRedir from "~/containers/non_user_redir";
// styles
import TranslationsDevolutives from "./TranslationDevolutives";

const params = new URLSearchParams(document.location.search.substring(1));
const locale = params.get("lang") || process.env.DEFAULT_LOCALE;

class Translations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingTranslations: false,
    };
  }

  getLang() {
    return localStorage.getItem("lang") || locale;
  }

  getSecondLang() {
    return localStorage.getItem("secondLang");
  }

  translate(id) {
    return this.props.intl.formatMessage({ id });
  }

  render() {
    return (
      <Layout pageHeader={this.translate("Translations.title")}>
        <Helmet title={this.translate("Translations.title")} />

        <Body>
          <TranslationsDevolutives languages={this.props.languages} />
        </Body>
      </Layout>
    );
  }
}

Translations.propTypes = {
  apiData: PropTypes.object.isRequired,
};

export default injectIntl(
  compose(AccountsContainer, APIContainer, NonUserRedir)(Translations)
);
