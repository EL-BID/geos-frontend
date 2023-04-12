import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import { compose } from "redux";
import validate from "validate.js";
import _ from "lodash";
import classnames from "classnames";
import {
  FormattedMessage,
  FormattedHTMLMessage,
  injectIntl,
  intlShape,
} from "react-intl";
import parse from "html-react-parser";
import SchoolFormSurvey from "../../pages/school/components/SchoolForm/SchoolFormSurvey";
import API from "~/api";
import history from "~/core/history";

// Components
import schema from "./schema";
import Modal from "~/components/Modal";

// Containers
import APIDataContainer from "~/containers/api_data";
import AccountsContainer from "~/containers/accounts";

import styles from "./InfrastructureFormModal.styl";

class InfrastructureFormModal extends React.Component {

  constructor() {
    super();
    this.forceSubmitBeforeClose = false;
    this.submitted = false;
  }

  componentDidMount() {
    if (this.props.schoolId)
      this.props.fetchSchool(this.props.accounts.user.school_id.$oid);
  }

  componentDidMount() {
    //const school = this.props.accounts.user.school;
    this.forceSubmitBeforeClose = !!this.props.forceSubmitBeforeClose;
  }

  translate(id) {
    return this.props.intl.formatMessage({ id });
  }

  _closeModal() {
    if (this.forceSubmitBeforeClose && !this.submitted) {
      console.log("Por favor llene el formulario");
      return;
    }

    this.props.toggleModal();
    history.replace("/recursos");
  }

  render() {
    const { fields, handleSubmit, submitting } = this.props;

    return (
      <Modal
        title={this.translate("InfraStructureFormModal.title")}
        isActive={this.props.isActive}
        closeModal={() => this._closeModal()}
      >
        <SchoolFormSurvey
          idSchool={this.props.schoolId}
          hideSchoolData={true}
          hideEducationLevel={true}
          despuesDeEnviar={() => this.submitted = true}
        />
      </Modal>
    );
  }
}

InfrastructureFormModal.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default injectIntl(
  reduxForm({
    form: "infrastructureFormModal",
    fields: _.keys(schema),
  })(compose(APIDataContainer, AccountsContainer)(InfrastructureFormModal))
);
