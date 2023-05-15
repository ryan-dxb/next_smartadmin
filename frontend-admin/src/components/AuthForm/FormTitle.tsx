import { NextPage } from "next";

interface FormTitleProps {
  text: string;
}

const FormTitle: NextPage<FormTitleProps> = ({ text }) => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="mt-6 text-xl font-bold tracking-tight text-center text-gray-900">
        {text}
      </h2>
    </div>
  );
};

export default FormTitle;
