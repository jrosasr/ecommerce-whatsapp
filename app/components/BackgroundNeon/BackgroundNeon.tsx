import { string } from "zod";
type Props = {
  customStyles?: string;
};
export function BackgroundNeon(props: Props) {
  const { customStyles } = props;
  return (
    <div className="relative bg-slate-950 w-full h-full">
      {customStyles === "left" ||
        (customStyles === undefined && (
          <div className="top-[-10%] right-0 bottom-0 left-[-20%] absolute bg-[radial-gradient(circle_farthest-side,rgba(20,250,250,.15),rgba(255,255,255,0))] rounded-full w-[700px] h-[700px]"></div>
        ))}

      {customStyles === "right" && (
        <div className="top-[-10%] right-[-20%] bottom-0 absolute bg-[radial-gradient(circle_farthest-side,rgba(20,250,250,.15),rgba(255,255,255,0))] rounded-full w-[500px] h-[500px]"></div>
      )}
    </div>
  );
}
