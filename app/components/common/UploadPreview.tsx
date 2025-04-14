export default function UploadPreview({ file }: { file: File }) {
  const preview = URL.createObjectURL(file);
  return (
    <div className="flex items-center justify-start m-2">
      <div>
        <div>
          <img
            className="w-28 h-28 rounded-lg"
            src={preview || ""}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(preview || "");
            }}
          />
        </div>
      </div>
    </div>
  );
}
