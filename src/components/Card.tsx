import clsx from "clsx";

type CardProps = {
  className?: string;
  children: React.ReactNode;
}

const Card = ({ className, children }: CardProps) => {
  return (
    <div
      className={clsx(
        "rounded-2xl px-10 py-4 drop-shadow-xl bg-white h-full overflow-y-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;