interface SpinnerXProps {
  variant: 1 | 2 | 3 | 3.5 | 4 | 5 | 6;
}

const SpinnerX = ({ variant }: SpinnerXProps) => {
  const style = {
    1: {
      size: 'w-4 h-4',
      colorAndThickness:
        'border-3 border-t-llneutral-400 border-r-llneutral-400',
    },
    2: {
      size: 'w-5 h-5',
      colorAndThickness: 'border-4 border-t-white border-r-white',
    },
    3: {
      size: 'w-3 h-3',
      colorAndThickness:
        'border-2 border-t-llneutral-300 border-r-llneutral-300',
    },
    3.5: {
      size: 'w-5 h-5',
      colorAndThickness:
        'border-2 border-t-llneutral-300 border-r-llneutral-300',
    },
    4: {
      size: 'w-8 h-8',
      colorAndThickness:
        'border-4 border-t-llneutral-400 border-r-llneutral-400',
    },
    5: {
      size: 'w-full h-full',
      colorAndThickness: 'border-4 border-t-white border-r-white',
    },
    6: {
      size: 'w-5 h-5',
      colorAndThickness: 'border-3 border-t-white border-r-white',
    },
  };

  return (
    <span className={`block shrink-0 grow-0 ${style[variant].size}`}>
      <i
        className={`block animate-spin border-b-transparent border-l-transparent 
          rounded-full ${style[variant].size} ${style[variant].colorAndThickness}`}
      ></i>
    </span>
  );
};

export default SpinnerX;
