const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <img
        src="/assets/img/TransJakarta_Logo.png"
        className="w-20 animate-spin"
      />
    </div>
  );
};

export default Loading;
