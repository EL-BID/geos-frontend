import React from "react";
import Helmet from "react-helmet";

import {injectIntl} from "react-intl";

import Layout from "../../components/Layout";
import Body from "../../components/Body";


class PrivacyNotice extends React.Component {
  constructor() {
    super();
  }


  componentDidMount(){
    OneTrust.NoticeApi.Initialized.then(function() {
        OneTrust.NoticeApi.LoadNotices(["https://privacyportal-cdn.onetrust.com/95fde4ae-d4a8-40df-8d0f-755994f74dc5/privacy-notices/4cf5effc-3048-4585-91c1-6495a23ee037.json"]);
      });
  }

  translate(id) {
    return this.props.intl.formatMessage({ id });
  }
  render() {
    return (
      <div>
        
          <Layout>
            <Helmet title="Guia EduTec" />
            <Body>
                <div id="otnotice-4cf5effc-3048-4585-91c1-6495a23ee037" class="otnotice"></div>
            </Body>
          </Layout>
    
      </div>
    );
  }
}

export default injectIntl(PrivacyNotice);
