const Logo = ({ className = "text-4xl" }: { className?: string }) => {
  return (
    <div className={`font-bold ${className}`}>
      <span className="text-aproximei-blue">APROXI</span>
      <span className="text-aproximei-orange">MEI</span>
    </div>
  );
};

export default Logo;
