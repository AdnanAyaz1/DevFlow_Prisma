"use client";
const GlobalSearchFilter = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: string) => void;
}) => {
  const filteroptions = ["Question", "User", "Tag"];

  const handleClick = (opt: string) => {
    onChange(opt);
  };
  return (
    <div className="flex-center w-fit gap-3 p-[25px]">
      <h3 className="base-semibold">Type : </h3>
      {filteroptions.map((opt, i) => {
        return (
          <div
            key={i}
            onClick={() => handleClick(opt)}
            className={`${value == opt ? "primary-gradient text-white" : "bg-light-700 dark:bg-dark-200"} cursor-pointer w-[93px] h-[36px] dark:text-white flex-center rounded-[40px]`}
          >
            {opt}
          </div>
        );
      })}
    </div>
  );
};

export default GlobalSearchFilter;
