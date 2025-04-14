interface IMultiPreview {
  files: File[];
}

export default function MultiplePreview({ files }: IMultiPreview) {
  const filePreviews = files.map((f: File) => {
    return {
      preview: URL.createObjectURL(f),
    };
  });

  return (
    <div className="flex items-center justify-start">
      {filePreviews.map((item: any, ind: number) => (
        <div key={ind}>
          <div className="m-5">
            <img
              className="w-20 h-20 rounded-lg"
              src={item.preview || ""}
              // Revoke data uri after image is loaded
              onLoad={() => {
                URL.revokeObjectURL(item.preview || "");
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
