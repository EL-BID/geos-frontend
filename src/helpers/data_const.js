import React from "react";
import { FormattedMessage } from "react-intl";

export function getStages(props) {
  return [
    {
      key: "elementarySchool1",
      value: props.intl.formatMessage({ id: "DataConst.elementarySchool1" }),
      label: props.intl.formatMessage({ id: "DataConst.elementarySchool1" }),
    },
    {
      key: "elementarySchool2",
      value: props.intl.formatMessage({ id: "DataConst.elementarySchool2" }),
      label: props.intl.formatMessage({ id: "DataConst.elementarySchool2" }),
    },
    {
      key: "highSchool",
      value: props.intl.formatMessage({ id: "DataConst.highSchool" }),
      label: props.intl.formatMessage({ id: "DataConst.highSchool" }),
    },
  ];
}

export function getKnowledges(props) {
  return [
    {
      key: "elementarySchool1",
      label: props.intl.formatMessage({ id: "DataConst.elementarySchool1" }),
      options: [
        {
          key: "elementarySchool1.naturalSciencesAndTechnologies",
          value: props.intl.formatMessage({
            id: "DataConst.naturalSciencesAndTechnologies",
          }),
          label: props.intl.formatMessage({
            id: "DataConst.naturalSciencesAndTechnologies",
          }),
        },
        {
          key: "elementarySchool1.humanSciencesAndTechnologies",
          value: props.intl.formatMessage({
            id: "DataConst.humanSciencesAndTechnologies",
          }),
          label: props.intl.formatMessage({
            id: "DataConst.humanSciencesAndTechnologies",
          }),
        },
        {
          key: "elementarySchool1.art",
          value: props.intl.formatMessage({ id: "DataConst.art" }),
          label: props.intl.formatMessage({ id: "DataConst.art" }),
        },
        {
          key: "elementarySchool1.humanities",
          value: props.intl.formatMessage({ id: "DataConst.humanities" }),
          label: props.intl.formatMessage({ id: "DataConst.humanities" }),
        },
        {
          key: "elementarySchool1.pe",
          value: props.intl.formatMessage({ id: "DataConst.pe" }),
          label: props.intl.formatMessage({ id: "DataConst.pe" }),
        },
        {
          key: "elementarySchool1.religion",
          value: props.intl.formatMessage({ id: "DataConst.religion" }),
          label: props.intl.formatMessage({ id: "DataConst.religion" }),
        },
        {
          key: "elementarySchool1.spanish",
          value: props.intl.formatMessage({ id: "DataConst.spanish" }),
          label: props.intl.formatMessage({ id: "DataConst.spanish" }),
        },
        {
          key: "elementarySchool1.math",
          value: props.intl.formatMessage({ id: "DataConst.math" }),
          label: props.intl.formatMessage({ id: "DataConst.math" }),
        },
        {
          key: "elementarySchool1.engineering",
          value: props.intl.formatMessage({ id: "DataConst.engineering" }),
          label: props.intl.formatMessage({ id: "DataConst.engineering" }),
        },
      ],
    },
    {
      key: "elementarySchool2",
      label: props.intl.formatMessage({ id: "DataConst.elementarySchool2" }),
      options: [
        {
          key: "elementarySchool2.naturalSciencesAndTechnologies",
          value: props.intl.formatMessage({
            id: "DataConst.naturalSciencesAndTechnologies",
          }),
          label: props.intl.formatMessage({
            id: "DataConst.naturalSciencesAndTechnologies",
          }),
        },
        {
          key: "elementarySchool2.humanSciencesAndTechnologies",
          value: props.intl.formatMessage({
            id: "DataConst.humanSciencesAndTechnologies",
          }),
          label: props.intl.formatMessage({
            id: "DataConst.humanSciencesAndTechnologies",
          }),
        },
        {
          key: "elementarySchool2.art",
          value: props.intl.formatMessage({ id: "DataConst.art" }),
          label: props.intl.formatMessage({ id: "DataConst.art" }),
        },
        {
          key: "elementarySchool2.humanities",
          value: props.intl.formatMessage({ id: "DataConst.humanities" }),
          label: props.intl.formatMessage({ id: "DataConst.humanities" }),
        },
        {
          key: "elementarySchool2.pe",
          value: props.intl.formatMessage({ id: "DataConst.pe" }),
          label: props.intl.formatMessage({ id: "DataConst.pe" }),
        },
        {
          key: "elementarySchool2.religion",
          value: props.intl.formatMessage({ id: "DataConst.religion" }),
          label: props.intl.formatMessage({ id: "DataConst.religion" }),
        },
        {
          key: "elementarySchool2.spanish",
          value: props.intl.formatMessage({ id: "DataConst.spanish" }),
          label: props.intl.formatMessage({ id: "DataConst.spanish" }),
        },
        {
          key: "elementarySchool2.math",
          value: props.intl.formatMessage({ id: "DataConst.math" }),
          label: props.intl.formatMessage({ id: "DataConst.math" }),
        },
        {
          key: "elementarySchool2.engineering",
          value: props.intl.formatMessage({ id: "DataConst.engineering" }),
          label: props.intl.formatMessage({ id: "DataConst.engineering" }),
        },
      ],
    },
    {
      key: "highSchool",
      label: props.intl.formatMessage({ id: "DataConst.highSchool" }),
      options: [
        {
          key: "highSchool.naturalSciencesAndTechnologies",
          value: props.intl.formatMessage({
            id: "DataConst.naturalSciencesAndTechnologies",
          }),
          label: props.intl.formatMessage({
            id: "DataConst.naturalSciencesAndTechnologies",
          }),
        },
        {
          key: "highSchool.humanSciencesAndTechnologies",
          value: props.intl.formatMessage({
            id: "DataConst.humanSciencesAndTechnologies",
          }),
          label: props.intl.formatMessage({
            id: "DataConst.humanSciencesAndTechnologies",
          }),
        },
        {
          key: "highSchool.art",
          value: props.intl.formatMessage({ id: "DataConst.art" }),
          label: props.intl.formatMessage({ id: "DataConst.art" }),
        },
        {
          key: "highSchool.humanities",
          value: props.intl.formatMessage({ id: "DataConst.humanities" }),
          label: props.intl.formatMessage({ id: "DataConst.humanities" }),
        },
        {
          key: "highSchool.pe",
          value: props.intl.formatMessage({ id: "DataConst.pe" }),
          label: props.intl.formatMessage({ id: "DataConst.pe" }),
        },
        {
          key: "highSchool.religion",
          value: props.intl.formatMessage({ id: "DataConst.religion" }),
          label: props.intl.formatMessage({ id: "DataConst.religion" }),
        },
        {
          key: "highSchool.spanish",
          value: props.intl.formatMessage({ id: "DataConst.spanish" }),
          label: props.intl.formatMessage({ id: "DataConst.spanish" }),
        },
        {
          key: "highSchool.math",
          value: props.intl.formatMessage({ id: "DataConst.math" }),
          label: props.intl.formatMessage({ id: "DataConst.math" }),
        },
        {
          key: "highSchool.engineering",
          value: props.intl.formatMessage({ id: "DataConst.engineering" }),
          label: props.intl.formatMessage({ id: "DataConst.engineering" }),
        },
      ],
    },
  ];
}

