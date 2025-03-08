const STabs = ({ selectedCategory, setSelectedCategory }) => {
    const categories = ["All Students", "Postgrad. Diploma", "Masters", "PhD"];
  
    return (
      <div className="relative border-b">
        <div className="flex space-x-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`relative px-3 py-2 text-sm transition-colors duration-300 ${
                selectedCategory === category
                  ? "text-[#23388F] font-semibold after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#23388F]"
                  : "text-gray-600 hover:text-gray-900 hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-gray-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default STabs;
  