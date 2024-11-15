const Input = ({placeholder, value, onChange}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="bg-gray-200 p-2 text-sm rounded-md w-full outline-none"
    />
  );
};

const SearchInput = ({placeholder, value, onChange, onSearch}) => {
  return (
    <div className="flex items-center gap-2 mt-2">
      <Input placeholder={placeholder} value={value} onChange={onChange} />
      <button
        type="button"
        onClick={onSearch}
        className="bg-red-500 text-sm p-2 rounded-md text-white"
      >
        Search
      </button>
    </div>
  );
};

export {Input, SearchInput};
