import React, { useEffect, useState } from "react";
import { reduxForm } from "redux-form";
import { compose } from "redux";
import { concat, isEmpty, keys } from "lodash";
import classnames from "classnames";
import API from "~/api";
import { injectIntl } from "react-intl";
import parse from "html-react-parser";
import {
	UserModel,
	TeacherDataModel,
	PrincipalDataModel,
} from "~/models/Users";
import "url-search-params-polyfill";
import DOMPurify from "dompurify";
import { FetchLanguageDictionaryForCurrentLang } from "~/api/translations";

//Containers
import ModalContainer from "~/containers/modal";
import APIDataContainer from "~/containers/api_data";

//Form Sections
import DatosBasicos from "./FormSections/DatosBasicos";
import DatosLaborables from "./FormSections/DatosLaborables";
import DatosLogin from "./FormSections/DatosLogin";
import ToS from "./FormSections/ToS";
import Teacher from "./FormSections/Teacher";
import Principal from "./FormSections/Principal";

// Components
import SubmitBtn from "~/components/SubmitBtn";
import Modal from "~/components/Modal";
import styles from "~/pages/signup/styles.styl";

//Helpers
import {
	validateModel,
	reduxFormModelToUserModelConverter,
} from "./Helpers/FormValidationHelpers";

const DEFAULT_BDATE = new Date(new Date().getFullYear() - 18, 0, 1);

const ReduxFormFields = concat(
	UserModel,
	TeacherDataModel,
	PrincipalDataModel,
	//Add view-model properties
	["emailConfirm", "passwordConfirm"]
);

const saveUser = (userModel) => {
	const noLogin = true;
	const noaff = false;
	return API.Users.create(userModel, noLogin, noaff);
};

const SignUpForm = ({
	intl,
	fields,
	submitting,
	styles,
	handleSubmit,
	profile,
	apiData,
	fetchCountries,
	fetchProvinces,
	fetchStates,
	fetchCities,
	fetchSchools,
}) => {
	const [l, setContextualLangDict] = useState({});
	const [showModalTos, setShowModalTos] = React.useState(false);
	const isTeacher = profile === "teacher";

	//OnMount
	useEffect(() => {
		//Set default values for all fields
		setFieldsDefaultValues(fields, profile);
		//Load lang dict
		FetchLanguageDictionaryForCurrentLang("sign-up-form").then(
			setContextualLangDict
		);
	}, []);

	const onSubmit = (e) => {
		e.preventDefault();
		const userModel = reduxFormModelToUserModelConverter(fields);
		const errors = validateModel(
			{ ...userModel },
			fields,
			DEFAULT_BDATE,
			l
		);

		if (!isEmpty(errors)) {
			const errs = errors.map((err) => `- ${l.errors[err]}`).join("\n");
			return alert(`${l.errors.found}:\n${errs}`);
		}

		return saveUser(userModel).then((res) => {
			//Error
			if (isEmpty(res._id)) {
				let msg = keys(res)
					.map((key) => `- ${l.label[key]}: ${res[key]}`)
					.join("\n");
				alert(`${l.errors.found}:\n${msg}`);
			}
			//Success
			else {
				const { email, password } = userModel;
				API.Users.login({
					email,
					password,
				}).then((user) => (window.location = "/recursos"));
			}
		});
	};

	if (isEmpty(l)) return null;

	return (
		<form className={styles.form} onSubmit={onSubmit} id="SignUpForm">
			<DatosBasicos
				l={l}
				styles={styles}
				fields={fields}
				profile={profile}
			/>
			<DatosLaborables
				l={l}
				profile={profile}
				styles={styles}
				fields={fields}
				apiData={apiData}
				fetchCountries={fetchCountries}
				fetchProvinces={fetchProvinces}
				fetchStates={fetchStates}
				fetchCities={fetchCities}
				fetchSchools={fetchSchools}
			/>
			{profile === "teacher" ? (
				<Teacher l={l} fields={fields} styles={styles} />
			) : profile === "principal" ? (
				<Principal l={l} fields={fields} styles={styles} />
			) : null}
			<DatosLogin l={l} styles={styles} fields={fields} />
			<ToS
				l={l}
				field={fields.tos}
				onShowTos={() => setShowModalTos(true)}
			/>
			<div
				className={classnames(
					"control",
					styles.form__input,
					styles.form__submit_button
				)}
			>
				<SubmitBtn
					className={classnames("is-primary", "submitBtn", {
						"is-loading": submitting,
					})}
				>
					{l.register}
				</SubmitBtn>
			</div>
			<ToSModal
				title={l.termsOfUse}
				lang={intl.locale}
				show={showModalTos}
				onClose={() => setShowModalTos(false)}
			/>
		</form>
	);
};

const setFieldsDefaultValues = (fields, profile) => {
	//Set default values for fields
	const defaultValues = {
		share_personal_data: true,
		share_work_data: true,
		tos: false,
		profile,
	};

	if (isEmpty(fields.born.value)) {
		defaultValues.born = DEFAULT_BDATE.toISOString();
	}

	for (const key in fields) {
		const value = fields[key].value;
		if (isEmpty(value)) {
			fields[key].onChange(defaultValues[key]);
		}
	}
};

const ToSModal = ({ show, title, lang, onClose }) => {
	const [htmlContent, setHtmlContent] = useState("");

	useEffect(() => {
		fetch(`/terms_of_service/${lang}.html`)
			.then((response) => response.text())
			.then((html) => DOMPurify.sanitize(html))
			.then((html) => setHtmlContent(html))
			.catch((error) => {
				console.error("Error fetching the HTML content:", error);
			});
	}, []);

	return (
		<Modal
			isActive={show}
			title={title}
			className={styles.modal_termo}
			closeModal={onClose}
			print={false}
			privacyNotice={false}
			children={parse(htmlContent)}
		/>
	);
};

SignUpForm.propTypes = {};

export default injectIntl(
	reduxForm({
		form: "signUpForm",
		fields: ReduxFormFields,
	})(compose(APIDataContainer, ModalContainer)(SignUpForm))
);
