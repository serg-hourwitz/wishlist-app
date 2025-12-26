import { Link } from 'react-router-dom';

type HeroPageProps = {
  title: string;
  subtitle: string;
};

export default function HeroPage({ title, subtitle }: HeroPageProps) {
  return (
    <div className="flex mb-14 flex-col lg:flex-row items-center p-6 bg-gray-700 rounded">
      <Link
        to="https://en.wikipedia.org/wiki/Robert_Burton_(scholar)"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full block"
      >
        <img
          className="rounded w-full h-auto max-w-full object-cover"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Burton_grand.jpg/250px-Burton_grand.jpg"
          alt="Robert Burton"
        />
      </Link>

      <div className="p-4">
        <h1 className="mb-10">
          <blockquote className="text-4xl sm:text-6xl font-bold italic">
            {title}
          </blockquote>
        </h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}
