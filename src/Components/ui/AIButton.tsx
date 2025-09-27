interface AIButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  colors?: string;
  activeFeature?: string | null;
  disabled?: boolean;
}
export const AiButton: React.FC<AIButtonProps> = ({
  onClick,
  children,
  colors,
  activeFeature,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 py-2 px-4 rounded-full 
    bg-gradient-to-r ${colors} 
    bg-[length:200%_200%] bg-left 
    border border-white/10 
    transition-all duration-500 ease-out
    hover:bg-right
    disabled:cursor-not-allowed
    ${
      activeFeature === "summarize" ? `${colors} border-2 border-white/50` : ""
    }`}
    >
      {children}
    </button>
  );
};
