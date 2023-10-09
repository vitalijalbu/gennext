import { FC } from "react";
import LoanDetail from "./Sections/LoanDetails";

const LoanDetailMain: FC<{ name: string }> = ({ name }) => {
  return (
    <>
      <LoanDetail id={name}/>
    </>
  );
};

export default LoanDetailMain;