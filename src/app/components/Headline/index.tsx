/** One italic word per headline: the last one. */
const Headline = ({ title }: { title: string }) => {
  const words = title.split(" ");
  if (words.length < 2) return <>{title}</>;
  return (
    <>
      {words.slice(0, -1).join(" ")} <em>{words.at(-1)}</em>
    </>
  );
};

export default Headline;
