interface BrandMarkProps {
  className?: string;
  title?: string;
}

export default function BrandMark({ className, title }: BrandMarkProps) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={className}
      role={title ? 'img' : undefined}
      viewBox="0 0 56 56"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <rect width="56" height="56" fill="#e40523" />
      <path
        d="M26.8802 18.48C26.8802 18.48 26.3183 18.48 14.7994 18.48C3.28037 18.4799 3.28047 37.52 14.7994 37.52C26.3182 37.52 26.8802 37.52 26.8802 37.52"
        fill="none"
        stroke="white"
        strokeWidth="3.92"
      />
      <path
        d="M29.6804 18.48C29.6804 18.48 30.2422 18.4801 41.7612 18.48C53.2802 18.48 53.2801 37.52 41.7612 37.52C30.2423 37.52 29.6804 37.52 29.6804 37.52"
        fill="none"
        stroke="white"
        strokeWidth="3.92"
      />
      <path
        d="M32.4807 28.0001C32.4807 28.0001 33.0425 28.0001 44.5615 28.0001"
        fill="none"
        stroke="white"
        strokeWidth="3.92"
      />
      <path
        d="M31.8008 21.9596C31.8008 21.9596 31.8007 22.5214 31.8008 34.0404"
        fill="none"
        stroke="white"
        strokeWidth="3.92"
      />
    </svg>
  );
}
