const ContentWrapper = ({
  children,
  contentClassName = "",
  title,
  subTitle,
  className,
}: any) => {
  return (
    <div
      className={`flex p-4 max-w-[800px] rounded flex-col gap-4 bg-base-100 ${className}`}
    >
      <div className="flex flex-col">
        <div className="font-bold">{title}</div>
        <div className="text-sm text-base-secondary">{subTitle}</div>
      </div>
      <div className={`${contentClassName}`}>{children}</div>
    </div>
  );
};

export default ContentWrapper;
