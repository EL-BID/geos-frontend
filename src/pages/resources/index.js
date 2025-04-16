import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Helmet from "react-helmet";
import _ from "lodash";
import { compose } from "redux";
import { injectIntl } from "react-intl";
import parse from "html-react-parser";
import PageHeader from "~/components/Header/PageHeader";
import schema from "./schema";
import "!style!css!react-accessible-accordion/dist/minimal-example.css";
import "!style!css!react-accessible-accordion/dist/fancy-example.css";
import APIDataContainer from "~/containers/api_data";

import history from "~/core/history";
import AccountsContainer from "~/containers/accounts";
import NonUserRedir from "~/containers/non_user_redir";
import { isDirector, isTeacher } from "~/helpers/users";
import {
	setSelectedSurvey,
	removeSelectedSurvey,
	setSelectedAnswer,
	surveyAnswered,
} from "~/actions/survey";
import { getUserToken, getUserId } from "~/api/utils";

import Layout from "~/components/Layout";
import Body from "~/components/Body";
import InfrastructureFormModal from "~/components/InfrastructureFormModal";
import ModalContainer from "~/containers/modal";
import Modal from "~/components/Modal";
import EducatorHowItWorksSection from "~/composables/EducatorHowItWorksSection";

import styles from "./Resources.styl";

import CONF from "~/api/index";
import axios from "axios";
import API from "~/api";
import $ from "jquery";
import { reduxForm } from "redux-form";

import SurveysList from "./components/SurveysList";
import { FetchSurveysLegacy, FetchContextSurvey } from "~/api/Survey";

const d = console.log;
const j = (m) => JSON.stringify(m, null, 4);

class Resources extends React.Component {
	constructor() {
		super();
		removeSelectedSurvey();
		this.state = {
			surveys: [],
			institutionHasSchoolPlan: false,
			schoolHasPlan: false,
			institution: [],
			loading: true,
			loadingTerm: false,
			modalResend: false,
			emailResend: "",
			dataResend: {},
			loadingResend: false,
			loadingEmailResend: false,
			statusResend: 0,
			validResend: false,
			tutorial: [],
			hasUser: false,
			showModalHowItWorks: false,
			contextSurvey: null,
		};
		this.handleCensusEdit = this.handleCensusEdit.bind(this);
		this.handleInfrastructure = this.handleInfrastructure.bind(this);
		this.handleAcceptedTerm = this.handleAcceptedTerm.bind(this);
		this.infrastructureModalForceSubmitBeforeClose = false;
	}

	getLang = () => {
		return localStorage.getItem("lang") || process.env.DEFAULT_LOCALE;
	};

	componentDidMount = () => {
		this.props.fetchTranslations(this.getLang());
		this.getSurveys();

		//Detect if we are coming from a survey then auto-open the Infraestructure Survey.
		//This is done by inspecting the URL for a ?from=survey signal
		if (document.location.search.includes("from=survey")) {
			this.infrastructureModalForceSubmitBeforeClose = true;
			this.handleInfrastructure();
		}
	};

	componentDidUpdate = (prevProps) => {
		const user = this.props.accounts.user;
		const prevUser = prevProps.accounts.user;
		if (prevUser === user && !this.state.hasUser) {
			this.setState({ hasUser: true });
		}
	};

	componentWillReceiveProps(nextProps) {
		if (this.props.accounts.user !== nextProps.accounts.user) {
			this.checkSurveyInvited(nextProps.accounts.user);
		}
	}

	hasInvitedSurvey(surveyId, inviteds) {
		let survey = inviteds.find((i) => i.survey_id.$oid == surveyId);
		return survey != undefined;
	}

	checkSurveyInvited(user) {
		const _this = this;
		_this.state.surveys.forEach(function (survey) {
			if (user.invited_survey && user.invited_survey.length > 0) {
				if (_this.hasInvitedSurvey(survey.id, user.invited_survey)) {
					survey.type_invited = true;
				}
			}
		});
		if (user && isTeacher(user)) {
			_this.state.surveys.sort((a, b) => (a.type > b.type ? 1 : -1));
		} else {
			_this.state.surveys.sort((a, b) => (a.type < b.type ? 1 : -1));
		}
	}