export function getFormation(props) {
  return [
    {
      value: props.intl.formatMessage({ id: "DataConst.bachelor" }),
      label: props.intl.formatMessage({ id: "DataConst.bachelor" }),
      isDisabled: false,
    },
    {
      value: props.intl.formatMessage({ id: "DataConst.bachelorDegree" }),
      label: props.intl.formatMessage({ id: "DataConst.bachelorDegree" }),
      isDisabled: false,
    },
    {
      value: props.intl.formatMessage({ id: "DataConst.teacherGraduate" }),
      label: props.intl.formatMessage({ id: "DataConst.teacherGraduate" }),
      isDisabled: false,
    },
    {
      value: props.intl.formatMessage({ id: "DataConst.postgrado" }),
      label: props.intl.formatMessage({ id: "DataConst.postgrado" }),
      isDisabled: false,
    },
    {
      value: props.intl.formatMessage({ id: "DataConst.masters" }),
      label: props.intl.formatMessage({ id: "DataConst.masters" }),
      isDisabled: false,
    },
    {
      value: props.intl.formatMessage({ id: "DataConst.phd" }),
      label: props.intl.formatMessage({ id: "DataConst.phd" }),
      isDisabled: false,
    },
  ];
}

export function getEvaluationLevel() {
  return [
    {
      name: (
        <FormattedMessage id="DiagnosisTeacher.selfEvaluation.transformation" />
      ),
      idx: 5,
    },
    {
      name: (
        <FormattedMessage id="DiagnosisTeacher.selfEvaluation.integration" />
      ),
      idx: 4,
    },
    {
      name: (
        <FormattedMessage id="DiagnosisTeacher.selfEvaluation.adaptation" />
      ),
      idx: 3,
    },
    {
      name: (
        <FormattedMessage id="DiagnosisTeacher.selfEvaluation.familiarization" />
      ),
      idx: 2,
    },
    {
      name: <FormattedMessage id="DiagnosisTeacher.selfEvaluation.exposure" />,
      idx: 1,
    },
  ];
}
