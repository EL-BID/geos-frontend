import React, { useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import parse from "html-react-parser";
import classNames from "classnames";
import $ from "jquery";

import styles from "~/pages/login/educator/LoginEducator.styl";

const EducatorHowItWorksSection = ({ translate: l }) => {
  const [level, setLevel] = useState(1);

  const handleClickLevels = (el) => {
    let target = el.target;
    $(".tabs > ul > li").removeClass("is-active");
    $(target).parent("li").addClass("is-active");

    $("#tab-content .content").removeClass("is-active");
    let content = $.makeArray($("#tab-content .content")).find((c) => {
      return $(c).data("content") == $(target).data("tab");
    });
    $(content).addClass("is-active");

    const level = parseInt(target.dataset.tab);

    setLevel(level);
  };

  return (
    <div
      className={classNames("column is-full", styles.structure, styles.login)}
    >
      <section className={classNames("section", styles.section)}>
        <div className="container">
          <div className="columns">
            <div className="column is-12 has-text-centered">
              <h2 className="is-size-3-mobile">
                {parse(l("LoginEducator.howWorks"))}
              </h2>
            </div>
          </div>
          <div className={classNames("columns is-mobile", styles.arrow)}>
            <div
              className={classNames(
                "column is-6-mobile is-5-desktop is-offset-1-desktop",
                styles.diagonal
              )}
            ></div>
            <div
              className={classNames(
                "column is-6-mobile is-5-desktop",
                styles.diagonal,
                styles.negative
              )}
            ></div>
          </div>
          <div className="columns align-center">
            <div className={classNames("column is-3", styles.amount)}>
              <div className={styles.number}>23</div>
              <div className={styles.text}>
                {parse(l("LoginEducator.questions"))}
              </div>
            </div>
            <div className="column is-9 has-text-centered-mobile">
              <p>{parse(l("LoginEducator.howWorksDescription"))}</p>
            </div>
          </div>
          <div className="columns">
            <div
              className={classNames(
                "column is-flex is-3",
                styles.amount,
                styles.number_area
              )}
            >
              <div className={styles.number}>3</div>
              <div className={styles.text}>
                {parse(l("LoginEducator.areas"))}
              </div>
            </div>
            <div className={classNames("column is-flex is-3", styles.area)}>
              <div className={styles.pedadogica}>
                <div className={styles.icon}>
                  <img src="/images/icons/pedagogica.svg" alt="" />
                </div>
                <div className={styles.title}>
                  {parse(l("LoginEducator.pedagogical"))}
                </div>
              </div>
            </div>
            <div className={classNames("column is-flex is-3", styles.area)}>
              <div className={styles.cidadania}>
                <div className={styles.icon}>
                  <img src="/images/icons/cidadania.svg" alt="" />
                </div>
                <div className={styles.title}>
                  {parse(l("LoginEducator.digitalCitizenship"))}
                </div>
              </div>
            </div>
            <div className={classNames("column is-flex is-3", styles.area)}>
              <div className={styles.desenvolvimento}>
                <div className={styles.icon}>
                  <img src="/images/icons/desenvolvimento.svg" alt="" />
                </div>
                <div className={styles.title}>
                  {parse(l("LoginEducator.professionalDevelopment"))}
                </div>
              </div>
            </div>
          </div>
          <div className="columns align-center">
            <div className={classNames("column is-3", styles.amount)}>
              <div className={styles.number}>12</div>
              <div className={styles.text}>
                {parse(l("LoginEducator.competencies"))}
              </div>
            </div>
            <div className="column is-9">
              <div className="columns">
                <div className="column is-12 has-text-centered-mobile">
                  <p>{parse(l("LoginEducator.competenciesDescription"))}</p>
                </div>
              </div>
              <div className="columns">
                <div className={classNames("column is-4", styles.pedadogica)}>
                  <ul className={styles.competences}>
                    <li>{parse(l("LoginEducator.pedagogicalPractice"))}</li>
                    <li>{parse(l("LoginEducator.evaluation"))}</li>
                    <li>{parse(l("LoginEducator.customization"))}</li>
                    <li>{parse(l("LoginEducator.curatorshipCreation"))}</li>
                  </ul>
                </div>
                <div className={classNames("column is-4", styles.cidadania)}>
                  <ul className={styles.competences}>
                    <li>{parse(l("LoginEducator.responsibleUse"))}</li>
                    <li>{parse(l("LoginEducator.safeUse"))}</li>
                    <li>{parse(l("LoginEducator.criticalUse"))}</li>
                    <li>{parse(l("LoginEducator.inclusion"))}</li>
                  </ul>
                </div>
                <div
                  className={classNames("column is-4", styles.desenvolvimento)}
                >
                  <ul className={styles.competences}>
                    <li>{parse(l("LoginEducator.selfDevelopment"))}</li>
                    <li>{parse(l("LoginEducator.selfEvaluation"))}</li>
                    <li>{parse(l("LoginEducator.sharing"))}</li>
                    <li>{parse(l("LoginEducator.communication"))}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className={classNames("columns align-center", styles.levels)}>
            <div className={classNames("column is-3", styles.amount)}>
              <div className={styles.number}>5</div>
              <div className={styles.text}>
                {parse(l("LoginEducator.ownershipLevels"))}
              </div>
            </div>
            <div className="column is-9">
              <div className="columns is-multiline">
                <div className="column is-12 has-text-centered-mobile">
                  <p>{parse(l("LoginEducator.ownershipLevelsDescription"))}</p>
                </div>
              </div>
              <div className="columns is-multiline">
                <div className="column is-12 is-hidden-mobile wrap-speedometer">
                  <ReactSpeedometer
                    width={400}
                    height={210}
                    valueFormat="d"
                    maxValue={5}
                    value={level - 0.5}
                    needleColor="#ffffff"
                    startColor="#c9c9c9"
                    segments={5}
                    endColor="#2e2e2e"
                    textColor="transparent"
                  />
                </div>
                <div className="column is-12 is-hidden-tablet">
                  <nav className="panel">
                    <p
                      className={classNames(
                        "panel-heading",
                        styles.panel_heading
                      )}
                    >
                      1. {parse(l("LoginEducator.exposure"))}
                    </p>
                    <div
                      className={classNames("panel-block", styles.panel_block)}
                    >
                      <p>{parse(l("LoginEducator.exposureDescription"))}</p>
                    </div>
                  </nav>
                  <nav className="panel">
                    <p
                      className={classNames(
                        "panel-heading",
                        styles.panel_heading
                      )}
                    >
                      2.
                      {parse(l("LoginEducator.familiarization"))}
                    </p>
                    <div
                      className={classNames("panel-block", styles.panel_block)}
                    >
                      <p>
                        {parse(l("LoginEducator.familiarizationDescription"))}
                      </p>
                    </div>
                  </nav>
                  <nav className="panel">
                    <p
                      className={classNames(
                        "panel-heading",
                        styles.panel_heading
                      )}
                    >
                      3.
                      {parse(l("LoginEducator.adaptation"))}
                    </p>
                    <div
                      className={classNames("panel-block", styles.panel_block)}
                    >
                      <p>{parse(l("LoginEducator.adaptationDescription"))}</p>
                    </div>
                  </nav>
                  <nav className="panel">
                    <p
                      className={classNames(
                        "panel-heading",
                        styles.panel_heading
                      )}
                    >
                      4.
                      {parse(l("LoginEducator.integration"))}
                    </p>
                    <div
                      className={classNames("panel-block", styles.panel_block)}
                    >
                      <p>{parse(l("LoginEducator.integrationDescription"))}</p>
                    </div>
                  </nav>
                  <nav className="panel">
                    <p
                      className={classNames(
                        "panel-heading",
                        styles.panel_heading
                      )}
                    >
                      5.
                      {parse(l("LoginEducator.transformation"))}
                    </p>
                    <div
                      className={classNames("panel-block", styles.panel_block)}
                    >
                      <p>
                        {parse(l("LoginEducator.transformationDescription"))}
                      </p>
                    </div>
                  </nav>
                </div>
                <div className="column is-12 is-hidden-mobile">
                  <div
                    id="tabs"
                    className={classNames(
                      "tabs dark is-size-7-touch",
                      styles.tabs
                    )}
                  >
                    <ul>
                      <li className="is-active">
                        <a
                          data-tab="1"
                          href="javascript:void(0)"
                          onClick={handleClickLevels}
                        >
                          1.
                          {l("LoginEducator.exposure")}
                        </a>
                      </li>
                      <li>
                        <a
                          data-tab="2"
                          href="javascript:void(0)"
                          onClick={handleClickLevels}
                        >
                          2.
                          {l("LoginEducator.familiarization")}
                        </a>
                      </li>
                      <li>
                        <a
                          data-tab="3"
                          href="javascript:void(0)"
                          onClick={handleClickLevels}
                        >
                          3.
                          {l("LoginEducator.adaptation")}
                        </a>
                      </li>
                      <li>
                        <a
                          data-tab="4"
                          href="javascript:void(0)"
                          onClick={handleClickLevels}
                        >
                          4.
                          {l("LoginEducator.integration")}
                        </a>
                      </li>
                      <li>
                        <a
                          data-tab="5"
                          href="javascript:void(0)"
                          onClick={handleClickLevels}
                        >
                          5.
                          {l("LoginEducator.transformation")}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div
                    id="tab-content"
                    className={classNames("tab-content", styles.tab_content)}
                  >
                    <p className="content is-active" data-content="1">
                      {parse(l("LoginEducator.exposureDescription"))}
                    </p>
                    <p className="content" data-content="2">
                      {parse(l("LoginEducator.familiarizationDescription"))}
                    </p>
                    <p className="content" data-content="3">
                      {parse(l("LoginEducator.adaptationDescription"))}
                    </p>
                    <p className="content" data-content="4">
                      {parse(l("LoginEducator.integrationDescription"))}
                    </p>
                    <p className="content" data-content="5">
                      {parse(l("LoginEducator.transformationDescription"))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EducatorHowItWorksSection;
