interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ message, onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-80 text-center">
        <p className="mb-4">{message}</p>
        <div className="flex justify-center gap-4">
          <button className="text-gray-600" onClick={onCancel}>
            No
          </button>
          <button className="text-red-600" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
