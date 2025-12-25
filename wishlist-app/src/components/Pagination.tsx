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
        className="disabled:opacity-50 flex items-center gap-2"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M15 18l-6-6 6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        }
      >
        Prev
      </Button>

      <span className="px-3 py-1 font-bold">
        Page {page} / {totalPages}
      </span>

      <Button
        variant="secondary"
        className="disabled:opacity-50 flex items-center flex-row-reverse gap-2"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M9 6l6 6-6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        }
      >
        Next
      </Button>
    </div>
  );
}
