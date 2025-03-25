import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import classnames from "classnames";
import { c, j } from "~/helpers/Debug";
import { FetchLanguageDictionaryForCurrentLang } from "~/api/translations";
import s from "./styles.styl";

import PageLayoutWrapper from "~/components/PageLayoutWrapper";

import DatosBasicos from "./FormSections/DatosBasicos";
import DatosLaborables from "./FormSections/DatosLaborables";

const EditUser = ({ d, lang, params, user }) => {
  const isTeacher = user._profile === "teacher";

  c(j(user));

  return (
    <MainContentWrap>
      <h1 className="title">{d.h1}</h1>
      <DatosBasicos l={d} user={user} />
      {isTeacher && <DatosLaborables l={d} user={user} />}
    </MainContentWrap>
  );
};

const MainContentWrap = ({ children }) => {
  return (
    <form id="questionForm">
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

  //On Mount
  useEffect(() => {
    FetchLanguageDictionaryForCurrentLang("edit-user").then(
      setContextualLangDict
    );
  }, []);

  return (
    <PageLayoutWrapper pageTitle="Edit User">
      {!isEmpty(contextualLangDict) && <EditUser d={contextualLangDict} />}
    </PageLayoutWrapper>
  );
};
