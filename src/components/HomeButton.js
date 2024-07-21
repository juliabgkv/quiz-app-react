function HomeButton({ children, onBackHome }) {
  return <button onClick={onBackHome}>{children}</button>;
}

export default HomeButton;
