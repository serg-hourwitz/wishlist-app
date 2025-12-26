import type { ReactNode } from 'react';

type FlipCardProps = {
  image: string;
  alt?: string;
  backContent?: ReactNode;
  className?: string;
};

const FlipCard: React.FC<FlipCardProps> = ({
  image,
  alt = 'image',
  backContent = 'Follow your dreams ✨',
  className = '',
}) => {
  return (
    <div
      className={`relative w-full h-64 group [perspective:1000px] ${className}`}
    >
      <div
        className="
          relative w-full h-full duration-700
          [transform-style:preserve-3d]
          group-hover:[transform:rotateY(180deg)]
        "
      >
        {/* FRONT */}
        <img
          src={image}
          alt={alt}
          className="
            absolute inset-0 w-full h-full object-cover rounded-xl shadow-xl
            [backface-visibility:hidden]
          "
        />

        {/* BACK */}
        <div
          className="
            absolute inset-0 w-full h-full rounded-xl
            bg-gray-700 text-white flex items-center justify-center
            text-xl font-bold p-4 text-center
            [transform:rotateY(180deg)]
            [backface-visibility:hidden]
          "
        >
          {backContent}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
