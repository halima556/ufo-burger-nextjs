interface FloatingInvestorCTAProps {
  onClick: () => void;
}

export function FloatingInvestorCTA({ onClick }: FloatingInvestorCTAProps) {
  return (
    <div className="floating-investor-cta">
      <button className="btn btn-primary" type="button" onClick={onClick}>
        Investor Priority Line
      </button>
    </div>
  );
}
