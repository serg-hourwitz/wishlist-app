import Button from "./Button";

interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ message, onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-80 text-center">
        <p className="mb-4 text-gray-500">{message}</p>
        <div className="flex justify-center gap-4">
          <Button variant="secondary" onClick={onCancel}>
            No
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
}
