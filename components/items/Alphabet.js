export default function Alphabet({ alphabet, possessionStatus }) {
  return (
    <div>
      {possessionStatus
        ? <div className="text-gray-800">{alphabet}</div>
        : <div className="text-gray-400">{alphabet}</div>
      }
    </div>
  );
}
