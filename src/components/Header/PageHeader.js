import React from "react";
import { injectIntl } from "react-intl";
import parse from "html-react-parser";

import { isTeacher, isDirector, isStateAdmin } from "~/helpers/users";
import styles from "./Header.styl";
import { isEmpty } from "lodash";

class PageHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModalTutorial: false,
		};
	}

	translate = (id) => this.props.intl.formatMessage({ id });

	render() {
		const { user } = this.props;
		const { name } = user;
		const isAnonimous = isEmpty(name) || name == "Anonymous";
		const salute = this.translate("PageHeader.hello");

		return (
			<div className={styles.pageHeader}>
				<h1 className="is-size-3 mb-15 has-text-weight-light">
					{salute}
					{isAnonimous ? "" : `, ${name}`}!
				</h1>
				<p>
					{isTeacher(user)
						? parse(this.translate("PageHeader.teacherMsg"))
						: isDirector(user)
						? parse(this.translate("PageHeader.principalMsg"))
						: isStateAdmin(user)
						? parse(this.translate("PageHeader.adminStateMsg"))
						: null}
				</p>
			</div>
		);
	}
}

export default injectIntl(PageHeader);
