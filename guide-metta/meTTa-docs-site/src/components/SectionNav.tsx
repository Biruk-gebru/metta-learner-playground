import Link from "next/link";

interface NavItem {
  label: string;
  slug: string;
}

interface SectionNavProps {
  previous?: NavItem;
  next?: NavItem;
}

const SectionNav = ({ previous, next }: SectionNavProps) => (
  <div className="flex justify-between mt-8 gap-4">
    {previous ? (
      <Link
        href={`/${previous.slug}`}
        className="px-4 py-2 rounded-md border font-medium text-sm transition bg-metta-accent text-white border-metta-accent hover:bg-metta-accent/80"
      >
        ← {previous.label}
      </Link>
    ) : <div />}
    {next ? (
      <Link
        href={`/${next.slug}`}
        className="px-4 py-2 rounded-md border font-medium text-sm transition bg-metta-accent text-white border-metta-accent hover:bg-metta-accent/80"
      >
        {next.label} →
      </Link>
    ) : <div />}
  </div>
);

export default SectionNav; 