interface CenteredTextProps {
  isModal?: boolean;
  text: string;
}

export default function CenteredText({ isModal, text }: CenteredTextProps) {
  const height = isModal ? "h-[350px]" : "h-[calc(100vh-56px)]";
  return <p className={`flex justify-center items-center ${height}`}>{text}</p>;
}