	getSurveys = () => {
		FetchSurveysLegacy().then((surveys) => {
			this.setState({
				surveys,
				loading: false,
			});

			var has_anwers = false;
			surveys.forEach(function (survey) {
				if (
					survey.type === "school" &&
					surveyAnswered(survey, getUserId())
				) {
					has_anwers = true;
				}
			});
			this.checkSurveyInvited(this.props.accounts.user);
			if (has_anwers) this.getHasSchoolPlan();
			this.getSchool();
		});
		FetchContextSurvey().then((contextSurvey) => {
			this.setState({
				contextSurvey,
			});
		});
	};

	getSchool = () => {
		const _this = this;

		if (_this.props.accounts.user && _this.props.accounts.user.school_id) {
			API.Schools.findOne(_this.props.accounts.user.school_id.$oid).then(
				(schoolFound) => {
					var hasPlan = schoolFound.plan ? true : false;
					_this.setState({
						schoolHasPlan: hasPlan,
						school: schoolFound,
					});
				}
			);
		}
	};

	getHasSchoolPlan = () => {
		const _this = this;
		if (isDirector(_this.props.accounts.user)) {
			axios
				.get(
					CONF.ApiURL +
						"/api/v1/user_institution?access_token=" +
						getUserToken(),
					{}
				)
				.then(function (institution) {
					var institutionHasSchoolPlan = false;
					if (institution.data) {
						institution.data[0].plans.forEach(function (
							plan,
							index
						) {
							if (plan.type === "Escola")
								institutionHasSchoolPlan = true;
						});
						_this.setState({
							institutionHasSchoolPlan: institutionHasSchoolPlan,
							institution: institution,
						});
					}
				});
		}
	};

	handleCensusEdit() {
		const _this = this;
		if (isDirector(_this.props.accounts.user)) {
			_this.props.toggleCensusModal();
			return;
		}
	}

	handleInfrastructure() {
		const _this = this;
		if (isDirector(_this.props.accounts.user)) {
			_this.props.toggleInfrastructureModal();
			return;
		}
	}

