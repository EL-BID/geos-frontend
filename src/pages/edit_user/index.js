import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import classnames from "classnames";
import { c, j } from "~/helpers/Debug";
import { FetchLanguageDictionaryForCurrentLang } from "~/api/translations";
import API from "~/api";

import { validateModel } from "./Helpers/FormValidationHelpers";

import PageLayoutWrapper from "~/components/PageLayoutWrapper";
import SubmitBtn from "~/components/SubmitBtn";

import DatosBasicos from "./FormSections/DatosBasicos";
import DatosLaborables from "./FormSections/DatosLaborables";

const EditUser = ({ d, s, lang, params, user }) => {
  const isTeacher = user._profile === "teacher";
  const [isApiBusy, setIsApiBusy] = useState(false);
  const [model, setModel] = useState(user);

  const onSubmit = async (e) => {
    e.preventDefault();

    //Reduce model to only updateable fields
    const {
      _id: { $oid: _id },
      name,
      born,
      gender,
      stages,
      knowledges,
    } = model;
    const userModel = { _id, name, born, gender, stages, knowledges };

    //Validation
    const errs = validateModel(userModel);
    if (!isEmpty(errs)) {
      const trans = errs.map((e) => `* ${d.error[e]}`).join("\n");
      return alert(`${d.error.found}:\n${trans}`);
    }

    //c("Saving....", j(userModel));
    setIsApiBusy(true);
    return API.Users.patch(userModel)
      .finally(() => setIsApiBusy(false))
      .then((res) => {
        if (!isEmpty(res.message)) {
          alert(res.message);
        }
      });
  };

  const onUserDataChange = (partial) => {
    setModel({ ...model, ...partial });
  };

  return (
    <MainContentWrap onSubmit={onSubmit}>
      <h1 className="title">{d.h1}</h1>
      <DatosBasicos l={d} s={s} user={model} onChange={onUserDataChange} />
      {isTeacher && (
        <DatosLaborables l={d} s={s} user={model} onChange={onUserDataChange} />
      )}
      <SubmitBtn
        className={classnames("is-primary", "submitBtn", {
          "is-loading": isApiBusy,
        })}
      >
        {d.ui.save}
      </SubmitBtn>
    </MainContentWrap>
  );
};

const MainContentWrap = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className={classnames("section")}>
        <div className="container">
          <div className="columns">
            <div className="column">{children}</div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default () => {
  const [contextualLangDict, setContextualLangDict] = useState({});
  const [signUpFormLangDict, setSignUpFormLangDict] = useState({});

  //On Mount
  useEffect(() => {
    FetchLanguageDictionaryForCurrentLang("edit-user").then(
      setContextualLangDict
    );
    FetchLanguageDictionaryForCurrentLang("sign-up-form").then(
      setSignUpFormLangDict
    );
  }, []);

  if (isEmpty(contextualLangDict) || isEmpty(signUpFormLangDict)) return null;

  return (
    <PageLayoutWrapper pageTitle="Edit User">
      <EditUser d={contextualLangDict} s={signUpFormLangDict} />
    </PageLayoutWrapper>
  );
};
