const DeleteModal = ({ isOpen, onClose, onConfirm, articleTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="relative  w-full max-w-md bg-(--secondary) rounded-2xl shadow-2xl p-8 animate-in zoom-in duration-200 border border-(--border)">
        <h2 className="text-xl font-bold text-(--text1) mb-2">
          Delete Article
        </h2>

        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Are you sure you want to delete "{articleTitle}"? This action cannot
          be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 cursor-pointer rounded-lg text-sm font-semibold border border-(--border) text-(--text1) hover:bg-gray-50 dark:hover:bg-gray-900 transition-all active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 cursor-pointer rounded-lg text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-500/20"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
