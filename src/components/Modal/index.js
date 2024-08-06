import React from "react";
import classnames from "classnames";
import {
  FormattedMessage,
  FormattedHTMLMessage,
  injectIntl,
  intlShape,
} from "react-intl";
import parse from "html-react-parser";
import styles from "./Modal.styl";

class Modal extends React.Component {
  handleClickPrint(el) {
    let conteudo = document.getElementById("body-print").innerHTML;
    let tela_impressao = window.open("about:blank");

    tela_impressao.document.write(conteudo);
    tela_impressao.document.close();
    tela_impressao.focus();
    tela_impressao.print();
  }

  translate(id) {
    
    return this.props.intl.formatMessage({ id });
  }

  componentDidMount(){
    OneTrust.NoticeApi.Initialized.then(function() {
      OneTrust.NoticeApi.LoadNotices(["https://privacyportal-cdn.onetrust.com/95fde4ae-d4a8-40df-8d0f-755994f74dc5/privacy-notices/draft/4cf5effc-3048-4585-91c1-6495a23ee037.json"], false);
    });
  }

  render() {
    return (
      <div
        className={classnames("modal", this.props.className, {
          "is-active": this.props.isActive,
        })}
      >
        <div className="modal-background"></div>
        <div
          className={classnames(
            styles.w__modal,
            "modal-card",
            this.props.classNameCard
          )}
        >
          <header className="modal-card-head">
            <p className="modal-card-title">{this.props.title}</p>
            <button
              type="button"
              className="delete"
              onClick={() => this.props.closeModal()}
            ></button>
          </header>
          <section className={classnames("modal-card-body")}>
            {this.props.print ? (
              <button
                className={classnames(styles.btn_print, "button is-primary")}
                onClick={this.handleClickPrint.bind(this)}
              >
                {parse(this.translate("Modal.print"))}{" "}
                <i className="fa fa-print" aria-hidden="true"></i>
              </button>
            ) : null}
            <div id="otnotice-4cf5effc-3048-4585-91c1-6495a23ee037" class="otnotice"></div>
            <div id="body-print">{this.props.children}</div>
          </section>
          {!this.props.hideFooter ? (
            <footer className="modal-card-foot"></footer>
          ) : null}
        </div>
      </div>
    );
  }
}

export default injectIntl(Modal);
