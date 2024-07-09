import React from "react";
import Helmet from "react-helmet";
import classnames from "classnames";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import parse from "html-react-parser";
import styles from "./home.styl";
import Layout from "../../components/Layout";
import Body from "../../components/Body";
import Dashboard from "../../components/Dashboard";
import Profile from "./components/Profile";
import DropdownLanguage from "../../components/Header/DropdownLanguage";
import CONF from "~/api/index";
import history from "~/core/history";
import axios from "axios";
import LogoGuiaEdutec from "../../components/LogoGuiaEdutec";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      setupIsDone: true,
    };
  }
  async fetchSetupData() {
    const URL_REQUEST = CONF.ApiURL + "/api/v1/setup/";
    const response = await axios.get(URL_REQUEST);
    const { setupIsDone } = response.data.data;
    this.setState({ setupIsDone });
    return setupIsDone;
  }

  async componentDidMount() {
    const setupIsDone = await this.fetchSetupData();
    if (!setupIsDone) {
      history.push("/init-setup");
    }
  }

  translate(id) {
    return this.props.intl.formatMessage({ id });
  }
  render() {
    return (
      <div className={styles.site}>
        {this.state.setupIsDone && (
          <Layout>
            <Helmet title="Guia EduTec" />
            <Body>
              <section className="section">
                <div className={classnames(styles.site__content, "container")}>
                  <div
                    className={classnames(
                      "columns is-multiline",
                      styles.initial
                    )}
                  >
                    <LogoGuiaEdutec bgDark={true} />
                    {
                      parse(this.translate("Home.title")) != " " &&
                      <p>{parse(this.translate("Home.title"))}</p>
                    }
                    
                  </div>
                  <div className="column is-full">
                    <h3
                      className="has-text-weight-bold is-size-6"
                      style={{ marginBottom: "20px" }}
                    >
                      {parse(this.translate("Home.description"))}
                    </h3>
                  </div>
                  <Profile />
                </div>
              </section>

              <section className={styles.what_is}>
                <div className={classnames(styles.site__content, "container")}>
                  <div className={styles.content}>
                    <h4 className="is-size-3 mb-10">
                      Articulación BID, Guia Edutec
                    </h4>
                    <div className="columns">
                      <div className="column is-half">
                        
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        
                      </div>
                      <div className="column is-half">
                        <p>
                        Dignissim suspendisse in est ante in. Tortor at risus viverra adipiscing at. Neque vitae tempus quam pellentesque nec nam aliquam. Gravida cum sociis natoque penatibus et magnis dis. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Imperdiet sed euismod nisi porta. Ipsum faucibus vitae aliquet nec ullamcorper sit. Mauris ultrices eros in cursus turpis. Ornare massa eget egestas purus.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section> 
            </Body>
          </Layout>
        )}
      </div>
    );
  }
}

export default injectIntl(Home);
