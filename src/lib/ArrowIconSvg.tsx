import { IArrowIconSvgProps } from "@common/interface/interface";

const ArrowIconSvg: React.FC<IArrowIconSvgProps> = ({isDescriptionShown}) => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={"black"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transform: `rotate(${isDescriptionShown ? "0" : "180deg"})`,
      transition: 'transform 0.3s ease'
    }}
  >
    <path d="M5 15l7-7 7 7"/>
  </svg>
  );
}

export default ArrowIconSvg;