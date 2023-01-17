interface CenteredTextProps {
  isModal?: boolean;
  text: string;
}

export default function CenteredText({ isModal, text }: CenteredTextProps) {
  const height = isModal ? "img-height" : "app-height";
  return <p className={`flex justify-center items-center ${height}`}>{text}</p>;
}
