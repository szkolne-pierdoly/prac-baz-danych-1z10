import * as React from "react";

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3 6H21V8H3V6ZM5 8V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V8H5ZM7 10H9V17H7V10ZM11 10H13V17H11V10ZM15 10H17V17H15V10ZM9 4H15V6H9V4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export { TrashIcon };
