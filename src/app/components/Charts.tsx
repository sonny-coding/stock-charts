type Props = {
  query: string;
};
const fetchStock = async (ticker: string) => {
  const response = await fetch(`url${ticker}`);
  const data = await response.json();
  return data;
};

const Charts = ({ query }: Props) => {
  return (
    <div className="w-full min-h-[500px] bg-slate-300">
      <p>Overview</p>
      <p>Revenue & Profit</p>
      <p>Margins</p>
    </div>
  );
};

export default Charts;
