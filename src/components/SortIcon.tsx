import React from "react";

interface Props {
  isSorted: boolean;
  direction: "asc" | "desc";
}

const SortIcon: React.FC<Props> = ({ isSorted, direction }) => {
  if (!isSorted) {
    // "Unsorted" icon
    return (
      <svg
        className="w-3 h-3 inline-block ml-1.5 text-gray-400 group-hover:text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 9l4-4 4 4m0 6l-4 4-4-4"
        />
      </svg>
    );
  }
  if (direction === "asc") {
    // "Ascending" icon
    return (
      <svg
        className="w-3 h-3 inline-block ml-1.5 text-gray-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    );
  }
  // "Descending" icon
  return (
    <svg
      className="w-3 h-3 inline-block ml-1.5 text-gray-200"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
};

export default React.memo(SortIcon);
