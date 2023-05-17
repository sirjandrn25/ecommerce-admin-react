import Card from "./card.component";

export interface DataRowInterface {
  label: string | any;
  labelIcon?: any;
  value: string | any;
  labelClassName?: string;
  valueClassName?: string;
  className?: string;
  onClick?: () => void;
  sub_rows?: DataRowInterface[];
  type?: "normal" | "net";
  visible?: boolean;
}

const DataRow = ({
  label,
  labelIcon,
  value,
  onClick = () => {},
  className,
  labelClassName,
  valueClassName,
  type = "normal",
}: DataRowInterface) => {
  return (
    <div
      onClick={onClick}
      className={`justify-between gap-6 p-2 rounded hover:bg-base-200 items-start row-flex  ${
        type === "net" && "border-t border-neutral pt-3"
      } ${className}`}
    >
      <span
        className={`text-sm whitespace-nowrap row-flex items-center gap-1 ${
          ["net"].includes(type)
            ? "font-bold text-color-primary dark:text-color-200"
            : ""
        } ${labelClassName}`}
      >
        {label} {labelIcon}
      </span>
      <span
        className={`font-medium text-color-primary dark:text-color-200 text-sm text-right ${
          ["net"].includes(type) ? " font-bold text-color-primary" : ""
        } ${valueClassName} `}
      >
        {value || "-"}
      </span>
    </div>
  );
};

export interface GenericDetailCardInterface {
  title: any;
  titleClassName?: string;
  className?: string;
  cardClassName?: string;
  bodyClassName?: string;
  children?: any;
  footerComponent?: any;
}
export interface GenericDataRowDetailCardInterface
  extends GenericDetailCardInterface {
  data_rows: DataRowInterface[];
}

export const GenericDataRowDetailCard = ({
  title,
  titleClassName,
  className,
  bodyClassName,
  data_rows,
  footerComponent,
  cardClassName,
}: GenericDataRowDetailCardInterface) => {
  return (
    <Card className={titleClassName} title={title}>
      {(data_rows || []).map((row: DataRowInterface, index: number) => {
        if (row?.visible === false) return null;

        return <DataRow {...row} key={index} />;
      })}
    </Card>
  );
};

// export interface GenericDetailCardInterface {
//   title: any;
//   titleClassName?: string;
//   className?: string;
//   cardClassName?: string;
//   bodyClassName?: string;
//   children?: any;
//   footerComponent?: any;
// }
// export interface GenericDataRowDetailCardInterface
//   extends GenericDetailCardInterface {
//   data_rows: DataRowInterface[];
// }

// export const GenericDataRowDetailCard = ({
//   title,
//   titleClassName,
//   className,
//   bodyClassName,
//   data_rows,
//   footerComponent,
//   cardClassName,
// }: GenericDataRowDetailCardInterface) => {
//   return (
//     <GenericDetailCard
//       {...{
//         title,
//         titleClassName,
//         className,
//         bodyClassName,
//         data_rows,
//         footerComponent,
//         cardClassName,
//       }}
//     >
//       {(data_rows || []).map((row: DataRowInterface, index: number) => {
//         if (row?.visible === false) return null;
//         if (row?.sub_rows) return <DataSubRow {...row} key={index} />;
//         return <DataRow {...row} key={index} />;
//       })}
//     </GenericDetailCard>
//   );
// };

// export const GenericDetailCard = ({
//   title,
//   titleClassName,
//   className,
//   bodyClassName,
//   children,
//   footerComponent,
//   cardClassName,
// }: GenericDetailCardInterface) => {
//   return (
//     <Card
//       noBorder={true}
//       className={clsx(
//         " overflow-hidden rounded shadow bg-base-100",
//         IsValidString(title) ? "py-4" : "p-0",
//         cardClassName
//       )}
//     >
//       <div className={`col-flex ${className}`}>
//         {IsValidString(title) ? (
//           <GenericDetailCardHeader title={title} className={titleClassName} />
//         ) : (
//           title
//         )}

//         <CardBody className={`text-sm flex-1 col-flex !p-2   ${bodyClassName}`}>
//           {children}
//           {footerComponent}
//         </CardBody>
//       </div>
//     </Card>
//   );
// };

// export const GenericDetailCardHeader = ({
//   title,
//   className,
// }: {
//   title: string;
//   className?: string;
// }) => {
//   return (
//     <div
//       className={`capitalize bg-base-100 text-base text-color-primary font-medium  mx-4 pb-2 border-b border-dashed  justify-between  light:text-primary ${className}`}
//     >
//       {title}
//     </div>
//   );
// };

export default DataRow;
