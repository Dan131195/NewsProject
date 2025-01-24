const MyFooter = () => {
  return (
    <footer className="d-flex justify-content-center align-items-center bg-dark text-bg-dark">
      <img
        src="https://img.freepik.com/premium-vector/space-logo-vector_848918-9672.jpg"
        alt="SpaceFlight Logo"
        width="40"
        height="40"
        className="rounded-1 me-2"
      />
      <p className="m-0">SpaceFlight &copy; - {new Date().getFullYear()}</p>
    </footer>
  );
};

export default MyFooter;
