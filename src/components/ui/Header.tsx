const Header = ({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) => {
  return (
    <div className="text-center py-8 px-6">
      {/* Heading with Smaller Font and Carved Shape */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#2c3e50] tracking-tight px-4 secondary-font relative inline-block">
        <span className="absolute -inset-2 bg-white transform skew-x-12"></span>
        <span className="relative z-10 capitalize">{heading}</span>
      </h1>

      {/* Decorative Line */}
      <div className="mt-6 mx-auto w-16 h-1 bg-[#00ccb1] rounded-full"></div>

      {/* Subheading (Optional) */}
      <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto">
        {subheading}
      </p>
    </div>
  );
};

export default Header;
