import "../styles/Layout.scss";

type LayoutProps = {
  children: JSX.Element | JSX.Element[];
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="Layout">
      <main>{children}</main>
      <footer className="Footer">
        Powered by{" "}
        <a href="https://www.coingecko.com/" target="_blank" rel="noreferrer">
          CoinGecko
        </a>
      </footer>
    </div>
  );
};

export default Layout;
