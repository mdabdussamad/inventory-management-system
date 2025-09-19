export default function Loading() {
  return (
    <div
      className="flex justify-center items-center h-screen"
    >
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center space-x-2"
      >
        <span className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full"></span>
        <span>Loading...</span>
      </button>
    </div>
  );
}