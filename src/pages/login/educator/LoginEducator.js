import React from "react";
import PropTypes from "prop-types";
import history from "~/core/history";
import SignInForm from "../components/SignInForm";
import AccountsContainer from "~/containers/accounts";
import { FormattedMessage, injectIntl } from "react-intl";
import parse from "html-react-parser";

import { redirectDefaultPageByUser } from "~/helpers/users";
import styles from "./LoginEducator.styl";
import classNames from "classnames";
import _ from "lodash";
import $ from "jquery";
import Dashboard from "../../../components/Dashboard";

import EducatorHowItWorksSection from "~/composables/EducatorHowItWorksSection";

export class LoginEducator extends React.Component {
  constructor(props) {
    super(props);
  }

  translate = (id) => this.props.intl.formatMessage({ id });

  componentDidMount() {
    if (!_.isEmpty(this.props.accounts.user)) {
      history.push(redirectDefaultPageByUser(this.props.accounts.user));
    }

    $(".btn-call-to-action").empty();
    $(".btn-call-to-action").html($("a.cadastro").clone());
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.accounts.user)) {
      history.push(redirectDefaultPageByUser(nextProps.accounts.user));
    }
  }

  render() {
    return (
      <section className="section pl-0 pr-0">
        <div
          className={classNames(
            "columns is-multiline is-marginless",
            styles.login
          )}
        >
          <div className={classNames("column is-full", styles.form)}>
            <section className={classNames("section", styles.section)}>
              <div className="container">
                <div className="columns">
                  <div className="column is-5">
                    <h1 className="stripe is-size-4-touch has-text-centered-mobile">
                      <FormattedMessage
                        id="LoginEducator.title"
                        values={{
                          brIsHiddenMobile: <br className="is-hidden-mobile" />,
                        }}
                      />
                      <strong>
                        {parse(this.translate("LoginEducator.teachers"))}
                      </strong>
                    </h1>
                    <Dashboard
                      type={["personal"]}
                      small={true}
                      clean={true}
                      centered={false}
                    />
                  </div>
                  <div className="column is-7">
                    <SignInForm type="educador" />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className={classNames("column is-full", styles.oque)}>
            <section className={classNames("section", styles.section)}>
              <div className="container">
                <div className="columns align-center">
                  <div
                    className={classNames(
                      "column is-5 is-5-widescreen has-text-centered-mobile has-text-left",
                      styles.call
                    )}
                  >
                    <h2 className="is-size-4-mobile">
                      {parse(this.translate("LoginEducator.whatIs"))}
                    </h2>
                    <p>
                      {parse(
                        this.translate(
                          "LoginEducator.descriptionSelfEvaluation"
                        )
                      )}
                    </p>
                  </div>
                  <div
                    className={classNames(
                      "column is-7 is-7-widescreen",
                      styles.video
                    )}
                  >
                    <img
                      className={classNames(styles.big_image, styles.espelho)}
                      src={require("../../../../public/images/icons/espelho.svg")}
                      alt=""
                      style={{ float: "right" }}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className={classNames("column is-full", styles.porque)}>
            <section className={classNames("section", styles.section)}>
              <div className="container">
                <div className="columns align-center">
                  <div className="column is-5 is-4-widescreen is-offset-1-widescreen">
                    <img
                      className={styles.big_image}
                      src={require("../../../../public/images/icons/foguete.svg")}
                      alt=""
                    />
                  </div>
                  <div
                    className={classNames(
                      "column is-7 is-6-widescreen has-text-centered-mobile has-text-right",
                      styles.call
                    )}
                  >
                    <h2 className="is-size-3-mobile">
                      {parse(this.translate("LoginEducator.titleWhyUse"))}
                    </h2>
                    <p>
                      {parse(this.translate("LoginEducator.descriptionWhyUse"))}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <EducatorHowItWorksSection translate={this.translate} />
          <div className={classNames("column is-full", styles.devolutive)}>
            <section className={classNames("section", styles.section)}>
              <div className="container">
                <div className="columns">
                  <div className="column is-10 is-offset-1 has-text-centered-mobile">
                    <h2 className="is-size-3-mobile">
                      {parse(this.translate("LoginEducator.devolutive"))}
                    </h2>
                  </div>
                </div>
                <div className="columns align-center">
                  <div className="column is-8">
                    <div className={classNames("columns", styles.diagram)}>
                      <div className="column is-one-quarter is-paddingless">
                        <img
                          className="image is-64x64"
                          src={require("../../../../public/images/icons/devolutiva-onde-estou.svg")}
                          alt=""
                        />
                        <span>
                          {parse(this.translate("LoginEducator.whereAmI"))}
                        </span>
                      </div>
                      <div className="column is-hidden-mobile"></div>
                      <div className="column is-one-quarter is-paddingless">
                        <img
                          className="image is-64x64"
                          src={require("../../../../public/images/icons/devolutiva-isso-significa.svg")}
                          alt=""
                        />
                        <span>
                          {parse(this.translate("LoginEducator.whatMean"))}
                        </span>
                      </div>
                      <div className="column is-hidden-mobile"></div>
                      <div className="column is-one-quarter is-paddingless">
                        <img
                          className="image is-64x64"
                          src={require("../../../../public/images/icons/devolutiva-posso-evoluir.svg")}
                          alt=""
                        />
                        <span>
                          {parse(this.translate("LoginEducator.howEvolve"))}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="column is-4 has-text-centered-mobile has-text-right">
                    <p>
                      {parse(
                        this.translate("LoginEducator.devolutiveDescription")
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div
            className={classNames(
              "column has-text-centered",
              styles.calltoaction
            )}
          >
            <section className={classNames("section", styles.section)}>
              <div className="container">
                <h2 className="is-size-4-mobile">
                  <FormattedMessage
                    id="LoginEducator.startNow"
                    values={{
                      brIsHiddenTablet: <br className="is-hidden-tablet" />,
                    }}
                  />
                  <span className="is-size-5-mobile">
                    {parse(
                      this.translate("LoginEducator.startNowSelfEvaluation")
                    )}
                  </span>
                </h2>
                <div className="btn-call-to-action"></div>
              </div>
            </section>
          </div>
          <div className={classNames("column is-full", styles.notes)}>
            <section className={classNames("section", styles.section)}>
              <div className="container">
                <p>{parse(this.translate("LoginEducator.notes1"))}</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    );
  }
}

LoginEducator.propTypes = {
  accounts: PropTypes.object.isRequired,
};

export default injectIntl(AccountsContainer(LoginEducator));
