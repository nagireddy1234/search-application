import React, { FC } from "react";
import "./style.scss";

const CssWizardry: FC = (): JSX.Element => {
  return (
    <>
      <a className="button" href="/#" role="button">
        <span>delete</span>
        <div className="icon">✖</div>
      </a>
    </>
  );
};

export default CssWizardry;
