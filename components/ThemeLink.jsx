// import Link from 'next/link';

// const ThemeLink = ({
//   className = "",
//   title,
//   href,
//   icon: Icon,
//   ...props
// }) => {
//   return (
//     <Link
//       href={href}
//       className={`inline-flex items-center justify-center px-6 py-3 
//       text-base font-medium rounded-lg transition-all 
//       duration-200 focus:outline-none focus:ring-4 ${className}`}
//       {...props}
//     >
//       {title}
//       {Icon && <Icon className="ml-2 w-4 h-4" />}
//     </Link>
//   );
// };

// export default ThemeLink;

import Link from "next/link";

export default function ThemeLink({ className, href, title, icon }) {
    const Icon = icon;
    return (
        <Link
            href={href}
            className={`focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-8 py-3 text-center flex items-center ${className}`}
        >
            {title}{" "}
            {/* <span className="mL-2">
                <Icon />
            </span> */}
        </Link>
    );
};