import SpinnerX from './Spinner';

export default function LoadingBtn({ label }: { label?: string }) {
  return (
    <>
      <button
        disabled={true}
        className="w-full cursor-progress sm:w-auto bg-white hover:bg-gray-50 text-blue-600 font-semibold py-2.5 px-6 rounded-md shadow hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
      >
        <SpinnerX variant={3} />
        <span className="text-center opacity-50">{label || 'Loading...'}</span>
      </button>
    </>
  );
}
