import React from "react";
import Helmet from "react-helmet";
import classnames from "classnames";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import parse from "html-react-parser";
import styles from "./home.styl";
import Layout from "../../components/Layout";
import Body from "../../components/Body";
import Dashboard from "../../components/Dashboard";
import Profile from "./components/Profile";
import DropdownLanguage from "../../components/Header/DropdownLanguage";
import CONF from "~/api/index";
import history from "~/core/history";
import axios from "axios";
import LogoGuiaEdutec from "../../components/LogoGuiaEdutec";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      setupIsDone: true,
    };
  }
  async fetchSetupData() {
    const URL_REQUEST = CONF.ApiURL + "/api/v1/setup/";
    const response = await axios.get(URL_REQUEST);
    const { setupIsDone } = response.data.data;
    this.setState({ setupIsDone });
    return setupIsDone;
  }

  async componentDidMount() {
    const setupIsDone = await this.fetchSetupData();
    if (!setupIsDone) {
      history.push("/init-setup");
    }
  }

  translate(id) {
    return this.props.intl.formatMessage({ id });
  }
  render() {
    return (
      <div className={styles.site}>
        {this.state.setupIsDone && (
          <Layout>
            <Helmet title="Guia EduTec" />
            <Body>
              <section className="section">
                <div className={classnames(styles.site__content, "container")}>
                  <div
                    className={classnames(
                      "columns is-multiline",
                      styles.initial
                    )}
                  >
                    <LogoGuiaEdutec bgDark={true} />
                    {
                      parse(this.translate("Home.title")) != " " &&
                      <p>{parse(this.translate("Home.title"))}</p>
                    }
                    
                  </div>
                  <div className="column is-full">
                    <h3
                      className="has-text-weight-bold is-size-6"
                      style={{ marginBottom: "20px" }}
                    >
                      {parse(this.translate("Home.description"))}
                    </h3>
                  </div>
                  <Profile />
                </div>
              </section>

              <section className={styles.what_is}>
                <div className={classnames(styles.site__content, "container")}>
                  <div className={styles.content}>
                    <h4 className="is-size-3 mb-10">
                      Articulación BID, Guia Edutec, Alcaldía de Manizales y Fundación Luker
                    </h4>
                    <div className="columns">
                      <div className="column is-half">
                        
                        <p>
                        Manizales será una de las primeras ciudades en Colombia en implementar la Guía Edutec que permite diagnosticar las competencias digitales en los docentes y comunidad educativa, y conocer cómo se están utilizando las tecnologías en la escuela, gracias a la articulación con el Banco Interamericano de Desarrollo, alcaldía de Manizales por medio de la Secretaría de educación de Manizales y Fundación Luker.
                        </p>
                        
                      </div>
                      <div className="column is-half">
                        <p>
                        La herramienta desarrollada por el CIEB, que pretende estimular el desarrollo y la actualización de las competencias digitales de profesores, escuelas y redes educativas, se compone de tres módulos: una herramienta de autoevaluación de las competencias digitales para los profesores, una herramienta de diagnóstico que identifica el nivel de madurez de las tecnologías digitales en las Instituciones educativas y un tercer módulo que permite observar y gestionar la transformación digital en una red de escuelas por parte de la Secretaría de Educación. Los tres módulos proporcionan informes que permiten identificar buenas prácticas en el desarrollo de las competencias digitales de los profesores, en la integración de la tecnología a la educación y en la gestión de los centros educativos, además de generar retroalimentaciones personalizadas en los procesos que vinculan bancos de herramientas digitales específicas para cada nivel de uso.  
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/*
              <section>
                <div className={classnames(styles.site__content, "container")}>
                  <section className={styles.home__dashboard}>
                    <div className="columns">
                      <div className="column is-full has-text-centered">
                        <h4 className={classnames("is-size-4", styles.strip)}>
                          {parse(this.translate("Home.edutecGuideInNumbers"))}
                        </h4>
                      </div>
                    </div>
                    <Dashboard />
                  </section>
                </div>
              </section>
              */}

            </Body>
          </Layout>
        )}
      </div>
    );
  }
}

export default injectIntl(Home);
