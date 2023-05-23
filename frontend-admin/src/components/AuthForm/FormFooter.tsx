import { NextPage } from "next";
import Link from "next/link";

interface FormfooterProps {
  footerText: string;
  footerLink: string;
  footerLinkText?: string;
}

const Formfooter: NextPage<FormfooterProps> = ({
  footerText,
  footerLink,
  footerLinkText,
}) => {
  return (
    <div className="flex justify-center gap-2 px-2 mt-6 text-sm text-gray-500">
      <p>{footerText}</p>
      <Link href={footerLink} className="underline cursor-pointer">
        {footerLinkText}
      </Link>
    </div>
  );
};

export default Formfooter;
