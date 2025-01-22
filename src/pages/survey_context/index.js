import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { injectIntl } from "react-intl";
import Helmet from "react-helmet";

import Layout from "~/components/Layout";
import Body from "~/components/Body";
import PageHeader from "~/components/Header/PageHeader";
import styles from "./styles.styl";

import APIDataContainer from "~/containers/api_data";
import AccountsContainer from "~/containers/accounts";
import NonUserRedir from "~/containers/non_user_redir";

import { FetchContextSurvey } from "./Api";
import Form from "./Form";

const d = console.log;
const j = (m) => JSON.stringify(m, null, 4);

const SurveyContext = ({ intl, accounts, apiData }) => {
  const { user } = accounts;
  const l = (id) => intl.formatMessage({ id });

  const [survey, setSurvey] = useState(null);

  //On Mount
  useEffect(() => {
    //Fetch Condtext Survey
    FetchContextSurvey().then((data) => {
      setSurvey(data);
    });
  }, []);

  return (
    <Layout className={styles.layout}>
      <Helmet title="Context Survey" />
      <Body>
        <Header user={user} />
        {survey && <Form l={l} survey={survey} />}
      </Body>
    </Layout>
  );
};

const Header = ({ user }) => {
  return (
    <section className="section pb-0">
      <div className="container">
        <div className="columns">
          <div className="column">
            <PageHeader user={user} />
          </div>
        </div>
      </div>
    </section>
  );
};

SurveyContext.propTypes = {};

export default injectIntl(
  compose(APIDataContainer, AccountsContainer, NonUserRedir)(SurveyContext)
);
