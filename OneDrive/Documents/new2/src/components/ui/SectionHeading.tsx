interface SectionHeadingProps {
  title: string;
  description: string;
}

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-3xl">
      <span className="text-sm uppercase tracking-[0.32em] text-cyan-500">{title}</span>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {description}
      </p>
    </div>
  );
}
