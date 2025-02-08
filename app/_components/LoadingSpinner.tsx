export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
      <div className="w-12 h-12 border-4 border-orange-200 rounded-full animate-spin border-t-orange-500"></div>
    </div>
  );
}