	acceptedTerm = () => {
		const _this = this;
		_this.setState({
			loadingTerm: true,
		});

		axios
			.post(
				CONF.ApiURL +
					"/api/v1/accepted_term?access_token=" +
					getUserToken(),
				{
					term: true,
				}
			)
			.then((res) => {
				const { user } = _this.props.accounts;
				user.term = true;

				_this.setState({
					loadingTerm: false,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	handleAcceptedTerm() {
		this.acceptedTerm();
	}

	gotToAnswers(survey, answer) {
		setSelectedSurvey(survey);
		setSelectedAnswer(answer);
		window.open("/acessar-respostas", "_blank");
	}

	_logout() {
		this.props.logoutUser();
		history.push("/");
	}

	combinedComplete(answer) {
		if (answer.type == "Combined") {
			return (
				answer.guests &&
				answer.guests.every(
					(g) => g.status.toLowerCase() == "respondido"
				)
			);
		} else {
			return false;
		}
	}

	_resendInvite = (el) => {
		let target = $(el.target).is("i")
			? $(el.target).parents("a")
			: $(el.target);
		let update = target.attr("data-update");
		let isNewUser = update != undefined && update == "true";
		let data = this.state.dataResend;
		let newEmail = this.props.fields.email.value;

		this.setState({
			loadingEmailResend: true,
		});

		axios
			.post(
				CONF.ApiURL +
					"/api/v1/resend_invite?id=" +
					data.user_id +
					"&access_token=" +
					getUserToken(),
				{
					user: {
						name: data.user_name,
						email: data.user_email,
						newEmail: isNewUser ? newEmail : null,
					},
					manager: { id: data.manager_id, name: data.manager_name },
					isNewUser: null,
				}
			)
			.then((res) => {
				this.setState({
					statusResend: res.status,
					validResend: res.data.valid,
				});

				if (res.data.valid && isNewUser) {
					$("a[data-email='" + data.user_email + "'").attr(
						"data-email",
						newEmail
					);
					this.setState({
						emailResend: newEmail,
					});
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.then((res) => {
				this.setState({
					loadingEmailResend: false,
				});
			});
	};

	_handleClickModal = (el) => {
		let target = $(el.target).is("i")
			? $(el.target).parents("a")
			: $(el.target);
		let id = target.attr("data-id");

		this.setState({
			modalResend: true,
			emailResend: target.attr("data-email"),
			dataResend: {
				user_id: id,
				user_name: target.attr("data-name"),
				user_email: target.attr("data-email"),
				manager_id: target.attr("data-manager-id"),
				manager_name: target.attr("data-manager-name"),
			},
		});

		if (target.attr("data-email") == "") {
			this.setState({
				loadingResend: true,
			});

			axios
				.get(
					CONF.ApiURL +
						"/api/v1/get_email_by_id?id=" +
						id +
						"&access_token=" +
						getUserToken(),
					{}
				)
				.then((res) => {
					let email = res.data != {} ? res.data.email : "";

					target.attr("data-email", email);
					this.setState({
						emailResend: email,
						loadingResend: false,
					});
				})
				.catch((err) => {
					console.log(err);
				})
				.then((res) => {
					this.setState({
						loadingResend: false,
					});
				});
		}
	};

	_closeModal = () => {
		this.props.fields.email.onChange("");
		this.setState({
			modalResend: false,
			statusResend: 0,
		});
	};

	translate = (id) => this.props.intl.formatMessage({ id });

	setShowModalHowItWorks = (show) => {
		this.setState({ showModalHowItWorks: show });
	};

	render() {
		const { user } = this.props.accounts;
		const { fields } = this.props;
		var openModalTerm =
			user == null || _.isEmpty(user) ? false : !user.term;
		var surveyType = isDirector(user)
			? "school"
			: isTeacher(user)
			? "personal"
			: "";
		if (
			this.state.surveys &&
			this.state.surveys.findIndex((s) => s.type == surveyType) > 0
		) {
			var survey = this.state.surveys.splice(
				this.state.surveys.findIndex((s) => s.type == surveyType),
				1
			);
			this.state.surveys.unshift(survey[0]);
		}

		return (
			<Layout bgSecondary={true}>
				<Helmet title={parse(this.translate("Resources.title"))} />
				<Body>
					<section className="section">
						<div className="container mb-50">
							<div className="columns">
								<div className="column">
									<PageHeader user={user} />
								</div>
							</div>
						</div>
						<div className="container mb-30">
							{this.state.school && isDirector(user) ? (
								<div
									className={classNames(
										"columns is-multiline",
										styles.header__surveys
									)}
								>
									<h2
										className={classNames(
											"column is-5",
											styles.school__name
										)}
									>
										<span>
											{parse(
												this.translate(
													"Resources.school"
												)
											)}
											:{" "}
										</span>
										{user.school_type == "Particular"
											? user.institution_name
											: this.state.school.name}
									</h2>
									{user.school_type != "Particular" && (
										<div
											className={classNames(
												"column is-7 has-text-centered-mobile has-text-right-tablet",
												styles.buttons
											)}
										>
											<button
												className={classNames(
													"button",
													"is-primary",
													styles.button__censo
												)}
												onClick={
													this.handleInfrastructure
												}
											>
												{parse(
													this.translate(
														"Resources.btnSchoolInventary"
													)
												)}
											</button>
										</div>
									)}
								</div>
							) : null}
						</div>
						<SurveysList
							l={this.translate}
							lang={this.getLang()}
							surveys={this.state.surveys}
							user={this.props.accounts.user}
							school={this.state.school}
							contextSurvey={this.state.contextSurvey}
							setShowModalHowItWorks={this.setShowModalHowItWorks}
						/>
					</section>
				</Body>

				{this.state.school && (
					<InfrastructureFormModal
						isActive={this.props.modal.isInfrastructureModalActive}
						toggleModal={this.props.toggleInfrastructureModal}
						schoolId={this.state.school._id.$oid}
						forceSubmitBeforeClose={
							this.infrastructureModalForceSubmitBeforeClose
						}
					/>
				)}

				<HowItWorksModal
					translate={this.translate}
					idTitle="LoginEducator.howWorks"
					showModal={this.state.showModalHowItWorks}
					modalClosed={() => this.setShowModalHowItWorks(false)}
				/>
			</Layout>
		);
	}
}

const HowItWorksModal = ({ idTitle, translate, showModal, modalClosed }) => {
	return (
		<Modal
			title={translate(idTitle)}
			isActive={showModal}
			closeModal={modalClosed}
		>
			<EducatorHowItWorksSection translate={translate} />
		</Modal>
	);
};

Resources.propTypes = {
	modal: PropTypes.object,
	fields: PropTypes.object.isRequired,
};

export default injectIntl(
	reduxForm({
		form: "resources",
		fields: _.keys(schema),
	})(
		compose(
			APIDataContainer,
			AccountsContainer,
			ModalContainer,
			NonUserRedir
		)(Resources)
	)
);
