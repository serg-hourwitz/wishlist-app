import Button from "./Button";

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 mt-6">
      <Button
        variant="secondary"
        className="disabled:opacity-50"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        Prev
      </Button>

      <span className="px-3 py-1 font-bold">
        Page {page} / {totalPages}
      </span>

      <Button
        variant="secondary"
        className="disabled:opacity-50"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}
