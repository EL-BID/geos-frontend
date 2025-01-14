import React from "react";
import Helmet from "react-helmet";
import classnames from "classnames";
import { compose } from "redux";
import { injectIntl } from "react-intl";
import parse from "html-react-parser";

// Components
import SignUpForm from "./SignUpForm";
import Layout from "../../components/Layout";
import Body from "../../components/Body";

// Containers
import UserRedir from "~/containers/user_redir";

// Style
import styles from "./styles.styl";

class SignUp extends React.Component {
  translate(id) {
    return this.props.intl.formatMessage({ id });
  }

  render() {
    let profile = "";
    let isHeader = true;

    const path = this.props.route.path;

    //User profile
    if (path.endsWith("/escola")) {
      isHeader = false;
      profile = "principal";
    } else if (path.endsWith("/educador")) {
      isHeader = false;
      profile = "teacher";
    } else {
      isHeader = true;
      profile = "other";
    }

    return (
      <Layout className={styles.layout} pageHeader="Criar conta">
        <Helmet
          title={this.props.intl.formatMessage({ id: "SignUp.helmetTitle" })}
        />

        <Body className="container">
          <section className="section">
            <div className={classnames("columns is-multiline", styles.section)}>
              {isHeader ? (
                <div className="column is-full">
                  <div
                    className={classnames(
                      "title is-5 mb-15",
                      styles.header__holder
                    )}
                  >
                    {parse(this.translate("SignUp.firstAccessTitle"))}
                    {profile === "teacher"
                      ? parse(this.translate("SignUp.teacher"))
                      : profile === "principal"
                      ? parse(this.translate("SignUp.director"))
                      : parse(this.translate("SignUp.adminState"))}
                  </div>

                  {profile === "teacher" ? (
                    <p>
                      {parse(this.translate("SignUp.descriptionTeacher1"))}
                      <span className={styles.highlighted}>
                        {parse(this.translate("SignUp.descriptionTeacher2"))}
                      </span>
                    </p>
                  ) : profile === "principal" ? (
                    <p>
                      {parse(this.translate("SignUp.descriptionDirector1"))}
                      <span className={styles.highlighted}>
                        {parse(this.translate("SignUp.descriptionDirector2"))}
                      </span>
                    </p>
                  ) : (
                    <p>
                      {parse(this.translate("SignUp.descriptionAdminState"))}
                    </p>
                  )}
                </div>
              ) : null}
              <div className="column is-full">
                <SignUpForm
                  profile={profile}
                  isRouteConfig={!isHeader}
                  styles={styles}
                />
              </div>
            </div>
          </section>
        </Body>
      </Layout>
    );
  }
}

export default injectIntl(compose(UserRedir)(SignUp));
