import { XMarkIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  title: string;
  onModalClose: () => void;
}

export default function Modal({ children, onModalClose, title }: ModalProps) {
  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-1/3 my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-3xl font-semibold">{title}</h3>
            <XMarkIcon
              className="h-6 w-6 cursor-pointer"
              onClick={onModalClose}
            />
          </div>
          <div className="relative p-6 flex-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
