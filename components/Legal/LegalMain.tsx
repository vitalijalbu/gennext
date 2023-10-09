import { FC } from "react";
import Legals from "./Sections/Legals";

const LegalMain: FC<{ name: string }> = ({ name }) => {
    return (
      <>
        <Legals slug={name}/>
      </>
    );
  };
  
  export default LegalMain;