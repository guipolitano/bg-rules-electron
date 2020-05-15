import React from "react";

import Row from "antd/es/row/";
import "antd/es/row/style/css";

import Button from "antd/es/button/";
import "antd/es/button/style/css";

import Alert from "antd/es/alert/";
import "antd/es/alert/style/css";

import Col from "antd/es/col/";
import "antd/es/col/style/css";

import { findElement, getStorageCookie } from "../../util";

const { ipcRenderer } = window.require("electron");

function Login() {
    const forceUpdate = React.useState()[1].bind(null, {});
    const getCookie = () => {
      let result = ipcRenderer.sendSync("set-cookie", "cookie");
      if (result[findElement(result, "name", "rd_id_usuario")]) {
        let phpSess = result[findElement(result, "name", "PHPSESSID")].value;
        let utma = result[findElement(result, "name", "__utma")].value;
        let utmz = result[findElement(result, "name", "__utmz")].value;
        let gads = result[findElement(result, "name", "__gads")].value;
        let rd_id = result[findElement(result, "name", "rd_id_usuario")].value;
        let cookie = `PHPSESSID=${phpSess}; __utma=${utma}; __gads=${gads}; __utmz=${utmz}; rd_id_usuario=${rd_id}`;
        localStorage.setItem("cookie", cookie);
        forceUpdate();
      } else {
        alert("Faça o Login primeiro");
      }
    };
  return (
    <div className="container">
      <Row gutter={[8, 8]}>
        <Col>
          <Alert
            message="Não é possível fazer login pelo facebook."
            type="info"
            showIcon
          />
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col>
          <Alert
            message="Após o login, feche a janela do ludopedia e clique em Buscar Cookie."
            type="info"
            showIcon
          />
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col>
          <Alert
            message="Se em algum momento não conseguir mais abrir os PDFs, tente fazer o login novamente."
            type="info"
            showIcon
          />
        </Col>
      </Row>
      <Row gutter={[8, 80]}>
        <Col>
          <Button
            type="primary"
            onClick={() =>
              window.open("https://www.ludopedia.com.br/login", "cookie")
            }
          >
            Fazer Login
          </Button>
        </Col>
        <Col>
          <Button onClick={getCookie}>Buscar Cookie</Button>
        </Col>
      </Row>
      <Row>
        <Col gutter={[8, 8]}>
          <Alert
            type="warning"
            message={
              <span>
                <b>Cookie Atual:</b>{" "}
                {getStorageCookie() || "Nenhum, faça login!"}
              </span>
            }
          />
        </Col>
      </Row>
    </div>
  );
}

export default Login;
