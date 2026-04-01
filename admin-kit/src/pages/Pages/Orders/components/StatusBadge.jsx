const StatusBadge = ({ status }) => {
  const styles = {
    Paid: "bg-emerald-100 text-emerald-600",
    Chargeback: "bg-red-100 text-red-600",
    Refunded: "bg-orange-100 text-orange-600",
  };
  return (
    <span className={`${styles[status]} text-[10px] font-bold px-2 py-0.5 rounded uppercase`}>
      {status}
    </span>
  );
};


export default StatusBadge